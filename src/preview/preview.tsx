import { CSSProperties } from "react";
import { Editor } from "../editor/state/state";
import { PrefsState } from "../prefs/state";
import { THEME_DETAILS } from "../theme/theme";
import s from "./preview.module.css";
import { usePreviewHtml } from "./state/html";
import { usePreviewScroll } from "./state/scroll";
import { PREVIEW_TEMPLATE_DETAILS } from "./template/state";

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
	const contentRef = usePreviewScroll({ editor });
	const __html = usePreviewHtml({ editor });
	const template = PREVIEW_TEMPLATE_DETAILS[props.prefs.previewTemplate];
	return (
		<div className={s.container}>
			<div className={[s.paper].join(" ")} style={getPaperStyle(props)}>
				<div
					ref={contentRef}
					className={[s.content, template.className].join(" ")}
					dangerouslySetInnerHTML={{ __html }}
				/>
			</div>
		</div>
	);
};
