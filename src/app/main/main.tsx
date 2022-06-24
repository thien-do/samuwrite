import { useEditor } from "../editor/state/state";
import { Layout } from "../layout/layout";
import { usePrefs } from "../prefs/state";
import { ThemeInject } from "../theme/inject";
import { useToolbarAutohide } from "../toolbar/autohide";
import { Toolbar } from "../toolbar/toolbar";
import s from "./main.module.css";

export const Main = (): JSX.Element => {
  const editor = useEditor();
  const prefs = usePrefs();
  const toolbar = useToolbarAutohide({ editor });

  return (
    <div className={s.app}>
      <ThemeInject theme={prefs.theme} />
      {/* It is actually ok to render Toolbar when editor is null (not
				initialized). However, most actions in Toolbar depends on the
				editor so it's simpler to just check for null here once */}
      {editor.value !== null && (
        <div
          className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
          {...toolbar.handlers}
        >
          <Toolbar show={toolbar.show} editor={editor.value} prefs={prefs} />
        </div>
      )}
      <div className={s.body}>
        <Layout editor={editor} prefs={prefs} />
      </div>
    </div>
  );
};
