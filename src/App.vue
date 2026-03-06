<script setup lang="ts">
import Loader from "@/components/Loader.vue";
import MainTile from "@/components/MainTile.vue";
import MetaInfo from "@/components/MetaInfo.vue";
import RowCol from "@/components/RowCol.vue";
import { updateOpenMeteoWeather } from "@/scripts/get-data";
import { AppCtx } from "@/scripts/store";
import { onMounted } from "vue";
import ForecastTileList from "./components/ForecastTileList.vue";
import NeedsGeoMessage from "./components/NeedsGeoMessage.vue";
import { GetUserPosition } from "./scripts/get-position";

async function loadData() {
	var geoData = GetUserPosition();

	if (geoData == null) {
		// Needs geo data, so exit early on bad state
		AppCtx.userGeo = null;
		AppCtx.isLoading = false;

		return;
	}

	AppCtx.userGeo = geoData;

	var apiData = await updateOpenMeteoWeather(geoData);

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
		<NeedsGeoMessage />

		<RowCol class="main" v-if="!AppCtx.isLoading && AppCtx.userGeo != null" gap-size="1rem" dir="col">
			<RowCol gap-size="1rem" dir="row">
				<MainTile label="Temp" :value="AppCtx.data?.current.temperature" unit="°F" />

				<MainTile label="Feels Like" :value="AppCtx.data?.current.feels_like" unit="°F" />

				<MainTile
					:label="'Wind ' + AppCtx.data?.current.wind_direction"
					:value="AppCtx.data?.current.wind_speed"
					unit="mph"
				/>

				<MainTile label="Precip" :value="AppCtx.data?.current.precip" unit="in" />
			</RowCol>

			<ForecastTileList />
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
