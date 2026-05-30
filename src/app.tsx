import MainLayout from "@/Components/MainLayout";
import AppContextStack from "@/Contexts/ContextStack";
import { render } from "preact";

function App() {
	return (
		<AppContextStack>
			<MainLayout />
		</AppContextStack>
	);
}

render(<App />, document.getElementById("app")!);
