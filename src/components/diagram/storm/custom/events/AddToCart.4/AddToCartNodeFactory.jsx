import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { AddToCartNodeWidget } from "./AddToCartNodeWidget";
import { AddToCartNodeModel } from "./AddToCartNodeModel";

export class AddToCartNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("AddToCart");
	}

	generateReactWidget(diagramEngine, node) {
		return <AddToCartNodeWidget node={node} />;
	}

	getNewInstance() {
		return new AddToCartNodeModel();
	}
}