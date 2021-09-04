import { useStorageState } from "~src/utils/state/storage";
import { SetState } from "~src/utils/state/type";
import { SizeName } from "./size";

export interface SizeState {
	size: SizeName;
	setSize: SetState<SizeName>;
}

export const usePrefsSize = (): SizeState => {
	const [size, setSize] = useStorageState<SizeName>({
		storageKey: "size",
		defaultValue: "L",
	});

	return { size, setSize };
};
