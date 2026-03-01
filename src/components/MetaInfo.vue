<script setup lang="ts">
function formatHoursMinutes(): string {
	var date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, "0")}`;
}
</script>

<template>
	<div class="root">
		<span>{{ formatHoursMinutes() }}</span>
	</div>
</template>

<style scoped>
.root {
	position: absolute;
	right: 0.25rem;
	bottom: 0;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 0.5rem;

	opacity: 0.75;
	font-size: 1rem;
}
</style>
