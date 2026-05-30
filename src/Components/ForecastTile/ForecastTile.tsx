import WeatherConditionIcon from "@/Components/ConditionIcon";
import type { ForecastItem } from "@/types/meteo-api";
import styles from "./ForecastRow.module.scss";

//#region Interface Declaration
interface ForecastTileProps {
	item: ForecastItem;
}
//#endregion Interface Declaration

const ForecastTile = ({ item }: ForecastTileProps) => {
	return (
		<div className={styles.tile}>
			<div className={styles.label}>{item.label}</div>

			<WeatherConditionIcon codeAndDay={item} size="2rem" />

			<div className={styles.value}>{item.feelsLikeTemp}°</div>

			{item.precipPercent > 0 && <span className={styles.subValue}>{item.precipPercent}%</span>}
		</div>
	);
};

export default ForecastTile;
