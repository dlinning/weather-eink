<script setup lang="ts">
import { AppCtx } from "@/scripts/store";
import MainTile from "./MainTile.vue";
import RowCol from "./RowCol.vue";

const tiles = {
	feelsLike: AppCtx.data?.current.feels_like ?? 0,
	realTemp: AppCtx.data?.current.temperature ?? 0,
	windSpeed: AppCtx.data?.current.wind_speed ?? 0,
	windDir: AppCtx.data?.current.wind_direction ?? "",
	precipAmount: AppCtx.data?.current.precip ?? 0
};
</script>

<template>
	<RowCol gap-size="1rem" dir="row">
		<MainTile label="Feels Like" :value="tiles.feelsLike" unit="°F" />
		<MainTile label="Temp" :value="tiles.realTemp" unit="°F" size="sub" />

		<MainTile
			:label="'Wind ' + tiles.windDir"
			:value="tiles.windSpeed"
			unit="mph"
			:size="tiles.windSpeed < 5 ? 'sub' : ''"
		/>

		<MainTile label="Precip" :value="tiles.precipAmount" unit="in" :size="tiles.precipAmount < 0.1 ? 'sub' : ''" />
	</RowCol>
</template>
