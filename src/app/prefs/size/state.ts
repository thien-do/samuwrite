import { useStorageState } from "~/src/lib/utils/state/storage";
import { SetState } from "~src/lib/utils/state/type";
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
