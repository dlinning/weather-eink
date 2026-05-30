import ErrorOverlay from "@/Components/Overlays/ErrorOverlay";
import LoaderOverlay from "@/Components/Overlays/Loader";
import { GetUserPosition } from "@/scripts/get-position";
import { FetchOpenMeteoWeather } from "@/scripts/get-weather-data";
import type { IApiContext } from "@/types/app-ctx";
import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type PropsWithChildren
} from "react";

const ApiContext = createContext<IApiContext>(null!);

const createApi = (): IApiContext => {
	//#region State
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [apiData, setApiData] = useState<IApiContext["data"]>(null);

	const userGeo = useMemo(() => {
		return GetUserPosition();
	}, []);
	//#endregion State

	//#region Effects
	useEffect(() => {
		_init();
	}, []);
	//#endregion Effects

	//#region Functions
	const _init = async () => {
		var geo = GetUserPosition();

		if (geo != null) {
			var apiResp = await FetchOpenMeteoWeather(geo);

			if (apiResp?.error == null) {
				setApiData(apiResp);
			}
		}

		// Always indicate we didn't error
		setIsLoading(false);
	};
	//#endregion Functions

	return {
		isLoading,
		data: apiData,
		userGeo
	};
};

//#region Exports
export const ProvideApi = ({ children }: PropsWithChildren) => {
	const Api = createApi();

	return (
		<ApiContext.Provider value={Api}>
			{Api.isLoading && <LoaderOverlay />}
			{Api.isLoading == false && (
				<>
					<ErrorOverlay />
					{children}
				</>
			)}
		</ApiContext.Provider>
	);
};

export const useApi = () => {
	return useContext(ApiContext);
};
//#endregion Exports
