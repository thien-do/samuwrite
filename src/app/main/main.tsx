// import { useEditor } from "~/src/editor/state/state";
// import { Layout } from "~/src/layout/layout";
// import { Toolbar } from "~/src/toolbar/toolbar";
import { usePrefs } from "~/src/app/prefs/state";
// import { ThemeInject } from "~/src/theme/inject";
import s from "./main.module.css";
// import { useToolbarAutohide } from "./toolbar/autohide";

export const Main = (): JSX.Element => {
  // const editor = useEditor();
  // const prefs = usePrefs();
  // const toolbar = useToolbarAutohide({ editor });

  return (
    <div className={s.app}>
      {/* <ThemeInject theme={prefs.theme} /> */}
      {/* It is actually ok to render Toolbar when editor is null (not
				initialized). However, most actions in Toolbar depends on the
				editor so it's simpler to just check for null here once */}
      {/* {editor.value !== null && (
        <div
          className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
          {...toolbar.handlers}
        >
          <Toolbar show={toolbar.show} editor={editor.value} prefs={prefs} />
        </div>
      )} */}
      <div className={s.body}>
        {/* <Layout editor={editor} prefs={prefs} /> */}
      </div>
    </div>
  );
};
