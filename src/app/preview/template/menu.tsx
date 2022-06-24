import { MenuAction, MenuItem } from "~/src/menu/item/interface";
import { PrefsState } from "~/src/prefs/state";
import {
  PreviewTemplateName,
  PREVIEW_TEMPLATE_DETAILS,
  PREVIEW_TEMPLATE_NAMES,
} from "./state";

const toMenuItem =
  (prefs: PrefsState) =>
  (name: PreviewTemplateName): MenuAction => {
    const detail = PREVIEW_TEMPLATE_DETAILS[name];
    return {
      action: () => void prefs.setPreviewTemplate(name),
      label: detail.name,
      active: prefs.previewTemplate === name,
    };
  };

export const getPreviewTemplateMenu = (prefs: PrefsState): MenuItem[] => [
  {
    type: "group",
    heading: { text: "Preview Template" },
    actions: PREVIEW_TEMPLATE_NAMES.map(toMenuItem(prefs)),
  },
];
