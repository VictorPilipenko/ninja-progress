import { NodeModel } from "storm-react-diagrams";
import { RemoveTagPortModel } from "./RemoveTagPortModel";

export class RemoveTagNodeModel extends NodeModel {
	constructor() {
		super("RemoveTag");
		this.addPort(new RemoveTagPortModel("top"));
		this.addPort(new RemoveTagPortModel("left"));
		this.addPort(new RemoveTagPortModel("bottom"));
		this.addPort(new RemoveTagPortModel("right"));
	}
}