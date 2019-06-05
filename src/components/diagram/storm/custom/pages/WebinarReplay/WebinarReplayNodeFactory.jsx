import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { WebinarReplayNodeWidget } from "./WebinarReplayNodeWidget";
import { WebinarReplayNodeModel } from "./WebinarReplayNodeModel";

export class WebinarReplayNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("WebinarReplay");
	}

	generateReactWidget(diagramEngine, node) {
		return <WebinarReplayNodeWidget node={node} />;
	}

	getNewInstance() {
		return new WebinarReplayNodeModel();
	}
}