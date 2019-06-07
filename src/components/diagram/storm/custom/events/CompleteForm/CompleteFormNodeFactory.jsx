import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { CompleteFormNodeWidget } from "./CompleteFormNodeWidget";
import { CompleteFormNodeModel } from "./CompleteFormNodeModel";

export class CompleteFormNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("CompleteForm");
	}

	generateReactWidget(diagramEngine, node) {
		return <CompleteFormNodeWidget node={node} />;
	}

	getNewInstance() {
		return new CompleteFormNodeModel();
	}
}