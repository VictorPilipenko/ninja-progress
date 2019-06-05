import { NodeModel } from "storm-react-diagrams";
import { WebinarPortModel } from "./WebinarPortModel";

export class WebinarNodeModel extends NodeModel {
	constructor() {
		super("Webinar");
		this.addPort(new WebinarPortModel("top"));
		this.addPort(new WebinarPortModel("left"));
		this.addPort(new WebinarPortModel("bottom"));
		this.addPort(new WebinarPortModel("right"));
	}
}