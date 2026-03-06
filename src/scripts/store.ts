import type { AppState } from "@/types";
import { reactive } from "vue";

export const AppCtx = reactive<AppState>({
	// Assume loading by default
	isLoading: true,
	//
	userGeo: null,
	data: null
});
