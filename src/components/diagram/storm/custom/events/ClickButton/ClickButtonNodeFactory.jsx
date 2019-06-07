import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { ClickButtonNodeWidget } from "./ClickButtonNodeWidget";
import { ClickButtonNodeModel } from "./ClickButtonNodeModel";

export class ClickButtonNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("ClickButton");
	}

	generateReactWidget(diagramEngine, node) {
		return <ClickButtonNodeWidget node={node} />;
	}

	getNewInstance() {
		return new ClickButtonNodeModel();
	}
}