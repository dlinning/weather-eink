/**
 * Types and Interfaces
 */

import type { OpenMeteoResult, OpenMeteoError, WeatherAttributes, ForecastItem } from "@/types";

/**
 * Internal interface for the raw API response shape
 */
interface MeteoRawResponse {
	timezone: string;
	current?: {
		temperature_2m: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		wind_direction_10m: number;
		apparent_temperature: number;
		precipitation: number;
	};
	hourly: {
		time: string[];
		apparent_temperature: number[];
		precipitation_probability: number[];
	};
}

/**
 * Converts wind direction in degrees (0-360) to a cardinal direction string.
 *
 * @param degree Degrees from 0 to 360. If missing, returns "N/A".
 * @returns Cardinal direction (e.g. "N", "NE", "E", etc.) or "N/A" when input is not a number.
 */
export function windDirectionToString(degree: number | undefined | null): string {
	if (degree === null || degree === undefined) return "N/A";

	const normalizedDegree = degree % 360;

	if (normalizedDegree > 337.5 || normalizedDegree <= 22.5) return "N";
	if (normalizedDegree <= 67.5) return "NE";
	if (normalizedDegree <= 112.5) return "E";
	if (normalizedDegree <= 157.5) return "SE";
	if (normalizedDegree <= 202.5) return "S";
	if (normalizedDegree <= 247.5) return "SW";
	if (normalizedDegree <= 292.5) return "W";
	if (normalizedDegree <= 337.5) return "NW";
	return "N";
}

/**
 * Fetches weather data from OpenMeteo and updates the sensor state.
 *
 * @param latitude Latitude to query (default is a hard‑coded location).
 * @param longitude Longitude to query (default is a hard‑coded location).
 * @returns Resolves with structured data, an error object, or null.
 */
export async function updateOpenMeteoWeather(
	latitude: string,
	longitude: string
): Promise<OpenMeteoResult | OpenMeteoError | null> {
	const url = "https://api.open-meteo.com/v1/forecast";
	const params = new URLSearchParams({
		latitude,
		longitude,
		hourly: "apparent_temperature,precipitation_probability",
		current: "temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation",
		// Get the client's timezone
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		forecast_days: "2",
		wind_speed_unit: "mph",
		temperature_unit: "fahrenheit",
		precipitation_unit: "inch"
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`);

		if (!response.ok) {
			const errorText = await response.text();
			console.info(`Response body: ${errorText}`);
			return { error: `API issue: ${response.status}` };
		}

		const data: MeteoRawResponse = await response.json();

		if (!data.current) return null;

		// --- Get current date info ---
		const now = new Date();

		// Format: YYYY-MM-DDTHH:00
		const nowForecastStr = `${now.toISOString().split(":")[0]}:00`;

		// Format: YYYY-MM-DDTHH:MM:SS (Local ISO-like string)
		const nowLastSyncStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
			.toISOString()
			.replace("Z", "")
			.split(".")[0];

		// --- Load "Current" data ---
		const currentAttrs: WeatherAttributes = {
			unit_of_measurement: "°F",
			icon: "mdi:weather-partly-cloudy",
			temperature: Math.round(data.current.temperature_2m),
			relative_humidity: Math.round(data.current.relative_humidity_2m),
			wind_speed: Math.round(data.current.wind_speed_10m),
			wind_direction: windDirectionToString(data.current.wind_direction_10m),
			feels_like: Math.round(data.current.apparent_temperature),
			precip: data.current.precipitation,
			last_synced: nowLastSyncStr!
		};

		// --- Update Hourly forecast ---
		const hourly = data.hourly;
		const hourlyForecast: ForecastItem[] = [];
		const nowIdx = hourly.time.indexOf(nowForecastStr);

		for (let i = 0; i < hourly.time.length; i++) {
			if (i <= nowIdx) continue;

			hourlyForecast.push({
				datetime: hourly.time[i]!,
				feels_like: Math.round(hourly.apparent_temperature[i]!),
				precip: Math.round(hourly.precipitation_probability[i]!)
			});

			if (hourlyForecast.length >= 12) break;
		}

		return {
			current: currentAttrs,
			forecast: hourlyForecast,
			timezone: data.timezone
		};
	} catch (e) {
		return { error: "API not available" };
	}
}

/**
 * Converts a Date to "HH:MM"
 */
export function formatHoursMinutes(date: Date): string {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

	return `${displayHours}:${minutes.toString().padStart(2, "0")}`;
}
