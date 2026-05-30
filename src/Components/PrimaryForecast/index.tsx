import WeatherConditionIcon from "@/Components/ConditionIcon";
import { useApi } from "@/Contexts/ApiContext";
import { useMemo } from "preact/hooks";
import styles from "./PrimaryForecast.module.scss";

const PrimaryForecast = () => {
	//#region Context / Hooks Grabbing
	const { data } = useApi();
	//#endregion Context / Hooks Grabbing

	//#region State
	const current = useMemo(() => {
		return data?.current;
	}, [data?.current]);
	//#endregion State

	//#region Effects
	//#endregion Effects

	//#region Functions
	//#endregion Functions

	//#region Returns
	if (current == null) {
		return null;
	}

	return (
		<div className={styles.root}>
			<div>
				<WeatherConditionIcon codeAndDay={current} size="5rem" />
			</div>

			<div className={styles.row}>
				<div className={styles.col}>
					<span>{current.precipPercent}%</span>
					<span>{current.windDir}</span>
					<span>{current.windSpeed}</span>
				</div>
				<div className={styles.col}>
					<b>{current.feelsLikeTemp}</b>
					<b>{current.humidity}%</b>
				</div>
			</div>
		</div>
	);
	//#endregion Returns
};

export default PrimaryForecast;
