<script setup lang="ts">
import WeatherConditionIcon from "@/components/WeatherConditionIcon.vue";
import type { ForecastItem } from "@/types/app-ctx";
import type { PropType } from "vue";

defineProps({
	item: Object as PropType<ForecastItem>,
	value: String,
	unit: String
});
</script>

<template>
	<div v-if="item != undefined" class="card">
		<div class="label">{{ item.label }}</div>
		<WeatherConditionIcon :code="item.code" :timeOfDay="item.datetime" size="2rem" />
		<div class="value">{{ item.feels_like }}°</div>
		<span v-if="item.precip > 0" class="subValue">{{ item.precip }}%</span>
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
	gap: 0;

	padding: 0.5rem 0.25rem;
}

.label {
	font-size: 1.2rem;
	opacity: 0.7;
}

.value {
	font-size: 1.8rem;
	font-weight: bold;
}

.subValue {
	font-size: 1.25rem;
	opacity: 0.75;
}
</style>
