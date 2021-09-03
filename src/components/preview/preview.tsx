import { Editor } from "../editor/state/state";
import s from "./preview.module.css";
import { usePreviewHtml } from "./state/html";

interface Props {
	editor: Editor | null;
}

export const Preview = (props: Props): JSX.Element => {
	const { editor } = props;
	const __html = usePreviewHtml({ editor });
	return (
		<div className={s.container}>
			<div dangerouslySetInnerHTML={{ __html }} />
		</div>
	);
};
