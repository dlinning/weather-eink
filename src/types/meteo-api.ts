import type { ForecastItem } from "@/types/app-ctx";
import type { MeteoDateString, MeteoDateTime, MeteoWeatherCodes } from "@/types/string-types";

export interface WeatherAttributes {
	unit_of_measurement: string;
	icon: string;
	temperature?: number;
	relative_humidity?: number;

	wind_speed?: number;
	wind_direction?: string;
	feels_like?: number;
	precip?: number;
	last_synced: string;
	timezone?: string;
	forecast?: ForecastItem[];
}

export interface OpenMeteoResult {
	current: WeatherAttributes;
	forecast: ForecastItem[];
	timezone?: string;

	daily: MeteoRawResponse["daily"];

	error?: null;
}

export interface OpenMeteoError {
	error: string;
}

/**
 * Internal interface for the raw API response shape
 */
export interface MeteoRawResponse {
	timezone: string;
	current?: {
		time: MeteoDateTime;
		temperature_2m: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		wind_direction_10m: number;
		apparent_temperature: number;
		precipitation: number;
		weatherCode: MeteoWeatherCodes;
	};
	hourly: {
		time: MeteoDateTime[];
		apparent_temperature: number[];
		precipitation_probability: number[];
		weather_code: MeteoWeatherCodes[];
	};
	daily: {
		time: MeteoDateString[];
		sunrise: MeteoDateTime[];
		sunset: MeteoDateTime[];
	};
}
