<script setup lang="ts">
import type { PropType } from "vue";
import type { ForecastItem } from "@/types";

defineProps({
	item: Object as PropType<ForecastItem>,
	value: String,
	unit: String
});

function formatForecastHour(dt: Date | string) {
	const d = new Date(dt);
	let h = d.getHours();
	return `${h > 12 ? h - 12 : h} ${d.getHours() < 12 ? "AM" : "PM"}`;
}
</script>

<template>
	<div v-if="item != undefined" class="card">
		<div class="label">{{ formatForecastHour(item.datetime) }}</div>
		<div class="value">{{ item.feels_like }}°</div>
		<span v-if="item.precip > 1" class="subValue">{{ item.precip }}%</span>
	</div>
</template>

<style scoped>
.card {
	flex: 1;
	border: 1px solid #eee;
	padding: 0.5rem;
	font-weight: bold;

	text-align: center;

	display: flex;
	flex-flow: column;
	line-height: 1;
	gap: 0.25rem;

	padding: 0.5rem 0.25rem;
}

.label {
	font-size: 1.5rem;
	opacity: 0.7;
}

.value {
	font-size: 2rem;
	font-weight: bold;
}

.subValue {
	font-size: 1.5rem;
	opacity: 0.75;
}
</style>
