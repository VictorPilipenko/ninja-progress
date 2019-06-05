import { NodeModel } from "storm-react-diagrams";
import { CalendarPortModel } from "./CalendarPortModel";

export class CalendarNodeModel extends NodeModel {
	constructor() {
		super("Calendar");
		this.addPort(new CalendarPortModel("top"));
		this.addPort(new CalendarPortModel("left"));
		this.addPort(new CalendarPortModel("bottom"));
		this.addPort(new CalendarPortModel("right"));
	}
}