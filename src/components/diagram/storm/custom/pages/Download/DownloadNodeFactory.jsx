import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { DownloadNodeWidget } from "./DownloadNodeWidget";
import { DownloadNodeModel } from "./DownloadNodeModel";

export class DownloadNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Download");
	}

	generateReactWidget(diagramEngine, node) {
		return <DownloadNodeWidget node={node} />;
	}

	getNewInstance() {
		return new DownloadNodeModel();
	}
}