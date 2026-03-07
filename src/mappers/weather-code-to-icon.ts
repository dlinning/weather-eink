import type { MeteoDateTime, MeteoTimeString, MeteoWeatherCodes } from "@/types/string-types";

/**
 * Takes the {@link code} and returns the name of an SVG icon
 * for the code.
 *
 * {@link time} is used for day/night handling
 */
export function weatherCodeToIcon(code: MeteoWeatherCodes, time: MeteoTimeString | MeteoDateTime): string {
	//#region Day/Night detection
	let hour: number = 12;
	if (time.length == 5) {
		// HH:MM
		hour = parseInt(time.split(":")[0]!);
	} else if (time.length == 16) {
		// YYYY-MM-DDTHH:MM
		hour = parseInt(time.split("T")[1]!.split(":")[0]!);
	}
	const isDay = hour < 18;
	//#endregion

	switch (code) {
		case "0":
			return `clear_${isDay ? "day" : "night"}.svg`;
		case "1":
		case "2":
		case "3":
			return `mostly_clear_${isDay ? "day" : "night"}.svg`;
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
			return `clear_${isDay ? "day" : "night"}.svg`;
	}
}
