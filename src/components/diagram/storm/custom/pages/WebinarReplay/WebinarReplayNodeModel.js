import { NodeModel } from "storm-react-diagrams";
import { WebinarReplayPortModel } from "./WebinarReplayPortModel";

export class WebinarReplayNodeModel extends NodeModel {
	constructor() {
		super("WebinarReplay");
		this.addPort(new WebinarReplayPortModel("top"));
		this.addPort(new WebinarReplayPortModel("left"));
		this.addPort(new WebinarReplayPortModel("bottom"));
		this.addPort(new WebinarReplayPortModel("right"));
	}
}