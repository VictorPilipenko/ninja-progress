import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { OrderPageNodeWidget } from "./OrderPageNodeWidget";
import { OrderPageNodeModel } from "./OrderPageNodeModel";

export class OrderPageNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("OrderPage");
	}

	generateReactWidget(diagramEngine, node) {
		return <OrderPageNodeWidget node={node} />;
	}

	getNewInstance() {
		return new OrderPageNodeModel();
	}
}