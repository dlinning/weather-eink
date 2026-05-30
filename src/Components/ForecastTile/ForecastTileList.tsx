import ForecastTile from "@/Components/ForecastTile/ForecastTile";
import { useApi } from "@/Contexts/ApiContext";
import { useMemo } from "preact/hooks";
import styles from "./ForecastRow.module.scss";

const ForecastTileList = () => {
	const { data, isLoading } = useApi();

	//#region State
	const shownHours = useMemo(() => {
		return data?.forecast ?? [];
	}, [isLoading, data?.forecast]);
	//#endregion State

	return (
		<div className={styles.tileListRoot}>
			{shownHours.map((hour) => (
				<ForecastTile key={hour.dateTime} item={hour} />
			))}
		</div>
	);
};

export default ForecastTileList;
