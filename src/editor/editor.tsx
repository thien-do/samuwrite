import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { createEditor } from "./create";
import s from "./editor.module.css";
import { Editor as EditorType } from "./type";

interface Props {
	editorRef: MutableRefObject<EditorType | null>;
}

const getContainer = (ref: RefObject<HTMLDivElement>): HTMLDivElement => {
	const container = ref.current;
	if (container === null) throw Error("Ref container is null");
	return container;
};

export const Editor = (props: Props) => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const statusContainerRef = useRef<HTMLDivElement>(null);

	const { editorRef } = props;
	useEffect(() => {
		const { editor, vimMode } = createEditor({
			editor: getContainer(editorContainerRef),
			status: getContainer(statusContainerRef),
		});
		editorRef.current = editor;
		return () => {
			editor.dispose();
			vimMode.dispose();
		};
	}, [editorRef]);

	return (
		<div className={s.container}>
			<div className={s.editor} ref={editorContainerRef} />
			<div className={s.status} ref={statusContainerRef} />
		</div>
	);
};
