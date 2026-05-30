import type { OpenMeteoResult } from "@/types/meteo-api";

export interface IApiContext {
	isLoading: boolean;

	userGeo: IGeoData | null;
	data: OpenMeteoResult | null;
}

export interface IGeoData {
	/**
	 * Label, unused
	 */
	name?: string;

	/**
	 * @example "-82.1332"
	 */
	longitude: string;

	/**
	 * @example "41.342"
	 */
	latitude: string;
}
