export type AppState = {
	isLoading: boolean;

	/**
	 * If `true`, then ?lng=...&lat=... must be provided
	 */
	needsGeo: boolean;
	data: OpenMeteoResult | null;
};

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
