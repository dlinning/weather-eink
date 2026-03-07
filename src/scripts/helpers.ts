import type { MeteoDateTime, MeteoTimeString } from "@/types/string-types";

export function DateTimeToHourLabel(dt: Date | string): string {
	const d = new Date(dt);

	let h = d.getHours();
	if (h % 12 == 0) {
		h = 12;
	} else if (h > 12) {
		h -= 12;
	}

	return `${h} ${d.getHours() < 12 ? "AM" : "PM"}`;
}

type KeysOfType<T, V> = {
	[K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * Finds the minimum and maximum of the {@link items},
 * using {@link prop} if {@link T} is an object
 */
export function MinAndMax<T extends number | object>(items: T[], prop?: KeysOfType<T, number>) {
	var res = { min: Infinity, max: -Infinity };

	// Check typing
	if (typeof items[0] === "object" && prop == undefined) {
		console.error("Items not numbers, and no `prop` defined", items[0]);
		return res;
	}

	for (const item of items) {
		let v: number = typeof item == "number" ? item : (item[prop!] as number);

		if (v < res.min) {
			res.min = v;
		}
		if (v > res.max) {
			res.max = v;
		}
	}

	return res;
}

/**
 * Gets just the "HH:MM" data from {@link time}
 */
export function GetHourMinuteFromTime(time: MeteoDateTime | MeteoTimeString): MeteoTimeString {
	if (time.includes("T")) {
		return time.split("T")[1] as MeteoTimeString;
	}

	return time as MeteoTimeString;
}
