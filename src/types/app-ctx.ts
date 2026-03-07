import type { OpenMeteoResult } from "@/types/meteo-api";
import type { MeteoDateTime, MeteoWeatherCodes } from "./string-types";

export type AppState = {
	isLoading: boolean;

	userGeo: IGeoData | null;
	data: OpenMeteoResult | null;
};

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

/**
 * UI representation of an Hourly forecast record
 */
export interface ForecastItem {
	datetime: MeteoDateTime;
	label: string;
	feels_like: number;
	precip: number;
	code: MeteoWeatherCodes;
}
