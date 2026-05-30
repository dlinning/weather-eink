import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths"; // 1. Import it

export default defineConfig({
	plugins: [preact(), tsconfigPaths()]
});
