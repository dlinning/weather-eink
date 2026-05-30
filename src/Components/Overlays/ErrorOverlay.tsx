import { useApi } from "@/Contexts/ApiContext";
import { useMemo } from "preact/hooks";
import styles from "./Overlays.module.scss";

const ErrorOverlay = () => {
	//#region Context / Hooks Grabbing
	const { userGeo } = useApi();
	//#endregion Context / Hooks Grabbing

	//#region State
	const isMissingGeo = useMemo<boolean>(() => {
		return userGeo?.latitude == null || userGeo.longitude == null;
	}, [userGeo]);
	//#endregion State

	//#region Returns
	if (isMissingGeo == false) {
		return null;
	}

	return (
		<div className={styles.overlay}>
			<span className={styles.message}>
				<b>
					Missing <kbd>lat</kbd> and/or <kbd>lng</kbd> query params
				</b>
			</span>
		</div>
	);
	//#endregion Returns
};

export default ErrorOverlay;
