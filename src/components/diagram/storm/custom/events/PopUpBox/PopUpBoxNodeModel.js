import { NodeModel } from "storm-react-diagrams";
import { PopUpBoxPortModel } from "./PopUpBoxPortModel";

export class PopUpBoxNodeModel extends NodeModel {
	constructor() {
		super("PopUpBox");
		this.addPort(new PopUpBoxPortModel("top"));
		this.addPort(new PopUpBoxPortModel("left"));
		this.addPort(new PopUpBoxPortModel("bottom"));
		this.addPort(new PopUpBoxPortModel("right"));
	}
}