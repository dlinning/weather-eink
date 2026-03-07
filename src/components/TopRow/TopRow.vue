<script setup lang="ts">
import RowCol from "@/components/RowCol.vue";
import WeatherConditionIcon from "@/components/WeatherConditionIcon.vue";
import { AppCtx } from "@/scripts/store";
import MainTile from "./MainTile.vue";
import Stat from "./Stat.vue";

const tiles = {
	feelsLike: AppCtx.data?.current.feels_like ?? 0,
	realTemp: AppCtx.data?.current.temperature ?? 0,
	windSpeed: AppCtx.data?.current.wind_speed ?? 0,
	windDir: AppCtx.data?.current.wind_direction ?? "",
	humidity: AppCtx.data?.current.relative_humidity ?? 0
};
</script>

<template>
	<RowCol gap-size="1rem" dir="row">
		<MainTile flex>
			<div :style="{ 'margin-block': 'auto' }">
				<WeatherConditionIcon
					:code="AppCtx.data?.current.code!"
					:time-of-day="AppCtx.data?.current.time!"
					size="5rem"
				/>
			</div>
		</MainTile>

		<MainTile flex>
			<Stat label="Feels Like" :value="tiles.feelsLike" unit="°F" />
		</MainTile>

		<MainTile>
			<Stat label="Temp" :value="tiles.realTemp" unit="°F" size="sub" />
		</MainTile>

		<MainTile>
			<Stat
				:label="'Wind ' + tiles.windDir"
				:value="tiles.windSpeed"
				unit="mph"
				:size="tiles.windSpeed < 5 ? 'sub' : ''"
			/>
		</MainTile>

		<MainTile>
			<Stat label="Humidity" :value="tiles.humidity" unit="%" size="sub" />
		</MainTile>
	</RowCol>
</template>
