import { useSingleton } from "@tippyjs/react";
import { PrefsState } from "~/src/prefs/state";
import { TooltipSource } from "~/src/tooltip/tooltip";
import { ThemeOption } from "../option/option";
import { THEME_NAMES } from "../theme";
import s from "./pref.module.css";

interface Props {
  prefs: PrefsState;
}

/**
 * The area to set theme in prefs panel
 */
export const ThemePref = (props: Props): JSX.Element => {
  const [source, target] = useSingleton();
  return (
    <div className={s.container}>
      <TooltipSource singleton={source} />
      {THEME_NAMES.map((name) => (
        <div key={name}>
          <ThemeOption singleton={target} name={name} prefs={props.prefs} />
        </div>
      ))}
    </div>
  );
};
