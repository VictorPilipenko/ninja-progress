import { NodeModel } from "storm-react-diagrams";
import { PurchasePortModel } from "./PurchasePortModel";

export class PurchaseNodeModel extends NodeModel {
	constructor() {
		super("Purchase");
		this.addPort(new PurchasePortModel("top"));
		this.addPort(new PurchasePortModel("left"));
		this.addPort(new PurchasePortModel("bottom"));
		this.addPort(new PurchasePortModel("right"));
	}
}