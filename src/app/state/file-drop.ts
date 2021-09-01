import { useEffect, useRef, useState } from "react";
import { FileState } from "~src/components/file/state";

interface AppDropState {
	ref: React.RefObject<HTMLDivElement>;
	dragging: boolean;
}

interface Params {
	file: FileState;
}

const handleDragOver = (e: DragEvent) => e.preventDefault();

export const useFileDrop = (params: Params): AppDropState => {
	const [dragging, setDragging] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleDrop = async (e: DragEvent) => {
		e.preventDefault();
		setDragging(false);
		if (!e.dataTransfer) return;

		const { items } = e.dataTransfer;
		if (1 < items.length || items[0].kind !== "file")
			throw Error("Only a single file upload is supported.");

		const file = await items[0].getAsFileSystemHandle();
		if (file) params.file.setFile(file as FileSystemFileHandle);
	};

	const handleDragEnter = (e: DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer?.items && e.dataTransfer.items.length > 0)
			setDragging(true);
	};

	const handleDragLeave = (e: DragEvent) => {
		e.preventDefault();
		setDragging(false);
	};

	useEffect(() => {
		const { current } = ref;
		if (!current) throw Error("Drop ref is null");
		// Handle drag and drop events
		current.addEventListener("dragover", handleDragOver);
		current.addEventListener("drop", handleDrop);
		// Handle drag in and out
		current.addEventListener("dragenter", handleDragEnter);
		current.addEventListener("dragleave", handleDragLeave);
		return () => {
			current.removeEventListener("dragover", handleDragOver);
			current.removeEventListener("drop", handleDrop);
			current.removeEventListener("dragenter", handleDragEnter);
			current.removeEventListener("dragleave", handleDragLeave);
		};
	}, [ref]);

	return { ref, dragging };
};
