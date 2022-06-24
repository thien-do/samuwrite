import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscSave } from "react-icons/vsc";
import { Button } from "~/src/button/button";
import { MenuItem } from "~/src/menu/item/interface";
import { useShortcut } from "~/src/shortcut/use-shortcut";
import { SHORTCUTS } from "~/src/toolbar/shortcuts";
import { Tooltip } from "~/src/tooltip/tooltip";
import { vote } from "~/src/utils/vote";
import { Editor } from "../editor/state/state";

interface Props {
  editor: Editor;
  singleton: TippyProps["singleton"];
}

/**
 * Memoized our callbacks so they can be used safely in effects
 */
const useCallbacks = (props: Props) => {
  const callbacks = useMemo(() => {
    const save = async () => {
      window.alert("todo save");
    };
    const saveAs = async () => {
      window.alert("todo save as");
    };
    const print = () => {
      vote(86);
    };
    return { save, saveAs, print };
  }, []);

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
