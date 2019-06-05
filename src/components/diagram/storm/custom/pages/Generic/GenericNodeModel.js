import { NodeModel } from "storm-react-diagrams";
import { GenericPortModel } from "./GenericPortModel";

export class GenericNodeModel extends NodeModel {
	constructor() {
		super("Generic");
		this.addPort(new GenericPortModel("top"));
		this.addPort(new GenericPortModel("left"));
		this.addPort(new GenericPortModel("bottom"));
		this.addPort(new GenericPortModel("right"));
	}
}