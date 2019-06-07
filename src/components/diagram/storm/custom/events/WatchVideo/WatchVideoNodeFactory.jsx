import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { WatchVideoNodeWidget } from "./WatchVideoNodeWidget";
import { WatchVideoNodeModel } from "./WatchVideoNodeModel";

export class WatchVideoNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("WatchVideo");
	}

	generateReactWidget(diagramEngine, node) {
		return <WatchVideoNodeWidget node={node} />;
	}

	getNewInstance() {
		return new WatchVideoNodeModel();
	}
}