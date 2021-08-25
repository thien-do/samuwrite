import { RefObject, useEffect, useRef } from "react";
import { createEditor } from "./create";
import s from "./editor.module.css";
import { Editor as EditorType } from "./type";

interface Props {
	setEditor: (editor: EditorType) => void;
}

const getContainer = (ref: RefObject<HTMLDivElement>): HTMLDivElement => {
	const container = ref.current;
	if (container === null) throw Error("Ref container is null");
	return container;
};

export const Editor = (props: Props) => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const statusContainerRef = useRef<HTMLDivElement>(null);

	const { setEditor } = props;
	useEffect(() => {
		const { editor, vimMode } = createEditor({
			editor: getContainer(editorContainerRef),
			status: getContainer(statusContainerRef),
		});
		setEditor(editor);
		return () => {
			editor.dispose();
			vimMode.dispose();
		};
	}, [setEditor]);

	return (
		<div className={s.container}>
			<div className={s.editor} ref={editorContainerRef} />
			<div className={s.status} ref={statusContainerRef} />
		</div>
	);
};
