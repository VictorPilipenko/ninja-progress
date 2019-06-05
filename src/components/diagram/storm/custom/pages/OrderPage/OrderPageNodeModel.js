import { NodeModel } from "storm-react-diagrams";
import { OrderPagePortModel } from "./OrderPagePortModel";

export class OrderPageNodeModel extends NodeModel {
	constructor() {
		super("OrderPage");
		this.addPort(new OrderPagePortModel("top"));
		this.addPort(new OrderPagePortModel("left"));
		this.addPort(new OrderPagePortModel("bottom"));
		this.addPort(new OrderPagePortModel("right"));
	}
}