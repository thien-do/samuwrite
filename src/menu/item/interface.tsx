import { ReactNode } from "react";

export interface MenuAction {
	label: string;
	action: () => void;
	shortcut?: string;
	active?: boolean;
}

export interface MenuHeading {
	text: string;
}

export interface MenuHelp {
	content: ReactNode;
}

export interface MenuGroup {
	heading: MenuHeading;
	actions: Omit<MenuAction, "shortcut">[];
}

export type MenuItem =
	| { type: "divider" }
	| ({ type: "heading" } & MenuHeading)
	| ({ type: "help" } & MenuHelp)
	| ({ type: "group" } & MenuGroup)
	| ({ type: "action" } & MenuAction);
