<script setup lang="ts">
defineProps<{
	label: string;
	value: number | string | undefined;
	unit: string;
	size?: "sub" | "";
}>();
</script>

<template>
	<div class="card">
		<div class="label">{{ label }}</div>
		<div :class="`value ${size ?? ''}`">
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
	--main-fsz: 5.5rem;
	--my-size: var(--fsz-override, var(--main-fsz));

	font-size: var(--my-size);
	line-height: var(--my-size);
	padding-top: calc((var(--main-fsz) - var(--my-size)));

	height: var(--my-size);

	font-weight: bold;
	/* text-align: center; */
}

.value.sub {
	--fsz-override: 3.5rem;
}

.unit {
	font-size: 1.5rem;
	opacity: 0.75;
}
</style>
