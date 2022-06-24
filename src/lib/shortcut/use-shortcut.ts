import { useEffect } from "react";

interface Params {
  keys: string;
  callback: () => void;
}

export const useShortcut = (params: Params): void => {
  const { keys, callback } = params;

  useEffect(() => {
    console.log("todo", keys);
  }, [keys, callback]);
};
