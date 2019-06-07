import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { GenericEventNodeWidget } from "./GenericEventNodeWidget";
import { GenericEventNodeModel } from "./GenericEventNodeModel";

export class GenericEventNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("GenericEvent");
	}

	generateReactWidget(diagramEngine, node) {
		return <GenericEventNodeWidget node={node} />;
	}

	getNewInstance() {
		return new GenericEventNodeModel();
	}
}