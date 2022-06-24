import type * as monaco from "monaco-editor";
import { ThemeDetail, ThemeColors } from "~/src/app/theme/theme";

type Rule = monaco.editor.ITokenThemeRule;

const colors = {
  light: {
    red: "#CF222E",
    blue1: "#0969DA",
    blue2: "#0550AE",
    purple: "#8250DF",
    gray: "#6E7781",
    orange: "#BC4C00",
    green: "#2DA44E",
  },
  dark: {
    red: "#F97583",
    blue1: "#9ECBFF",
    blue2: "79B8FF",
    purple: "#B392F0",
    gray: "#6A737D",
    orange: "#FFAB70",
    green: "#85E89D",
  },
  "high-contrast": {
    red: "#FF6A69",
    blue1: "#409EFF",
    blue2: "#409EFF",
    purple: "#B87FFF",
    gray: "#9EA7B3",
    orange: "#E7811D",
    green: "#09B43A",
  },
};

interface Options {
  code: "duo" | "colorful";
}

/**
 * Return monaco theme's rules (i.e. colors for tokens such as keywords and
 * comments)
 */
export const getEditorThemeRules = (
  scheme: ThemeDetail["scheme"],
  theme: ThemeColors,
  options: Options
): Rule[] => {
  const rules: Rule[] = [];

  // Basic style
  rules.push(
    { token: "", foreground: theme.text.hex() },
    { token: "invalid", foreground: theme.error.hex() },
    { token: "emphasis", fontStyle: "italic" },
    { token: "strong", fontStyle: "bold" }
  );

  // Mute markdown coloring
  rules.push(
    { token: "comment.md", foreground: theme.sub.hex() },
    { token: "comment.content.md", foreground: theme.sub.hex() },
    { token: "keyword.md", foreground: theme.text.hex(), fontStyle: "bold" },
    { token: "keyword.table.header.md", foreground: theme.text.hex() },
    { token: "keyword.table.middle.md", foreground: theme.text.hex() },
    { token: "keyword.table.left.md", foreground: theme.text.hex() },
    { token: "keyword.table.right.md", foreground: theme.text.hex() },
    { token: "string.md", foreground: theme.text.hex() },
    { token: "string.link.md", foreground: theme.sub.hex() },
    // Background doesn't work yet: https://github.com/microsoft/monaco-editor/issues/586
    {
      token: "variable.md",
      foreground: theme.text.hex(),
      background: theme.sub.hex(),
    },
    { token: "tag.md", foreground: theme.sub.hex() },
    { token: "string.html.md", foreground: theme.sub.hex() },
    { token: "delimiter.html.md", foreground: theme.sub.hex() },
    { token: "attribute.name.html.md", foreground: theme.sub.hex() }
  );

  switch (options.code) {
    case "colorful":
      rules.push(
        { token: "keyword", foreground: colors[scheme].red },
        { token: "string", foreground: colors[scheme].blue1 },
        { token: "identifier", foreground: colors[scheme].purple },
        { token: "type.identifier", foreground: colors[scheme].orange },
        { token: "comment", foreground: colors[scheme].gray },
        { token: "number", foreground: colors[scheme].blue2 },
        { token: "tag", foreground: colors[scheme].green },
        { token: "tag.css", foreground: colors[scheme].purple },
        { token: "attribute.name", foreground: colors[scheme].purple },
        { token: "attribute.value", foreground: colors[scheme].orange },
        { token: "string.key", foreground: colors[scheme].purple }
      );
      break;
    case "duo":
      rules.push(
        { token: "keyword", foreground: theme.main.hex() },
        { token: "comment", foreground: theme.sub.hex() },
        { token: "number", foreground: theme.main.hex() },
        { token: "tag", foreground: theme.main.hex() }
      );
      break;
  }

  return rules;
};
