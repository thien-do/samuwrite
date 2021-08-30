import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type Layout = "editor" | "preview" | "split";

export interface LayoutState {
	value: Layout;
	set: Dispatch<SetStateAction<Layout>>;
}

const STORAGE_KEY = "layout";

const getInitial = (): Layout => {
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === null) return "editor";
	return stored as Layout;
};

const useSaveLayout = (layout: Layout): void => {
	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, layout);
	}, [layout]);
};

export const useLayout = (): LayoutState => {
	const [layout, setLayout] = useState<Layout>(getInitial);

	useSaveLayout(layout);

	return { value: layout, set: setLayout };
};
