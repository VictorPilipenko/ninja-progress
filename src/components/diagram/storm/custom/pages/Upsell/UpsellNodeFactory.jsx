import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { UpsellNodeWidget } from "./UpsellNodeWidget";
import { UpsellNodeModel } from "./UpsellNodeModel";

export class UpsellNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Upsell");
	}

	generateReactWidget(diagramEngine, node) {
		return <UpsellNodeWidget node={node} />;
	}

	getNewInstance() {
		return new UpsellNodeModel();
	}
}