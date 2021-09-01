import { useEffect, useRef } from "react";
import { FileState } from "~src/components/file/state";

interface Params {
	file: FileState;
}

export const useFileDrop = (params: Params): React.RefObject<HTMLDivElement> => {
	const dropRef = useRef<HTMLDivElement>(null);

	const handleDragOver = (e: DragEvent) => e.preventDefault();
	const handleDrop = async (e: DragEvent) => {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const { items } = e.dataTransfer;
		if (1 < items.length) throw Error("Only one file can be upload at a time");
		if (Array.from(items).some((item) => item.kind !== "file"))
			throw Error("Support upload single file only");
		if (items && items.length) {
			const file = await items[0].getAsFileSystemHandle();
			if (!file) return;
			try {
				params.file.setHandle(file as FileSystemFileHandle);
				params.file.setDirty(false);
			} catch (e) {
				throw Error(e);
			}
		}
	};

	useEffect(() => {
		const { current } = dropRef;
		if (!current) return;
		current.addEventListener("dragover", handleDragOver);
		current.addEventListener("drop", handleDrop);
		return () => {
			current.removeEventListener("dragover", handleDragOver);
			current.removeEventListener("drop", handleDrop);
		};
	});

	return dropRef;
}