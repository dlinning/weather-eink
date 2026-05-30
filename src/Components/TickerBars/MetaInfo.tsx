import { useMemo } from "preact/hooks";
import styles from "./TickerBars.module.scss";

const Ticker_MetaInfo = () => {
	//#region State
	const currentTimeDisplay = useMemo<string>(() => {
		var date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();

		return `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, "0")}`;
	}, []);
	//#endregion State

	//#region Returns
	return (
		<div className={`${styles.ticker} ${styles.metaInfo}`}>
			<span>{currentTimeDisplay}</span>
		</div>
	);
	//#endregion Returns
};

export default Ticker_MetaInfo;
