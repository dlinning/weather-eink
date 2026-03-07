<script setup lang="ts">
defineProps<{
	flex?: true;
}>();
</script>

<template>
	<div :class="`card ${flex ? 'flex' : ''}`">
		<slot />
	</div>
</template>

<style scoped>
.card {
	border: 1px solid #eee;
	padding: 0.5rem;
	font-weight: bold;

	display: flex;
	flex-flow: column;
	justify-content: space-between;
}

.flex {
	flex: 1;
}
</style>
