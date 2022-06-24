import { useStorageState } from "~/src/lib/utils/state/storage";
import { SetState } from "~/src/lib/utils/state/type";

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
