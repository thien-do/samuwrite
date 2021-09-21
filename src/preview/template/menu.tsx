import { MenuItem } from "~src/menu/item/item";
import { PrefsState } from "~src/prefs/state";
import {
	PreviewTemplateName,
	PREVIEW_TEMPLATE_DETAILS,
	PREVIEW_TEMPLATE_NAMES,
} from "./state";

const toMenuItem =
	(prefs: PrefsState) =>
	(name: PreviewTemplateName): MenuItem => {
		const detail = PREVIEW_TEMPLATE_DETAILS[name];
		return {
			type: "action",
			action: () => void prefs.setPreviewTemplate(name),
			label: detail.name,
		};
	};

export const getPreviewTemplateMenu = (prefs: PrefsState): MenuItem[] => {
	const menu: MenuItem[] = [
		{ type: "heading", text: "Preview Template" },
		...PREVIEW_TEMPLATE_NAMES.map(toMenuItem(prefs)),
	];
	return menu;
};
