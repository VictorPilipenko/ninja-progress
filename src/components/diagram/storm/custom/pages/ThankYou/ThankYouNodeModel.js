import { NodeModel } from "storm-react-diagrams";
import { ThankYouPortModel } from "./ThankYouPortModel";

export class ThankYouNodeModel extends NodeModel {
	constructor() {
		super("ThankYou");
		this.addPort(new ThankYouPortModel("top"));
		this.addPort(new ThankYouPortModel("left"));
		this.addPort(new ThankYouPortModel("bottom"));
		this.addPort(new ThankYouPortModel("right"));
	}
}