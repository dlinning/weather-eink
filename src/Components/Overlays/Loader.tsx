import { useApi } from "@/Contexts/ApiContext";
import styles from "./Overlays.module.scss";

const LoaderOverlay = () => {
	//#region Context / Hooks Grabbing
	const { isLoading } = useApi();
	//#endregion Context / Hooks Grabbing

	//#region Returns
	if (isLoading == false) {
		return null;
	}

	return (
		<div className={styles.overlay}>
			<div className={styles.spinner}></div>
		</div>
	);
	//#endregion Returns
};

export default LoaderOverlay;
