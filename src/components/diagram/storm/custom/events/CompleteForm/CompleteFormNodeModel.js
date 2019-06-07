import { NodeModel } from "storm-react-diagrams";
import { CompleteFormPortModel } from "./CompleteFormPortModel";

export class CompleteFormNodeModel extends NodeModel {
	constructor() {
		super("CompleteForm");
		this.addPort(new CompleteFormPortModel("top"));
		this.addPort(new CompleteFormPortModel("left"));
		this.addPort(new CompleteFormPortModel("bottom"));
		this.addPort(new CompleteFormPortModel("right"));
	}
}