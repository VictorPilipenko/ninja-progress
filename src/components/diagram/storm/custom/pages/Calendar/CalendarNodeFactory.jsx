import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { CalendarNodeWidget } from "./CalendarNodeWidget";
import { CalendarNodeModel } from "./CalendarNodeModel";

export class CalendarNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("Calendar");
	}

	generateReactWidget(diagramEngine, node) {
		return <CalendarNodeWidget node={node} />;
	}

	getNewInstance() {
		return new CalendarNodeModel();
	}
}