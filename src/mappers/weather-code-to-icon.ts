import type { MeteoWeatherCodes } from "@/types/string-types";

/**
 * Takes the {@link code} and returns the name of an SVG icon
 * for the code.
 *
 * {@link isDaytime} is used for day/night handling
 */
export function weatherCodeToIcon(code: MeteoWeatherCodes, isDaytime: boolean): string {
	switch (code) {
		case "0":
			return `clear_${isDaytime ? "day" : "night"}.svg`;
		case "1":
		case "2":
		case "3":
			return `mostly_clear_${isDaytime ? "day" : "night"}.svg`;
		case "45":
		case "48":
			return "fog.svg";
		case "51":
		case "53":
		case "55":
			return "drizzle.svg";
		case "56":
		case "57":
			return "freezing_drizzle.svg";
		case "61":
		case "63":
		case "65":
			return "rain_showers.svg";
		case "66":
		case "67":
			return "freezing_rain.svg";
		case "71":
		case "73":
		case "75":
			return "snow_fall.svg";
		case "77":
			return "snow_grains.svg";
		case "80":
		case "81":
		case "82":
			return "rain_showers.svg";
		case "85":
		case "86":
			return "snow_showers.svg";
		case "95":
			return "thunderstorm.svg";
		case "96":
		case "99":
			return "thunderstorm_hail.svg";
		default:
			return `clear_${isDaytime ? "day" : "night"}.svg`;
	}
}
