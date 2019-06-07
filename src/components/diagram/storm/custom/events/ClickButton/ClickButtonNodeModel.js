import { NodeModel } from "storm-react-diagrams";
import { ClickButtonPortModel } from "./ClickButtonPortModel";

export class ClickButtonNodeModel extends NodeModel {
	constructor() {
		super("ClickButton");
		this.addPort(new ClickButtonPortModel("top"));
		this.addPort(new ClickButtonPortModel("left"));
		this.addPort(new ClickButtonPortModel("bottom"));
		this.addPort(new ClickButtonPortModel("right"));
	}
}