import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { FileState } from "~/src/components/file/state";
import { openFile } from "~src/app/utils/open";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { ERRORS } from "~src/utils/error";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";

interface Props {
	singleton: TippyProps["singleton"];
	file: FileState;
	editor: Editor;
}

/**
 * Memoized our callbacks so they can be used safely in effects
 */
const useOpenCallbacks = (props: Props) => {
	const { editor, file } = props;
	const callbacks = useMemo(() => {
		const open = async () => {
			const [handle] = await window.showOpenFilePicker({
				multiple: false,
				types: fileSystem.optionTypes,
				excludeAcceptAllOption: false,
			});
			await openFile({ editor, file, handle });
		};
		const openNew = async () => {
			console.log("ahihi");
			await openFile({ editor, file, handle: null });
		};
		const openRecent = async () => {
			const recent = file.recent;
			if (recent === null) throw ERRORS.recentNull;
			await openFile({ editor, file, handle: recent });
		};
		return { open, openNew, openRecent };
	}, [editor, file]);
	return callbacks;
};

type Callbacks = ReturnType<typeof useOpenCallbacks>;

const getMoreMenu = (
	props: Props,
	callbacks: Callbacks
): ButtonMoreMenuItem[] => {
	const menu: ButtonMoreMenuItem[] = [];
	menu.push({
		action: callbacks.openNew,
		label: "New file",
		shortcut: SHORTCUTS.openNew,
	});
	if (props.file.recent !== null) {
		menu.push({
			action: callbacks.openRecent,
			label: `Open "${props.file.recent.name}"`,
			shortcut: SHORTCUTS.openRecent,
		});
	}
	return menu;
};

export const ToolbarOpen = (props: Props): JSX.Element => {
	const callbacks: Callbacks = useOpenCallbacks(props);

	useShortcut(SHORTCUTS.open, callbacks.open);
	useShortcut(SHORTCUTS.openNew, callbacks.openNew);
	useShortcut(SHORTCUTS.openRecent, callbacks.openRecent);

	return (
		<Button
			onClick={callbacks.open}
			Icon={VscFolder}
			shortcut={SHORTCUTS.open}
			tooltip="Open…"
			tooltipSingleton={props.singleton}
			more={getMoreMenu(props, callbacks)}
		/>
	);
};
