import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { ThankYouNodeWidget } from "./ThankYouNodeWidget";
import { ThankYouNodeModel } from "./ThankYouNodeModel";

export class ThankYouNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("ThankYou");
	}

	generateReactWidget(diagramEngine, node) {
		return <ThankYouNodeWidget node={node} />;
	}

	getNewInstance() {
		return new ThankYouNodeModel();
	}
}