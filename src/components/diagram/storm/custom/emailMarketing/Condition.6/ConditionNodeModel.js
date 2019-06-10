import { NodeModel } from "storm-react-diagrams";
import { ConditionPortModel } from "./ConditionPortModel";

export class ConditionNodeModel extends NodeModel {
	constructor() {
		super("Condition");
		this.addPort(new ConditionPortModel("top"));
		this.addPort(new ConditionPortModel("left"));
		this.addPort(new ConditionPortModel("bottom"));
		this.addPort(new ConditionPortModel("right"));
	}
}