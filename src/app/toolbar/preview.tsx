import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~/src/button/button";
import { Editor } from "~/src/editor/state/state";
import { MenuItem } from "~/src/menu/item/interface";
import { getPreviewSplitMenu } from "~/src/preview/layout/split";
import { getPreviewTemplateMenu } from "~/src/preview/template/menu";
import { useShortcut } from "~/src/shortcut/use-shortcut";
import { SHORTCUTS } from "~/src/toolbar/shortcuts";
import { Tooltip } from "~/src/tooltip/tooltip";
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
