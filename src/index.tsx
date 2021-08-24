import * as ReactDom from "react-dom";
import { App } from "./app/app";

const container = document.getElementById("app");
if (container === null) throw Error("container is null");
ReactDom.render(<App />, container);
