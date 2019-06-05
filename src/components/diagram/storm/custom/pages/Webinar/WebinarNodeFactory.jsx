import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { WebinarNodeWidget } from "./WebinarNodeWidget";
import { WebinarNodeModel } from "./WebinarNodeModel";

export class WebinarNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Webinar");
	}

	generateReactWidget(diagramEngine, node) {
		return <WebinarNodeWidget node={node} />;
	}

	getNewInstance() {
		return new WebinarNodeModel();
	}
}