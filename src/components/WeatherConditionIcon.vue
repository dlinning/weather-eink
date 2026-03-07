<script setup lang="ts">
import { weatherCodeToIcon } from "@/mappers/weather-code-to-icon";
import type { MeteoDateTime, MeteoTimeString, MeteoWeatherCodes } from "@/types/string-types";

defineProps<{
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
</script>

<template>
	<div class="iconRoot">
		<!-- TODO: Render proper PNG from `condition` to mapped icon name -->
		<img :src="`/icons/${weatherCodeToIcon(code, timeOfDay)}`" class="icon" />
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
}
</style>
