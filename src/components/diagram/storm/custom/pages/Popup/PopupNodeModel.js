import { NodeModel } from "storm-react-diagrams";
import { PopupPortModel } from "./PopupPortModel";

export class PopupNodeModel extends NodeModel {
	constructor() {
		super("Popup");
		this.addPort(new PopupPortModel("top"));
		this.addPort(new PopupPortModel("left"));
		this.addPort(new PopupPortModel("bottom"));
		this.addPort(new PopupPortModel("right"));
	}
}