import { NodeModel } from "storm-react-diagrams";
import { ScrollPortModel } from "./ScrollPortModel";

export class ScrollNodeModel extends NodeModel {
	constructor() {
		super("Scroll");
		this.addPort(new ScrollPortModel("top"));
		this.addPort(new ScrollPortModel("left"));
		this.addPort(new ScrollPortModel("bottom"));
		this.addPort(new ScrollPortModel("right"));
	}
}