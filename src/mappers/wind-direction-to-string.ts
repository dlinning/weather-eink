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
