import { ProvideApi } from "@/Contexts/ApiContext";
import type { ReactNode } from "preact/compat";

const AppContextStack = ({ children }: { children: ReactNode }) => {
	return <ProvideApi>{children}</ProvideApi>;
};

export default AppContextStack;
