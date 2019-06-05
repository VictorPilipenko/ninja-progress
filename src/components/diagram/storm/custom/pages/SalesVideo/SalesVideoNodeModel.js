import { NodeModel } from "storm-react-diagrams";
import { SalesVideoPortModel } from "./SalesVideoPortModel";

export class SalesVideoNodeModel extends NodeModel {
	constructor() {
		super("SalesVideo");
		this.addPort(new SalesVideoPortModel("top"));
		this.addPort(new SalesVideoPortModel("left"));
		this.addPort(new SalesVideoPortModel("bottom"));
		this.addPort(new SalesVideoPortModel("right"));
	}
}