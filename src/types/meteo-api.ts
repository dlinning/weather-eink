import type { MeteoDateTime, MeteoWeatherCodes } from "@/types/string-types";

/**
 * UI representation of an Hourly forecast record
 */
export interface ForecastItem {
	time: MeteoDateTime;
	isDay: boolean;
	label: string;

	feelsLikeTemp: number;
	precipPercent: number;
	uvIndex: number;
	code: MeteoWeatherCodes;
}

export interface CurrentWeatherFields extends ForecastItem {
	realTemp: number;
	humidity: number;

	windSpeed: number;
	windDir: string;
}

export interface OpenMeteoResult {
	current: CurrentWeatherFields;
	forecast: ForecastItem[];
	timezone?: string;

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
	current: {
		time: MeteoDateTime;
		is_day: boolean;
		uv_index: number;
		temperature_2m: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		wind_direction_10m: number;
		apparent_temperature: number;
		precipitation: number;
		weather_code: MeteoWeatherCodes;
	};
	hourly: {
		time: MeteoDateTime[];
		is_day: boolean[];
		uv_index: number[];
		apparent_temperature: number[];
		precipitation_probability: number[];
		weather_code: MeteoWeatherCodes[];
	};
}
