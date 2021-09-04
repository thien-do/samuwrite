import * as monaco from "monaco-editor";
import { ThemeBaseColors } from "./base";

type Rule = monaco.editor.ITokenThemeRule;

const colors = {
	red: "#F97583",
	blue1: "#9ECBFF",
	blue2: "79B8FF",
	purple: "#B392F0",
	gray: "#6A737D",
	orange: "#FFAB70",
	green: "#85E89D",
};

interface Options {
	code: "duo" | "colorful";
}

export const getEditorThemeRules = (
	base: ThemeBaseColors,
	options: Options
): Rule[] => {
	const rules: Rule[] = [];

	// Basic style
	rules.push(
		{ token: "", foreground: base.text },
		{ token: "invalid", foreground: base.error },
		{ token: "emphasis", fontStyle: "italic" },
		{ token: "strong", fontStyle: "bold" }
	);

	// Mute markdown coloring
	rules.push(
		{ token: "comment.md", foreground: base.sub },
		{ token: "keyword.md", foreground: base.text, fontStyle: "bold" },
		{ token: "keyword.table.header.md", foreground: base.text },
		{ token: "keyword.table.middle.md", foreground: base.text },
		{ token: "keyword.table.left.md", foreground: base.text },
		{ token: "keyword.table.right.md", foreground: base.text },
		{ token: "string.md", foreground: base.text },
		{ token: "string.link.md", foreground: base.sub },
		// Background doesn't work yet: https://github.com/microsoft/monaco-editor/issues/586
		{ token: "variable.md", foreground: base.text, background: base.sub },
		{ token: "tag.md", foreground: base.sub },
		{ token: "string.html.md", foreground: base.sub },
		{ token: "delimiter.html.md", foreground: base.sub },
		{ token: "attribute.name.html.md", foreground: base.sub }
	);

	switch (options.code) {
		case "colorful":
			rules.push(
				{ token: "keyword", foreground: colors.red },
				{ token: "string", foreground: colors.blue1 },
				{ token: "identifier", foreground: colors.purple },
				{ token: "type.identifier", foreground: colors.orange },
				{ token: "comment", foreground: colors.gray },
				{ token: "number", foreground: colors.blue2 },
				{ token: "tag", foreground: colors.green },
				{ token: "tag.css", foreground: colors.purple },
				{ token: "attribute.name", foreground: colors.purple },
				{ token: "attribute.value", foreground: colors.orange },
				{ token: "string.key", foreground: colors.purple }
			);
			break;
		case "duo":
			rules.push(
				{ token: "keyword", foreground: base.main },
				{ token: "comment", foreground: base.sub },
				{ token: "number", foreground: base.main },
				{ token: "tag", foreground: base.main }
			);
			break;
	}

	return rules;
};
