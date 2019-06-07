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


// export class NodeFactory extends SRD.AbstractNodeFactory {

// 	constructor(name, reactWidget, model ) {
// 		super(name);
//     this.generateReactWidget = reactWidget;
//     this.model = model;
// 	}

//   generateReactWidget(node) {
// 		return <reactWidget node={node} />;
// 	}

// 	getNewInstance() {
// 		return new this.model();
// 	}
// }