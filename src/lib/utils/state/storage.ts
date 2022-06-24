import { useEffect, useState } from "react";
import { SetState } from "./type";

interface Params<T> {
  storageKey: string;
  defaultValue: T;
}

export const useStorageState = <T>(params: Params<T>): [T, SetState<T>] => {
  const { storageKey, defaultValue } = params;

  const [value, setValue] = useState<T>((): T => {
    if (typeof window === "undefined") return defaultValue;
    const stored = window.localStorage.getItem(storageKey);
    if (stored === null) return defaultValue;
    return JSON.parse(stored) as T;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
