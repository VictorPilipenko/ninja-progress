import { NodeModel } from "storm-react-diagrams";
import { AddToCartPortModel } from "./AddToCartPortModel";

export class AddToCartNodeModel extends NodeModel {
	constructor() {
		super("AddToCart");
		this.addPort(new AddToCartPortModel("top"));
		this.addPort(new AddToCartPortModel("left"));
		this.addPort(new AddToCartPortModel("bottom"));
		this.addPort(new AddToCartPortModel("right"));
	}
}