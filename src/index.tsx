import "modern-normalize/modern-normalize.css";
import * as ReactDom from "react-dom";
import { App } from "./app/app";
import "./index.css";
import "./themes/serika-dark.css";

const container = document.getElementById("app");
if (container === null) throw Error("`#app` is null");
ReactDom.render(<App />, container);
