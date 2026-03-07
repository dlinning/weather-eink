type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type OneToNine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type MinuteStart = "0" | "1" | "2" | "3" | "4" | "5";

type Year = `20${Digit}${Digit}`;
type Month = `0${OneToNine}` | `1${0 | 1 | 2}`;
type Day = `${0}${OneToNine}` | `${1 | 2}${Digit}` | `3${0 | 1}`;

type Hour = `0${Digit}` | `1${OneToNine}` | `2${"0" | "1" | "2" | "3"}`;
type Minute = `${MinuteStart}${Digit}`;

export type MeteoDateString = `${Year}-${Month}-${Day}`;
export type MeteoTimeString = `${Hour}:${Minute}`;

export type MeteoDateTime = `${number}-${number}-${number}T${MeteoTimeString}`;

export type MeteoWeatherCodes =
	// 	Clear sky
	| "0"
	// 	Mainly clear, partly cloudy, and overcast
	| "1"
	| "2"
	| "3"
	// 	Fog and depositing rime fog
	| "45"
	| "48"
	// 	Drizzle: Light, moderate, and dense intensity
	| "51"
	| "53"
	| "55"
	// 	Freezing Drizzle: Light and dense intensity
	| "56"
	| "57"
	// 	Rain: Slight, moderate and heavy intensity
	| "61"
	| "63"
	| "65"
	// 	Freezing Rain: Light and heavy intensity
	| "66"
	| "67"
	// 	Snow fall: Slight, moderate, and heavy intensity
	| "71"
	| "73"
	| "75"
	// 	Snow grains
	| "77"
	// 	Rain showers: Slight, moderate, and violent
	| "80"
	| "81"
	| "82"
	// 	Snow showers slight and heavy
	| "85"
	| "86"
	//  *	Thunderstorm: Slight or moderate
	| "95"
	//  *	Thunderstorm with slight and heavy hail
	| "96"
	| "99";
