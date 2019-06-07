import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { PurchaseNodeWidget } from "./PurchaseNodeWidget";
import { PurchaseNodeModel } from "./PurchaseNodeModel";

export class PurchaseNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Purchase");
	}

	generateReactWidget(diagramEngine, node) {
		return <PurchaseNodeWidget node={node} />;
	}

	getNewInstance() {
		return new PurchaseNodeModel();
	}
}