import { DOMAttributes, DragEvent, useRef, useState } from "react";
import { EditorState } from "~src/editor/state/state";
import { FileModel, FileState } from "~src/file/state";
import { getFileModel } from "~src/file/system";
import { ERRORS } from "~src/utils/error";
import { appOpenFile } from "../utils/open";

interface AppDropState {
	dragging: boolean;
	handlers: Pick<
		DOMAttributes<HTMLDivElement>,
		"onDrop" | "onDragOver" | "onDragEnter" | "onDragLeave"
	>;
}

interface Params {
	file: FileState;
	editor: EditorState;
}

const getDropFileModel = async (event: DragEvent): Promise<FileModel> => {
	const item = event.dataTransfer.items[0];

	if (typeof item.getAsFileSystemHandle === "function") {
		const handle = await item.getAsFileSystemHandle();
		if (handle === null) throw ERRORS.dropType;
		if (!(handle instanceof FileSystemFileHandle)) throw ERRORS.fileFolder;
		return getFileModel(handle);
	} else {
		const file = item.getAsFile();
		if (file === null) throw ERRORS.dropType;
		return file;
	}
};

export const useAppDrop = (params: Params): AppDropState => {
	// Keep a counter to reliably detect when the drag is still there. We can
	// not mute pointer-events on App's children (editor and toolbar).
	// https://stackoverflow.com/a/21002544
	const counter = useRef(0);
	// Since ref does not trigger re-render, we still need a state, but we will
	// only set this state when counter is changed between 0 and 1 to avoid
	// unnecessary re-renders
	const [dragging, setDragging] = useState(false);

	const onDrop = async (event: DragEvent) => {
		event.preventDefault();

		// Set the UI
		setDragging(false);
		counter.current = 0;

		// Load to editor
		const fileModel = await getDropFileModel(event);
		appOpenFile({
			editor: params.editor.value,
			fileDirty: params.file.dirty,
			setFileDirty: params.file.setDirty,
			fileModel: fileModel,
			setFileModel: params.file.setModel,
		});
	};

	const onDragOver = (event: DragEvent): void => {
		// Specifying this as a drop target
		// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
		event.preventDefault();
	};

	const onDragEnter = (event: DragEvent): void => {
		// Specifying this as a drop target
		// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
		event.preventDefault();
		if (counter.current === 0) setDragging(true);
		counter.current = counter.current + 1;
	};

	const onDragLeave = (_event: DragEvent): void => {
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
