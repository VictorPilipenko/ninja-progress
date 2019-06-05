import { NodeModel } from "storm-react-diagrams";
import { OptInPortModel } from "./OptInPortModel";

export class OptInNodeModel extends NodeModel {
	constructor() {
		super("OptIn");
		this.addPort(new OptInPortModel("top"));
		this.addPort(new OptInPortModel("left"));
		this.addPort(new OptInPortModel("bottom"));
		this.addPort(new OptInPortModel("right"));
	}
}