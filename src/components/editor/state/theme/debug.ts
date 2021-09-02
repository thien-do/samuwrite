// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as platform from "monaco-editor/esm/vs/platform/registry/common/platform";

export const DEBUG_printAllColors = (): void => {
	const colors = platform.Registry.data.get("base.contributions.colors")
		.colorSchema.properties;

	const text = Object.keys(colors)
		.map((key) => {
			const val = colors[key];
			return [`// ${val.description}`, `// "${key}": ,`].join("\n");
		})
		.join("\n");

	console.log(text);
};
