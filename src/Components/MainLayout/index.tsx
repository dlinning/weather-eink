import ForecastTileList from "@/Components/ForecastTile/ForecastTileList";
import PrimaryForecast from "@/Components/PrimaryForecast";
import Ticker_MetaInfo from "@/Components/TickerBars/MetaInfo";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
	return (
		<>
			<Ticker_MetaInfo />

			<div className={styles.main}>
				<PrimaryForecast />

				<ForecastTileList />
			</div>
		</>
	);
};

export default MainLayout;
