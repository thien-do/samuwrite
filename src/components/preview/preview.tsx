import { Editor } from "../editor/state/state";
import s from "./preview.module.css";
import { usePreviewHtml } from "./state/html";
import "./theme/tailwind.css";

interface Props {
	editor: Editor | null;
}

export const Preview = (props: Props): JSX.Element => {
	const { editor } = props;
	const __html = usePreviewHtml({ editor });
	return (
		<div className={s.container}>
			<div className={[s.paper].join(" ")}>
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
