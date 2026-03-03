<script setup lang="ts">
</script>

<template>
	<div class="root">
		<div class="spinner"></div>
	</div>
</template>

<style scoped>
.root {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.spinner {
	width: clamp(100px, 25vw, 200px);
	aspect-ratio: 1/1;
	border: 32px solid #ccc;
	border-top-color: #333;
	border-radius: 50%;
	animation: spin 5s linear infinite;
}
@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
