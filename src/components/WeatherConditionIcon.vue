<script setup lang="ts">
import { weatherCodeToIcon } from "@/mappers/weather-code-to-icon";
import { IsDaylight } from "@/scripts/is-daylight";
import type { MeteoDateTime, MeteoTimeString, MeteoWeatherCodes } from "@/types/string-types";

const props = defineProps<{
	/**
	 * One of the allowed Weather Codes
	 */
	code: MeteoWeatherCodes;

	/**
	 * Expects an hour format
	 *
	 * @example 2026-01-02T14:00 // Will use "2pm"
	 * @example 22:00 // Will use "10pm"
	 * @example 20:12 // Will use "8pm", ignoring the
	 */
	timeOfDay: MeteoDateTime | MeteoTimeString;
}>();

const isDaylight = IsDaylight(props.timeOfDay);
</script>

<template>
	<div class="iconRoot">
		<img :src="`/icons/${weatherCodeToIcon(code, isDaylight)}`" class="icon" />
	</div>
</template>

<style scoped>
.iconRoot {
	aspect-ratio: 1/1;
	width: 2.5rem;
	margin-inline: auto;
}

.icon {
	width: 100%;
	height: 100%;
	transform: scale(1.25);
}
</style>
