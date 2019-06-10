import { NodeModel } from "storm-react-diagrams";
import { AddTagPortModel } from "./AddTagPortModel";

export class AddTagNodeModel extends NodeModel {
	constructor() {
		super("AddTag");
		this.addPort(new AddTagPortModel("top"));
		this.addPort(new AddTagPortModel("left"));
		this.addPort(new AddTagPortModel("bottom"));
		this.addPort(new AddTagPortModel("right"));
	}
}