import * as React from "react";
import { EditorState } from "~src/components/editor/state/state";
import { FileState } from "~src/components/file/state";
import { ERRORS } from "~src/utils/error";
import { openFile } from "../utils/open";

interface AppDropState {
	dragging: boolean;
	handlers: Pick<
		React.DOMAttributes<HTMLDivElement>,
		"onDrop" | "onDragOver" | "onDragEnter" | "onDragLeave"
	>;
}

interface Params {
	file: FileState;
	editor: EditorState;
}

export const useAppDrop = (params: Params): AppDropState => {
	// Keep a counter to reliably detect when the drag is still there. We can
	// not mute pointer-events on App's children (editor and toolbar).
	// https://stackoverflow.com/a/21002544
	const counter = React.useRef(0);
	// Since ref does not trigger re-render, we still need a state, but we will
	// only set this state when counter is changed between 0 and 1 to avoid
	// unnecessary re-renders
	const [dragging, setDragging] = React.useState(false);

	const onDrop = async (event: React.DragEvent) => {
		event.preventDefault();

		// Set the UI
		setDragging(false);
		counter.current = 0;

		// Get the new handle
		const { items } = event.dataTransfer;
		const fileHandle = await items[0].getAsFileSystemHandle();
		if (fileHandle === null) throw ERRORS.dropType;
		if (!(fileHandle instanceof FileSystemFileHandle)) throw ERRORS.fileFolder;

		// Load to editor
		openFile({
			editor: params.editor.value,
			fileDirty: params.file.dirty,
			setFileDirty: params.file.setDirty,
			fileHandle,
			setFileHandle: params.file.setHandle,
		});
	};

	const onDragOver = (event: React.DragEvent): void => {
		// Specifying this as a drop target
		// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
		event.preventDefault();
	};

	const onDragEnter = (event: React.DragEvent): void => {
		// Specifying this as a drop target
		// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
		event.preventDefault();
		if (counter.current === 0) setDragging(true);
		counter.current = counter.current + 1;
	};

	const onDragLeave = (_event: React.DragEvent): void => {
		if (counter.current === 1) setDragging(false);
		counter.current = counter.current - 1;
	};

	const handlers: AppDropState["handlers"] = {
		onDrop,
		onDragEnter,
		onDragLeave,
		onDragOver,
	};

	return { handlers, dragging };
};
