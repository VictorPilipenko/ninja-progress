import { NodeModel } from "storm-react-diagrams";
import { SalesPagePortModel } from "./SalesPagePortModel";

export class SalesPageNodeModel extends NodeModel {
	constructor() {
		super("SalesPage");
		this.addPort(new SalesPagePortModel("top"));
		this.addPort(new SalesPagePortModel("left"));
		this.addPort(new SalesPagePortModel("bottom"));
		this.addPort(new SalesPagePortModel("right"));
	}
}