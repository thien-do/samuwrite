import { useStorageState } from "~src/utils/state/storage";
import { SetState } from "~src/utils/state/type";

export interface VimState {
	vim: boolean;
	setVim: SetState<boolean>;
}

export const usePrefsVim = (): VimState => {
	const [vim, setVim] = useStorageState({
		storageKey: "vim",
		defaultValue: false,
	});
	return { vim, setVim };
};
