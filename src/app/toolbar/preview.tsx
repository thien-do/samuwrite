import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~/src/lib/button/button";
import { Editor } from "~/src/app/editor/state/state";
import { MenuItem } from "~/src/lib/menu/item/interface";
import { getPreviewSplitMenu } from "~/src/app/preview/layout/split";
import { getPreviewTemplateMenu } from "~/src/app/preview/template/menu";
import { useShortcut } from "~/src/lib/shortcut/use-shortcut";
import { SHORTCUTS } from "~/src/app/toolbar/shortcuts";
import { Tooltip } from "~/src/lib/tooltip/tooltip";
import { PrefsState } from "../prefs/state";

interface Props {
  singleton: TippyProps["singleton"];
  prefs: PrefsState;
  editor: Editor;
}

const getMoreMenu = (props: Props): MenuItem[] => [
  ...getPreviewSplitMenu(props.prefs),
  ...getPreviewTemplateMenu(props.prefs),
];

const usePreviewCallbacks = (props: Props) => {
  const { editor } = props;
  const { setPreviewVisible, previewVisible, previewSplit } = props.prefs;

  const withMouse = useCallback(() => {
    setPreviewVisible((visible) => !visible);
  }, [setPreviewVisible]);

  const withKeyboard = useCallback(() => {
    setPreviewVisible(!previewVisible);
    // Focus on editor if goes back from full preview
    if (previewSplit === true) return;
    if (previewVisible === false) return;
    window.setTimeout(() => editor.focus(), 0);
  }, [previewSplit, previewVisible, setPreviewVisible, editor]);

  return { withMouse, withKeyboard };
};

export const ToolbarPreview = (props: Props): JSX.Element => {
  const callbacks = usePreviewCallbacks(props);

  useShortcut({ keys: SHORTCUTS.preview, callback: callbacks.withKeyboard });

  return (
    <Tooltip content="Toggle Preview" singleton={props.singleton}>
      <Button
        onClick={callbacks.withMouse}
        Icon={VscBook}
        shortcut={SHORTCUTS.preview}
        more={getMoreMenu(props)}
        selected={props.prefs.previewVisible}
      />
    </Tooltip>
  );
};
