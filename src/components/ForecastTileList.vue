<script setup lang="ts">
import ForecastTile from "@/components/ForecastTile.vue";
import RowCol from "@/components/RowCol.vue";
import { AppCtx } from "@/store";
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
	shownHours = AppCtx.data?.forecast.slice(0, 6).map((h) => {
		return {
			...h,
			// Convert to local datetime
			datetime: getZonedDateTime(h.datetime)
		};
	});
}
</script>

<template>
	<RowCol gap-size="0.5rem" dir="row">
		<ForecastTile v-for="hr in shownHours" :key="hr.datetime.toString()" :item="hr" />
	</RowCol>
</template>

<style scoped></style>
