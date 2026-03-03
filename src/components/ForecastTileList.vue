<script setup lang="ts">
import ForecastTile from "@/components/ForecastTile.vue";
import { AppCtx } from "@/scripts/store";
import type { ForecastItem } from "@/types";

function getZonedDateTime(date: Date | string) {
	if (typeof date === "string") {
		date = new Date(date);
	}

	const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
	const tzDate = new Date(date.toLocaleString("en-US", { timeZone: AppCtx.data?.timezone }));
	const offset = tzDate.getTime() - utcDate.getTime();
	return new Date(date.getTime() + offset);
}

var shownHours: ForecastItem[] = [];
if (AppCtx.data?.forecast != null) {
	shownHours = AppCtx.data?.forecast;
}
</script>

<template>
	<div class="root">
		<ForecastTile v-for="hr in shownHours" :key="hr.datetime.toString()" :item="hr" />
	</div>
</template>

<style scoped>
.root {
	display: grid;
	gap: 0.5rem;
	grid-template-columns: repeat(6, 1fr);
}
</style>
