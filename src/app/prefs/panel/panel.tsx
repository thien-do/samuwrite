import { RefObject } from "react";
import { MenuHeading } from "~/src/lib/menu/heading/heading";
import { ThemePref } from "../../theme/pref/pref";
import { PrefsState } from "../state";
import s from "./panel.module.css";
import { SizePref } from "./size/size";

interface Props {
  prefs: PrefsState;
  focusRef: RefObject<HTMLDivElement>;
}

// @TODO: Should pass the focus to a real focusable element?
const FocusAnchor = (props: Props): JSX.Element => (
  <div
    tabIndex={0}
    ref={props.focusRef}
    aria-label="Dummy focus anchor. Press tab to navigate."
  />
);

export const PrefsPanel = (props: Props): JSX.Element => (
  <div className={s.container}>
    <div>
      <FocusAnchor {...props} />
      <MenuHeading heading={{ text: "Editor size" }} />
    </div>
    <SizePref prefs={props.prefs} />
    <MenuHeading heading={{ text: "Theme" }} />
    <ThemePref prefs={props.prefs} />
  </div>
);
