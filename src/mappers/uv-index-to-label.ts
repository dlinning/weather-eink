type UvLabels = "Low" | "Med" | "High" | "Very High" | "Extreme";

/**
 * Converts UV Index value (0-11+) to a {@link UvLabels} value
 *
 * @param degree Degrees from 0 to 11+. If missing, returns "Low".
 * @returns UV Index "scale" value
 */
export function UvIndexToLabel(uvIndex: number): UvLabels {
	if (isNaN(uvIndex)) {
		return "Low";
	}

	switch (true) {
		case uvIndex >= 11:
			return "Extreme";
		case uvIndex >= 8:
			return "Very High";
		case uvIndex >= 6:
			return "High";
		case uvIndex >= 3:
			return "Med";
		default:
			// Fall through
			break;
	}

	return "Low";
}
