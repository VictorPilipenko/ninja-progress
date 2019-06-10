import { NodeModel } from "storm-react-diagrams";
import { CustomActionPortModel } from "./CustomActionPortModel";

export class CustomActionNodeModel extends NodeModel {
	constructor() {
		super("CustomAction");
		this.addPort(new CustomActionPortModel("top"));
		this.addPort(new CustomActionPortModel("left"));
		this.addPort(new CustomActionPortModel("bottom"));
		this.addPort(new CustomActionPortModel("right"));
	}
}