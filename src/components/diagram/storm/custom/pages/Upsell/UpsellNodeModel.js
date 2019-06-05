import { NodeModel } from "storm-react-diagrams";
import { UpsellPortModel } from "./UpsellPortModel";

export class UpsellNodeModel extends NodeModel {
	constructor() {
		super("Upsell");
		this.addPort(new UpsellPortModel("top"));
		this.addPort(new UpsellPortModel("left"));
		this.addPort(new UpsellPortModel("bottom"));
		this.addPort(new UpsellPortModel("right"));
	}
}