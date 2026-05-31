import WeatherConditionIcon from "@/Components/ConditionIcon";
import { useApi } from "@/Contexts/ApiContext";
import { UvIndexToLabel } from "@/mappers/uv-index-to-label";
import type { ReactNode } from "preact/compat";
import { useMemo } from "preact/hooks";
import styles from "./PrimaryForecast.module.scss";

interface ICellProps {
	label: string;
	isSecondary: boolean;
	value: ReactNode;
	unit: string;

	/**
	 * If true, unit will be in <sup>.
	 *
	 * Default is <span>
	 */
	unitSup?: true;
}

const PrimaryForecast = () => {
	//#region Context / Hooks Grabbing
	const { data } = useApi();
	//#endregion Context / Hooks Grabbing

	//#region State
	const current = useMemo(() => {
		return data?.current;
	}, [data?.current]);

	const cells = useMemo<ICellProps[]>(() => {
		if (current == null) {
			return [];
		}

		return [
			{
				label: "Feels Like",
				isSecondary: false,
				value: current.feelsLikeTemp,
				unit: "°",
				unitSup: true
			},
			{
				label: "Humidity",
				// 40-60% is "comfortable" and can likely be ignored
				isSecondary: current.humidity >= 40 && current.humidity <= 60,
				value: current.humidity,
				unit: "%"
			},
			{
				label: "Precip",
				// High enough chance of rain to care
				isSecondary: current.precipPercent <= 10,
				value: current.precipPercent,
				unit: "%"
			},
			{
				label: "Real Temp",
				// Make smaller when the temperature difference is small
				isSecondary: Math.abs(current.realTemp - current.feelsLikeTemp) <= 5,
				value: current.realTemp,
				unit: "°",
				unitSup: true
			},
			{
				label: "UV Index",
				// Don't care if "low"
				isSecondary: UvIndexToLabel(current.uvIndex) == "Low",
				value: current.uvIndex,
				unit: UvIndexToLabel(current.uvIndex)
			},
			{
				label: `Wind ${current.windDir}`,
				// Not too fast of wind
				isSecondary: current.windSpeed < 10,
				value: current.windSpeed,
				unit: "mph"
			}
		];
	}, [current]);
	//#endregion State

	//#region Returns
	if (current == null) {
		return null;
	}

	return (
		<div className={styles.root}>
			<div>
				<WeatherConditionIcon codeAndDay={current} className={styles.conditionIcon} />
			</div>

			<div className={styles.itemsWrap}>
				{cells.map((cell) => {
					return (
						<div
							key={cell.label}
							className={`${styles.item} ${cell.isSecondary ? styles.itemSecondary : ""}`}
						>
							<span className={styles.label}>{cell.label}</span>
							<div className={styles.value}>
								<span>{cell.value}</span>
								<span className={`${styles.unit} ${cell.unitSup ? styles.unitSup : ""}`}>
									{cell.unit}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
	//#endregion Returns
};

export default PrimaryForecast;
