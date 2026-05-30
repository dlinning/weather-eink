import { weatherCodeToIcon } from "@/mappers/weather-code-to-icon";
import type { ForecastItem } from "@/types/meteo-api";
import { useMemo } from "preact/hooks";
import styles from "./ConditionIcon.module.scss";

//#region Interface Declaration
interface WeatherConditionIconProps {
	/**
	 * The forecast information
	 */
	codeAndDay: Pick<ForecastItem, "code" | "isDay">;

	className?: string;
}
//#endregion Interface Declaration

const WeatherConditionIcon = ({ codeAndDay, className }: WeatherConditionIconProps) => {
	//#region State
	const iconUrl = useMemo<string>(() => {
		return weatherCodeToIcon(codeAndDay.code, codeAndDay.isDay);
	}, [codeAndDay]);
	//#endregion State

	//#region Returns
	return (
		<div className={`${styles.iconRoot} ${className ?? ""}`}>
			<img src={`/icons/${iconUrl}`} className={styles.icon} />
		</div>
	);
	//#endregion Returns
};

export default WeatherConditionIcon;
