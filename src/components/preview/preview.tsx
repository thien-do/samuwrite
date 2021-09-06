import { CSSProperties } from "react";
import { Editor } from "../editor/state/state";
import { PrefsState } from "../prefs/state";
import { THEME_DETAILS } from "../theme/theme";
import s from "./preview.module.css";
import { usePreviewHtml } from "./state/html";
import "./theme/tailwind.css";

interface Props {
	editor: Editor | null;
	// We only need "theme" at the moment but in the future it's likely we will
	// need other prefs (template, font size)
	prefs: PrefsState;
}

const getPaperStyle = (props: Props): CSSProperties => {
	const theme = THEME_DETAILS[props.prefs.theme];
	const background = theme.colors.bg.lighten(0.15).hex();
	return { background };
};

export const Preview = (props: Props): JSX.Element => {
	const { editor } = props;
	const __html = usePreviewHtml({ editor });
	return (
		<div className={s.container}>
			<div className={[s.paper].join(" ")} style={getPaperStyle(props)}>
				<div
					className={[
						s.content,
						"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto",
					].join(" ")}
					dangerouslySetInnerHTML={{ __html }}
				/>
			</div>
		</div>
	);
};
