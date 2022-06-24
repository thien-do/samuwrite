import { useEffect } from "react";
import { SizeName, SIZE_METRICS } from "~/src/prefs/size/size";
import { PrefsState } from "~/src/prefs/state";
import { ThemeName, THEME_DETAILS } from "~/src/theme/theme";
import { isApple } from "~/src/utils/platform";
import { EditorState } from "./state";

interface Params {
  editor: EditorState;
  prefs: PrefsState;
}

const getWeight = (params: { theme: ThemeName; size: SizeName }): number => {
  // Should not have complicated calculation for low dpi screen
  if (window.devicePixelRatio === 1) return 400;
  // Light text on dark background makes text look bolder
  const darkMod = THEME_DETAILS[params.theme].scheme === "dark" ? -20 : 0;
  // Apple renders font bolder than Windows
  const appleMod = isApple() ? -35 : 0;
  // Final value
  const { weight } = SIZE_METRICS[params.size];
  const final = weight + appleMod + darkMod;
  return final;
};

/**
 * Update editor font size and line height following user preference
 */
export const useEditorSize = (params: Params): void => {
  const editor = params.editor.value;
  const size = params.prefs.size;
  const theme = params.prefs.theme;

  useEffect(() => {
    if (editor === null) return;
    const metrics = SIZE_METRICS[size];
    editor.updateOptions({
      fontSize: metrics.fontSize,
      lineHeight: Math.round(metrics.fontSize * metrics.lineHeight),
      fontWeight: getWeight({ size, theme }).toString(),
      // @TODO: Calculate letter spacing using metrics.spacing
      // letterSpacing:
    });
  }, [editor, size, theme]);
};
