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
		<div className={`${styles.tile} flex-col`}>
			<div className={styles.label}>{item.label}</div>

			<WeatherConditionIcon codeAndDay={item} className={styles.icon} />

			<div className={styles.value}>{item.feelsLikeTemp}°</div>

			<div className={`${styles.subWrap} flex-row jcc`}>
				{item.precipPercent > 0 && <span className={styles.subValue}>{item.precipPercent}%</span>}

				{item.uvIndex > 2 && <span className={styles.subValue}>UV {item.uvIndex}</span>}
			</div>
		</div>
	);
};

export default ForecastTile;
