import { useStorageState } from "~/src/utils/state/storage";
import { SetState } from "~/src/utils/state/type";

export interface PreviewLayoutState {
  /**
   * Whether the preview panel is visible or not. It can be full or split
   * with the editor (see "previewSplit").
   */
  previewVisible: boolean;
  setPreviewVisible: SetState<boolean>;
  /**
   * Whether the app should show the preview panel only or split and show
   * both the preview and the editor.
   */
  previewSplit: boolean;
  setPreviewSplit: SetState<boolean>;
}

export const usePreviewLayoutState = (): PreviewLayoutState => {
  const [previewVisible, setPreviewVisible] = useStorageState<boolean>({
    defaultValue: false,
    storageKey: "preview-visible",
  });
  const [previewSplit, setPreviewSplit] = useStorageState<boolean>({
    defaultValue: true,
    storageKey: "preview-split",
  });

  return { previewVisible, setPreviewVisible, previewSplit, setPreviewSplit };
};
