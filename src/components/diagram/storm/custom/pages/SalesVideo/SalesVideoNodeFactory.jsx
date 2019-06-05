import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { SalesVideoNodeWidget } from "./SalesVideoNodeWidget";
import { SalesVideoNodeModel } from "./SalesVideoNodeModel";

export class SalesVideoNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("SalesVideo");
	}

	generateReactWidget(diagramEngine, node) {
		return <SalesVideoNodeWidget node={node} />;
	}

	getNewInstance() {
		return new SalesVideoNodeModel();
	}
}