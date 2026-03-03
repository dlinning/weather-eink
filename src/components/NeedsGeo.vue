<script setup lang="ts">
import { AppCtx } from "@/store";
</script>

<template>
	<div v-if="AppCtx.needsGeo" class="root">
		<b>Missing <kbd>lat</kbd> and/or <kbd>lng</kbd> query params</b>
	</div>
</template>

<style scoped>
.root {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

kbd {
	padding: 0.25rem;
	border: 1px solid #ccc;
	border-radius: 0.25rem;
}
</style>
