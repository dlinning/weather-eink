import { windDirectionToString } from "@/mappers/wind-direction-to-string";
import type { ForecastItem, IGeoData } from "@/types/app-ctx";
import type { MeteoRawResponse, OpenMeteoError, OpenMeteoResult, WeatherAttributes } from "@/types/meteo-api";
import type { MeteoDateTime, MeteoWeatherCodes } from "@/types/string-types";
import { GetFromCache, StoreToCache } from "./cache";
import { DateTimeToHourLabel } from "./helpers";

/**
 * Fetches weather data from OpenMeteo and updates the sensor state.
 *
 * @param latitude Latitude to query (default is a hard‑coded location).
 * @param longitude Longitude to query (default is a hard‑coded location).
 * @returns Resolves with structured data, an error object, or null.
 */
export async function updateOpenMeteoWeather({
	longitude,
	latitude
}: IGeoData): Promise<OpenMeteoResult | OpenMeteoError | null> {
	const url = "https://api.open-meteo.com/v1/forecast";
	const params = new URLSearchParams({
		latitude,
		longitude,
		hourly: "apparent_temperature,precipitation_probability,weather_code",
		current:
			"temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation,weather_code",
		daily: "sunrise,sunset",
		// Get the client's timezone
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		forecast_days: "2",
		wind_speed_unit: "mph",
		temperature_unit: "fahrenheit",
		precipitation_unit: "inch"
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`, {
			// Only wait 1000ms
			signal: AbortSignal.timeout(1_000)
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.info(`Response body: ${errorText}`);
			return { error: `API issue: ${response.status}` };
		}

		const data: MeteoRawResponse = await response.json();

		if (!data.current) {
			// No data returned
			return null;
		}

		// --- Load "Current" data ---
		const current = data.current;
		const precipAsOneDecimal = parseFloat(current.precipitation.toFixed(1));

		const currentAttrs: WeatherAttributes = {
			code: current.weather_code ?? "0",
			time: current.time,
			temperature: Math.round(current.temperature_2m),
			relative_humidity: Math.round(current.relative_humidity_2m),
			wind_speed: Math.round(current.wind_speed_10m),
			wind_direction: windDirectionToString(current.wind_direction_10m),
			feels_like: Math.round(current.apparent_temperature),
			precip: precipAsOneDecimal <= 0.1 ? 0 : precipAsOneDecimal
		};

		// programmimng
		const currentTimeRoundedToHour = current.time.replace(/T(\d+):\d\d$/, "T$1:00") as MeteoDateTime;

		// --- Update Hourly forecast ---
		const hourly = data.hourly;
		const hourlyForecast: ForecastItem[] = [];
		const nowIdx = hourly.time.indexOf(currentTimeRoundedToHour);

		for (let i = 0; i < hourly.time.length; i++) {
			if (i <= nowIdx) continue;

			hourlyForecast.push({
				datetime: hourly.time[i]! as MeteoDateTime,
				// Force to Zulu, since it comes in as "YYYY-MM-DDTHH:MM" without timezone
				// data
				label: DateTimeToHourLabel(hourly.time[i]!),
				feels_like: Math.round(hourly.apparent_temperature[i]!),
				precip: Math.round(hourly.precipitation_probability[i]!),
				code: (hourly.weather_code[i] ?? "0").toString() as MeteoWeatherCodes
			});

			if (hourlyForecast.length >= 12) break;
		}

		var asResult: OpenMeteoResult = {
			current: currentAttrs,
			forecast: hourlyForecast,
			timezone: data.timezone,
			daily: data.daily
		};

		// Cache for future loads
		StoreToCache("last-weather", asResult);

		return asResult;
	} catch (e) {
		if ((e as Error).name == "TimeoutError") {
			console.log("Timed out, returning cached");
			// Just used the cached value, since we timed out
			return GetFromCache("last-weather");
		}
		console.log("Error", e);
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
