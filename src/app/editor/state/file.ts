import { useEffect } from "react";
import { EditorState } from "~/src/editor/state/state";

interface Params {
  editor: EditorState;
}

export const useEditorFile = (params: Params): void => {
  const editor = params.editor.value;

  // Mark file as dirty when content changed
  useEffect(() => {
    if (editor === null) return;
    const disposable = editor.onDidChangeModelContent(() => {
      // @TODO
      disposable.dispose(); // No need to listen anymore
    });
    return () => void disposable.dispose();
  }, [editor]);
};
