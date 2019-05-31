import * as React from "react";

import { BodyWidget } from "./Components/BodyWidget";
import { Application } from "./Application";

import "./index.css";
import "storm-react-diagrams/dist/style.min.css";

export default () => {
	var app = new Application();

	return <BodyWidget app={app} />;
};