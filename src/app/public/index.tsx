import * as ReactDom from "react-dom";
import { App } from "../app/app";
import "./style/style.ts";

const container = document.getElementById("app");
if (container === null) throw Error("`#app` is null");
ReactDom.render(<App />, container);
