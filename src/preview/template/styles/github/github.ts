/*
This markdown styling comes from GitHub's design system and is modified to
suit our needs. Source:
- https://github.com/primer/css/tree/main/src/markdown
- https://unpkg.com/@primer/css@17.11.0/dist/markdown.css
- https://unpkg.com/@primer/css@17.11.0/dist/base.css
*/

// "base" must comes before "markdown"
import base from "./base.module.css";
import markdown from "./markdown.module.css";

export default {
	container: `${base.container} ${markdown.container}`,
};
