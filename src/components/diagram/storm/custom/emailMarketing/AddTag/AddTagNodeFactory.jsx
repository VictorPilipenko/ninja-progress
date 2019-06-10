import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { AddTagNodeWidget } from "./AddTagNodeWidget";
import { AddTagNodeModel } from "./AddTagNodeModel";

export class AddTagNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("AddTag");
	}

	generateReactWidget(diagramEngine, node) {
		return <AddTagNodeWidget node={node} />;
	}

	getNewInstance() {
		return new AddTagNodeModel();
	}
}