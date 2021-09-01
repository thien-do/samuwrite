import { useEffect, useRef } from "react";
import { FileState } from "~src/components/file/state";

interface Params {
	file: FileState;
}

const handleDragOver = (e: DragEvent) => e.preventDefault();

export const useFileDrop = (
	params: Params
): React.RefObject<HTMLDivElement> => {
	const dropRef = useRef<HTMLDivElement>(null);

	const handleDrop = async (e: DragEvent) => {
		e.preventDefault();
		if (!e.dataTransfer) return;

		const { items } = e.dataTransfer;
		if (1 < items.length || items[0].kind !== "file")
			throw Error("Only a single file upload is supported.");

		const file = await items[0].getAsFileSystemHandle();
		if (file) params.file.setFile(file as FileSystemFileHandle);
	};

	useEffect(() => {
		const { current } = dropRef;
		if (!current) throw Error("Drop ref is null");
		current.addEventListener("dragover", handleDragOver);
		current.addEventListener("drop", handleDrop);
		return () => {
			current.removeEventListener("dragover", handleDragOver);
			current.removeEventListener("drop", handleDrop);
		};
	}, [dropRef]);

	return dropRef;
};
