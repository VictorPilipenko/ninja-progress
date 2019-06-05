import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { MembersAreaNodeWidget } from "./MembersAreaNodeWidget";
import { MembersAreaNodeModel } from "./MembersAreaNodeModel";

export class MembersAreaNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("MembersArea");
	}

	generateReactWidget(diagramEngine, node) {
		return <MembersAreaNodeWidget node={node} />;
	}

	getNewInstance() {
		return new MembersAreaNodeModel();
	}
}