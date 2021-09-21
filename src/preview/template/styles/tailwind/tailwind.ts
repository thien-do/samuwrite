/*
This is a modified version of Tailwind Typography. Source:
- https://unpkg.com/tailwindcss@2.2.15/dist/base.css
- https://unpkg.com/@tailwindcss/typography@0.4.1/dist/typography.css
*/

// "base" must comes before "typography"
import base from "./base.module.css";
import typography from "./typography.module.css";

export default {
	container: `${base.container} ${typography.container}`,
};
