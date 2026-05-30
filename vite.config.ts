import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [preact()],
	css: {
		modules: {
			generateScopedName: "w_[hash:base64:5]"
		}
	},
	build: {
		minify: "oxc"
	},
	resolve: {
		tsconfigPaths: true
	}
});
