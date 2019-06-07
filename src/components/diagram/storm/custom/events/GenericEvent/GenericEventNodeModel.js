import { NodeModel } from "storm-react-diagrams";
import { GenericEventPortModel } from "./GenericEventPortModel";

export class GenericEventNodeModel extends NodeModel {
	constructor() {
		super("GenericEvent");
		this.addPort(new GenericEventPortModel("top"));
		this.addPort(new GenericEventPortModel("left"));
		this.addPort(new GenericEventPortModel("bottom"));
		this.addPort(new GenericEventPortModel("right"));
	}
}