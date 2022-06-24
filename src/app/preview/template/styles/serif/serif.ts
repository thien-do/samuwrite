/*
This markdown styling is a mix between Typora's Academic theme and iA Writer's
Palatino template. Source:
- https://theme.typora.io/theme/Academic/
- https://ia.net/downloads#templates
*/

// "core" must comes before "style"
import core from "./core.module.css";
import style from "./style.module.css";

export default {
	container: `${style.container} ${core.container}`,
};
