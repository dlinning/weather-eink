<script setup lang="ts">
import { ref, type CSSProperties } from "vue";

defineProps<{
	dir: "row" | "col";
	/**
	 * CSS `gap` properties
	 */
	gapSize: CSSProperties["gap"];
}>();
</script>

<template>
	<div :class="dir" :style="{ gap: gapSize }">
		<slot />
	</div>
</template>

<style scoped>
.row {
	display: flex;
	flex-flow: row nowrap;

	gap: var();
}

.col {
	display: flex;
	flex-flow: column nowrap;
}
</style>
