import type { IGeoData } from "@/types/app-ctx";
import { GetFromCache, StoreToCache } from "./cache";

/**
 * Checks URL params first, otherwise goes to Cache.
 *
 * If not present in either location, returns `null`
 */
export function GetUserPosition(): IGeoData | null {
	//#region Check URL params
	var searchParams = new URLSearchParams(document.location.search);

	var longitude = searchParams.get("lng") ?? "empty";
	var latitude = searchParams.get("lat") ?? "empty";

	if (!isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude))) {
		// Valid, store and return
		var fromUrl: IGeoData = {
			longitude: longitude,
			latitude: latitude,
			name: searchParams.get("name") ?? undefined
		};

		StoreToCache("position", fromUrl);

		return fromUrl;
	}

	//#endregion

	// Fallback to cache
	var cached = GetFromCache("position");

	return cached;
}
