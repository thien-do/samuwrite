import { Dispatch, SetStateAction, useState } from "react";

export interface PrefsVisibleState {
	prefsVisible: boolean;
	setPrefsVisible: Dispatch<SetStateAction<boolean>>;
}

// Usually the visibility of a panel should be a local state. However, this is
// a special case as we need to:
// - Programatically control this state in other places (e.g. shortcut)
// - Depend on this state in other places (e.g. toolbar width)
// Therefore it's intentionally set in user's preferences.
export const usePrefsVisibleState = (): PrefsVisibleState => {
	// Just "useState" and not "useStorageState" like other prefs as we don't
	// need this to persist
	const [prefsVisible, setPrefsVisible] = useState<boolean>(false);
	return { prefsVisible, setPrefsVisible };
};
