import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { SalesPageNodeWidget } from "./SalesPageNodeWidget";
import { SalesPageNodeModel } from "./SalesPageNodeModel";

export class SalesPageNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("SalesPage");
	}

	generateReactWidget(diagramEngine, node) {
		return <SalesPageNodeWidget node={node} />;
	}

	getNewInstance() {
		return new SalesPageNodeModel();
	}
}