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

export interface ForecastItem {
	datetime: string | Date;
	label: string;
	feels_like: number;
	precip: number;
}

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

	error?: null;
}

export interface OpenMeteoError {
	error: string;
}
