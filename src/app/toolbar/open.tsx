import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~/src/lib/button/button";
import { MenuItem } from "~/src/lib/menu/item/interface";
import { useShortcut } from "~/src/lib/shortcut/use-shortcut";
import { SHORTCUTS } from "~/src/app/toolbar/shortcuts";
import { Tooltip } from "~/src/lib/tooltip/tooltip";
import { vote } from "~/src/lib/utils/vote";
import { Editor } from "../editor/state/state";

interface Props {
  singleton: TippyProps["singleton"];
  editor: Editor;
}

/**
 * Memoized our callbacks so they can be used safely in effects
 */
const useOpenCallbacks = () => {
  const callbacks = useMemo(() => {
    const open = async () => {
      window.alert("todo open");
    };

    const openNew = async () => {
      window.alert("todo open new");
    };

    const openRecent = async () => {
      window.alert("todo open recent");
    };

    return { open, openNew, openRecent };
  }, []);

  return callbacks;
};

type Callbacks = ReturnType<typeof useOpenCallbacks>;

const getMoreMenu = (props: Props, callbacks: Callbacks): MenuItem[] => {
  const menu: MenuItem[] = [];
  menu.push({
    type: "action",
    action: callbacks.openNew,
    label: "New file",
    shortcut: SHORTCUTS.openNew,
  });
  menu.push({
    type: "action",
    action: callbacks.openRecent,
    label: `Open recent`,
    shortcut: SHORTCUTS.openRecent,
  });
  menu.push(
    { type: "divider" },
    { type: "action", action: () => vote(84), label: "Connect to GitHub…" },
    { type: "action", action: () => vote(85), label: "Connect to Dropbox…" }
  );
  return menu;
};

export const ToolbarOpen = (props: Props): JSX.Element => {
  const callbacks: Callbacks = useOpenCallbacks();

  useShortcut({ keys: SHORTCUTS.open, callback: callbacks.open });
  useShortcut({ keys: SHORTCUTS.openNew, callback: callbacks.openNew });
  useShortcut({ keys: SHORTCUTS.openRecent, callback: callbacks.openRecent });

  return (
    <Tooltip content="Open…" singleton={props.singleton}>
      <Button
        onClick={callbacks.open}
        Icon={VscFolder}
        shortcut={SHORTCUTS.open}
        more={getMoreMenu(props, callbacks)}
      />
    </Tooltip>
  );
};
