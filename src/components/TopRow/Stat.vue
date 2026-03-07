<script setup lang="ts">
defineProps<{
	label?: string;
	value: number | string | undefined;
	unit: string;
	size?: "sub" | "";
}>();
</script>

<template>
	<div v-if="label!?.length > 0" class="label">{{ label }}</div>
	<div v-if="value != undefined" :class="`value ${size ?? ''}`">
		{{ value ?? "-" }}<span class="unit">{{ unit }}</span>
	</div>
</template>

<style scoped>
.label {
	font-size: 1.25em;
	opacity: 0.7;
}

.value {
	font-size: 5.5rem;
	line-height: 1;
	padding-top: calc((var(--main-fsz) - var(--my-size)));

	justify-self: flex-end;

	font-weight: bold;
	/* text-align: center; */
}

.value.sub {
	font-size: 3.5rem;
}

.unit {
	font-size: 1.5rem;
	opacity: 0.75;
}
</style>
