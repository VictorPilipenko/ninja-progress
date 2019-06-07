import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { PopUpBoxNodeWidget } from "./PopUpBoxNodeWidget";
import { PopUpBoxNodeModel } from "./PopUpBoxNodeModel";

export class PopUpBoxNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("PopUpBox");
	}

	generateReactWidget(diagramEngine, node) {
		return <PopUpBoxNodeWidget node={node} />;
	}

	getNewInstance() {
		return new PopUpBoxNodeModel();
	}
}