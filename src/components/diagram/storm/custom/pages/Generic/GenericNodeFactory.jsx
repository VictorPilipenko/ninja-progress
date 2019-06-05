import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { GenericNodeWidget } from "./GenericNodeWidget";
import { GenericNodeModel } from "./GenericNodeModel";

export class GenericNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Generic");
	}

	generateReactWidget(diagramEngine, node) {
		return <GenericNodeWidget node={node} />;
	}

	getNewInstance() {
		return new GenericNodeModel();
	}
}