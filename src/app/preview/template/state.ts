import { useStorageState } from "~/src/lib/utils/state/storage";
import { SetState } from "~/src/lib/utils/state/type";
import * as styles from "./styles/styles";

export const PREVIEW_TEMPLATE_NAMES = ["tailwind", "github", "serif"] as const;

export type PreviewTemplateName = typeof PREVIEW_TEMPLATE_NAMES[number];

export interface PreviewTemplateDetail {
  name: string;
  className: string;
}

export interface PreviewTemplateState {
  previewTemplate: PreviewTemplateName;
  setPreviewTemplate: SetState<PreviewTemplateName>;
}

export const PREVIEW_TEMPLATE_DETAILS: Record<
  PreviewTemplateName,
  PreviewTemplateDetail
> = {
  github: {
    name: `GitHub`,
    className: styles.github.container,
  },
  tailwind: {
    name: `Tailwind`,
    className: styles.tailwind.container,
  },
  serif: {
    name: "Serif",
    className: styles.serif.container,
  },
};

export const usePreviewTemplateState = (): PreviewTemplateState => {
  const [previewTemplate, setPreviewTemplate] =
    useStorageState<PreviewTemplateName>({
      defaultValue: "github",
      storageKey: "preview-template",
    });

  return { previewTemplate, setPreviewTemplate };
};
