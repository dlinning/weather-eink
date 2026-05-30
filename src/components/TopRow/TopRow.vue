<script setup lang="ts">
import RowCol from "@/components/RowCol.vue";
import WeatherConditionIcon from "@/components/WeatherConditionIcon.vue";
import { AppCtx } from "@/scripts/store";
import MainTile from "./MainTile.vue";
import Stat from "./Stat.vue";

// Pick the higher of the two, that's what we care about
let uvMax = Math.max(AppCtx.data?.daily.uv_index_max[0] ?? 0, AppCtx.data?.daily.uv_index_clear_sky_max[0] ?? 0);

const tiles = {
	feelsLike: AppCtx.data?.current.feels_like ?? 0,
	realTemp: AppCtx.data?.current.temperature ?? 0,
	windSpeed: AppCtx.data?.current.wind_speed ?? 0,
	windDir: AppCtx.data?.current.wind_direction ?? "",
	humidity: AppCtx.data?.current.relative_humidity ?? 0,
	uvMax: uvMax
};
</script>

<template>
	<RowCol gap-size="1rem" dir="row">
		<MainTile flex>
			<div :style="{ 'margin-block': 'auto' }">
				<WeatherConditionIcon
					:code="AppCtx.data?.current.code!"
					:time-of-day="AppCtx.data?.current.time!"
					size="4.5rem"
				/>
			</div>

			<div v-if="tiles.uvMax > 2" class="uvRow">
				<Stat label="UV" :value="tiles.uvMax" unit="" size="mini" />
			</div>
		</MainTile>

		<MainTile flex>
			<Stat label="Feels Like" :value="tiles.feelsLike" unit="°F" />
		</MainTile>

		<MainTile flex>
			<Stat
				:label="'Wind ' + tiles.windDir"
				:value="tiles.windSpeed"
				unit="mph"
				:size="tiles.windSpeed < 5 ? 'sub' : ''"
			/>
		</MainTile>

		<MainTile flex>
			<Stat label="Humidity" :value="tiles.humidity" unit="%" size="sub" />
		</MainTile>
	</RowCol>
</template>

<style scoped>
.uvRow {
	justify-content: flex-end;
	display: flex;
	flex-flow: row nowrap;
	gap: 0.5rem;
	align-items: flex-end;
}
</style>
