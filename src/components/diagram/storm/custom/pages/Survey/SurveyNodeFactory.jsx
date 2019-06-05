import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { SurveyNodeWidget } from "./SurveyNodeWidget";
import { SurveyNodeModel } from "./SurveyNodeModel";

export class SurveyNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Survey");
	}

	generateReactWidget(diagramEngine, node) {
		return <SurveyNodeWidget node={node} />;
	}

	getNewInstance() {
		return new SurveyNodeModel();
	}
}