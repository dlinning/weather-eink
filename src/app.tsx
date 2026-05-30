import ForecastTileList from "@/Components/ForecastTile/ForecastTileList";
import PrimaryForecast from "@/Components/PrimaryForecast";
import Ticker_MetaInfo from "@/Components/TickerBars/MetaInfo";
import AppContextStack from "@/Contexts/ContextStack";
import { render } from "preact";

function App() {
	return (
		<AppContextStack>
			<Ticker_MetaInfo />

			<PrimaryForecast />

			<ForecastTileList />
		</AppContextStack>
	);
}

render(<App />, document.getElementById("app")!);
