import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscSave } from "react-icons/vsc";
import { appSaveFile } from "~src/app/utils/save";
import { Button } from "~src/button/button";
import { FileState } from "~src/file/state";
import { MenuItem } from "~src/menu/item/interface";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { vote } from "~src/utils/vote";
import { Editor } from "../editor/state/state";

interface Props {
	file: FileState;
	editor: Editor;
	singleton: TippyProps["singleton"];
}

/**
 * Memoized our callbacks so they can be used safely in effects
 */
const useCallbacks = (props: Props) => {
	const editor = props.editor;
	const fileModel = props.file.model;
	const setFileModel = props.file.setModel;
	const setFileDirty = props.file.setDirty;

	const callbacks = useMemo(() => {
		const params = { fileModel, setFileDirty, setFileModel, editor };
		const save = async () => {
			appSaveFile({ ...params, saveAs: false });
		};
		const saveAs = async () => {
			appSaveFile({ ...params, saveAs: true });
		};
		const print = () => {
			vote(86);
		};
		return { save, saveAs, print };
	}, [editor, fileModel, setFileModel, setFileDirty]);

	return callbacks;
};

export const ToolbarSave = (props: Props): JSX.Element => {
	const callbacks = useCallbacks(props);

	useShortcut({ keys: SHORTCUTS.save, callback: callbacks.save });
	useShortcut({ keys: SHORTCUTS.saveAs, callback: callbacks.saveAs });
	useShortcut({ keys: SHORTCUTS.print, callback: callbacks.print });

	const menu: MenuItem[] = [
		{
			type: "action",
			action: callbacks.print,
			label: "Print…",
			shortcut: SHORTCUTS.print,
		},
		{
			type: "action",
			action: callbacks.saveAs,
			label: "Save as…",
			shortcut: SHORTCUTS.saveAs,
		},
	];

	return (
		<Tooltip content="Save" singleton={props.singleton}>
			<Button
				onClick={callbacks.save}
				Icon={VscSave}
				shortcut={SHORTCUTS.save}
				more={menu}
			/>
		</Tooltip>
	);
};
