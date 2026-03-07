import type { MeteoDateTime, MeteoTimeString } from "@/types/string-types";

import { AppCtx } from "@/scripts/store";
import { GetHourMinuteFromTime } from "./helpers";

/**
 * For the given {@link time}, determines if the value is "daylight" or "night time".
 *
 * If only given "HH:MM" data, assumes "today"
 */
export function IsDaylight(time: MeteoTimeString | MeteoDateTime): boolean {
	const dailyData = AppCtx.data?.daily;

	if (dailyData == undefined) {
		// Just always be daylight
		return true;
	}

	// Default to "today"
	var dayIndex = 0;
	const timeSplit = time.split("T");
	if (timeSplit.length == 2) {
		// Has YYYY-MM-DDTHH:MM
		dayIndex = dailyData.time.findIndex((t) => t == timeSplit[0]) ?? 0;
	}

	const sunrise = GetHourMinuteFromTime(dailyData.sunrise[dayIndex]! ?? "06:00"),
		sunset = GetHourMinuteFromTime(dailyData.sunset[dayIndex]! ?? "18:00");

	const timeHour = GetHourMinuteFromTime(time);

	return timeHour >= sunrise && timeHour <= sunset;
}
