<script setup lang="ts">
import ForecastChart from "@/components/ForecastChart.vue";
import ForecastTile from "@/components/ForecastTile.vue";
import ForecastTileList from "@/components/ForecastTileList.vue";
import Loader from "@/components/Loader.vue";
import MainTile from "@/components/MainTile.vue";
import MetaInfo from "@/components/MetaInfo.vue";
import RowCol from "@/components/RowCol.vue";
import { updateOpenMeteoWeather } from "@/get-data";
import { AppCtx } from "@/store";
import { onMounted } from "vue";

async function loadData() {
	//#region Get Params
	var searchParams = new URLSearchParams(document.location.search);

	var lng = searchParams.get("lng");
	var lat = searchParams.get("lat");

	if (lng == undefined || lat == undefined || lng?.length > 0 == false || lat?.length > 0 == false) {
		// Exit early, bad state
		AppCtx.needsGeo = true;
		AppCtx.isLoading = false;
		return;
	}
	//#endregion Get Params

	var apiData = await updateOpenMeteoWeather(lat, lng);

	if (apiData != null && apiData.error == null) {
		AppCtx.data = apiData;
	} else {
		console.log("failed to load", apiData);
	}

	// Done loading, regardless of success
	AppCtx.isLoading = false;
}

onMounted(loadData);
</script>

<template>
	<div id="root">
		<MetaInfo />
		<Loader v-if="AppCtx.isLoading" />

		<RowCol class="main" v-if="!AppCtx.isLoading" gap-size="1rem" dir="col">
			<RowCol gap-size="1rem" dir="row">
				<MainTile label="Temp" :value="AppCtx.data?.current.temperature" unit="°F" />

				<MainTile label="Feels Like" :value="AppCtx.data?.current.feels_like" unit="°F" />

				<MainTile
					:label="'Wind ' + AppCtx.data?.current.wind_direction"
					:value="AppCtx.data?.current.wind_speed"
					unit="mph"
				/>

				<MainTile label="Temp" :value="AppCtx.data?.current.temperature" unit="°F" />
			</RowCol>

			<ForecastTileList />

			<ForecastChart />
		</RowCol>
	</div>
</template>

<style scoped>
#root {
	max-width: 770px;
	margin-block: 0.5rem;
	margin-inline: auto;

	position: relative;

	height: calc(100vh - 1rem);
	max-height: 480px;
	overflow-y: auto;
	/* border: 1px solid #efefef; */
}

.main {
	display: flex;
	flex-flow: column;
	gap: 1rem;

	height: 100%;
}
</style>
