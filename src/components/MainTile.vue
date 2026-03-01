<script setup lang="ts">
defineProps<{
	label: string;
	value: number | string | undefined;
	unit: string;
}>();
</script>

<template>
	<div class="card">
		<div class="label">{{ label }}</div>
		<div class="value">
			{{ value ?? "-" }}<span class="unit">{{ unit }}</span>
		</div>
	</div>
</template>

<style scoped>
.card {
	flex: 1;
	border: 1px solid #eee;
	padding: 0.5rem;
	font-weight: bold;
}

.label {
	font-size: 1.4em;
	opacity: 0.8;
}

.value {
	font-size: 5.5rem;
	font-weight: bold;
	text-align: center;
}

.unit {
	font-size: 1.5rem;
	opacity: 0.75;
}
</style>
