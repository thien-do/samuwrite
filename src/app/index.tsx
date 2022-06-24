import { createRoot } from "react-dom/client";
import { Main } from "./main/main";
import "./style/style.ts";

const container = document.getElementById("app");
if (container === null) throw Error("`#app` is null");
const root = createRoot(container);
root.render(<Main />);
