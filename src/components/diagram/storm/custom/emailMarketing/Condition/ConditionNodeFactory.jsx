import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { ConditionNodeWidget } from "./ConditionNodeWidget";
import { ConditionNodeModel } from "./ConditionNodeModel";

export class ConditionNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Condition");
	}

	generateReactWidget(diagramEngine, node) {
		return <ConditionNodeWidget node={node} />;
	}

	getNewInstance() {
		return new ConditionNodeModel();
	}
}