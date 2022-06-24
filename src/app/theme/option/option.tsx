import { TippyProps } from "@tippyjs/react";
import { PrefsState } from "~/src/prefs/state";
import { Tooltip } from "~/src/tooltip/tooltip";
import { ThemeName, THEME_DETAILS } from "../theme";
import s from "./option.module.css";

interface Props {
  name: ThemeName;
  prefs: PrefsState;
  singleton: TippyProps["singleton"];
}

export const ThemeOption = (props: Props): JSX.Element => {
  const detail = THEME_DETAILS[props.name];
  const colors = detail.colors;
  return (
    <Tooltip content={detail.name} singleton={props.singleton}>
      <button
        className={[
          s.container,
          props.name === props.prefs.theme ? s.selected : "",
        ].join(" ")}
        onClick={() => props.prefs.setTheme(props.name)}
        style={{ background: colors.bg.hex() }}
      >
        <span className={s.text} style={{ color: colors.text.hex() }}>
          Aa
        </span>
        <span className={s.caret} style={{ background: colors.caret.hex() }} />
      </button>
    </Tooltip>
  );
};
