import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { OptInNodeWidget } from "./OptInNodeWidget";
import { OptInNodeModel } from "./OptInNodeModel";

export class OptInNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("OptIn");
	}

	generateReactWidget(diagramEngine, node) {
		return <OptInNodeWidget node={node} />;
	}

	getNewInstance() {
		return new OptInNodeModel();
	}
}