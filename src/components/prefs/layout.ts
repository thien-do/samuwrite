import { Dispatch, SetStateAction } from "react";
import { useStorageState } from "~src/utils/state/storage";

export type Layout = "editor" | "preview" | "split";

export interface LayoutState {
	layout: Layout;
	setLayout: Dispatch<SetStateAction<Layout>>;
}

export const usePrefsLayout = (): LayoutState => {
	const [layout, setLayout] = useStorageState<Layout>({
		defaultValue: "editor",
		storageKey: "layout",
	});

	return { layout, setLayout };
};
