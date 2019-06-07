import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { ScrollNodeWidget } from "./ScrollNodeWidget";
import { ScrollNodeModel } from "./ScrollNodeModel";

export class ScrollNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Scroll");
	}

	generateReactWidget(diagramEngine, node) {
		return <ScrollNodeWidget node={node} />;
	}

	getNewInstance() {
		return new ScrollNodeModel();
	}
}