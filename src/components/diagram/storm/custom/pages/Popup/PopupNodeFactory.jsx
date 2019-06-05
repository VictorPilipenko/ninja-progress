import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { PopupNodeWidget } from "./PopupNodeWidget";
import { PopupNodeModel } from "./PopupNodeModel";

export class PopupNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Popup");
	}

	generateReactWidget(diagramEngine, node) {
		return <PopupNodeWidget node={node} />;
	}

	getNewInstance() {
		return new PopupNodeModel();
	}
}