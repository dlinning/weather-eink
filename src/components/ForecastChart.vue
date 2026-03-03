<script setup lang="ts">
import { MinAndMax } from "@/scripts/helpers";
import { AppCtx } from "@/scripts/store";
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Title,
	type ChartData,
	type ChartOptions
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.defaults.font = {
	size: 16,
	family: "Roboto, sans-serif",
	style: "normal",
	weight: "bold",
	lineHeight: 1.1
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, LineController);

const forecast = AppCtx.data?.forecast ?? [];

const chartData: ChartData<"bar" | "line"> = {
	labels: forecast.map((f) => f.label),
	datasets: [
		{
			type: "line",
			label: "Temp",
			backgroundColor: "#000000",
			data: forecast.map((f) => f.feels_like),
			yAxisID: "t",
			//
			pointRadius: 7,
			pointHoverRadius: 7,
			pointStyle: "rect",
			tension: 0.4,
			fill: "#44444499"
		},
		{
			type: "bar",
			label: "Precip",
			backgroundColor: "#bbbbbb",
			data: forecast.map((f) => f.precip),
			yAxisID: "p"
			//
		}
	]
};

const minMax = MinAndMax(forecast, "feels_like");

function round5(x: number, op: "ceil" | "floor") {
	return Math[op](x / 5) * 5;
}

const chartOptions: ChartOptions<"bar"> = {
	maintainAspectRatio: false,
	animation: false,
	scales: {
		t: {
			type: "linear",
			display: true,
			position: "left",
			// Optional: configure other settings like min/max
			max: round5(minMax.max + 5, "ceil"),
			min: round5(minMax.min - 5, "floor"),
			ticks: {
				count: 5
			}
		},
		p: {
			type: "linear",
			display: false,
			position: "right",
			min: 0,
			max: 100
		}
	},
	layout: {
		padding: 0
	}
};

// Necessary for dumb typescript checks
const castToBarData = (data: any) => data as ChartData<"bar">;
</script>

<template>
	<div v-if="!AppCtx.isLoading" class="root">
		<Bar :data="castToBarData(chartData)" :options="chartOptions" />
	</div>
</template>

<style scoped>
.root {
	height: 250px;
	width: 100%;
}
</style>
