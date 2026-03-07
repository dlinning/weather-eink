<script setup lang="ts">
import ForecastTile from "@/components/ForecastTile.vue";
import { AppCtx } from "@/scripts/store";
import type { ForecastItem } from "@/types/app-ctx";

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
