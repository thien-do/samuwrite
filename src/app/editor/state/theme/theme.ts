import * as monaco from "monaco-editor";
import { useEffect } from "react";
import { EditorState } from "~/src/editor/state/state";
import { PrefsState } from "~/src/prefs/state";
import { ThemeDetail, THEME_DETAILS } from "~/src/theme/theme";
import { getEditorThemeColors } from "./colors";
import { getEditorThemeRules } from "./rules";

interface Params {
  editor: EditorState;
  prefs: PrefsState;
}

const baseThemes: Record<ThemeDetail["scheme"], monaco.editor.BuiltinTheme> = {
  "high-contrast": "hc-black",
  dark: "vs-dark",
  light: "vs",
};

export const useEditorTheme = (params: Params): void => {
  const editor = params.editor.value;
  const name = params.prefs.theme;

  useEffect(() => {
    if (editor === null) return;
    // This actually does not depend on the "editor" at all, but a global
    // option of Monaco. We intentionally ask for the "editor" instance for
    // completeness.

    const detail = THEME_DETAILS[name];
    const colors = detail.colors;
    monaco.editor.defineTheme("custom", {
      base: baseThemes[detail.scheme],
      inherit: false,
      colors: getEditorThemeColors(colors), // UI colors
      rules: getEditorThemeRules(detail.scheme, colors, { code: "colorful" }), // Token colors
    });
    monaco.editor.setTheme("custom");
  }, [name, editor]);
};
