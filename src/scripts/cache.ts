import type { IGeoData, OpenMeteoResult } from "@/types";

type CacheMapping = {
	"last-weather": OpenMeteoResult;
	position: IGeoData;
};

export function GetFromCache<Key extends keyof CacheMapping>(key: Key): CacheMapping[Key] | null {
	var stored = localStorage.getItem(key);

	if (stored == null || stored[0] != "{") {
		return null;
	}

	return JSON.parse(stored) as CacheMapping[Key];
}

export function StoreToCache<Key extends keyof CacheMapping>(key: Key, data: CacheMapping[Key]): void {
	localStorage.setItem(key, JSON.stringify(data));
}
