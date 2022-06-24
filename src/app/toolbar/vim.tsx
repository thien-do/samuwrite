import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { DiVim } from "react-icons/di";
import { Button } from "~/src/lib/button/button";
import { PrefsState } from "~/src/app/prefs/state";
import { useShortcut } from "~/src/lib/shortcut/use-shortcut";
import { SHORTCUTS } from "~/src/app/toolbar/shortcuts";
import { Tooltip } from "~/src/lib/tooltip/tooltip";

interface Props {
  singleton: TippyProps["singleton"];
  prefs: PrefsState;
}

export const ToolbarVim = (props: Props): JSX.Element => {
  const { setVim } = props.prefs;
  const toggle = useCallback(() => setVim((v) => !v), [setVim]);

  useShortcut({ keys: SHORTCUTS.vim, callback: toggle });

  return (
    <Tooltip content="Toggle Vim mode" singleton={props.singleton}>
      <Button
        onClick={toggle}
        Icon={DiVim}
        selected={props.prefs.vim}
        shortcut={SHORTCUTS.vim}
      />
    </Tooltip>
  );
};
