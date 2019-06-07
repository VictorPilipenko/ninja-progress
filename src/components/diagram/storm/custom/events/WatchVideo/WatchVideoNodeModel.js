import { NodeModel } from "storm-react-diagrams";
import { WatchVideoPortModel } from "./WatchVideoPortModel";

export class WatchVideoNodeModel extends NodeModel {
	constructor() {
		super("WatchVideo");
		this.addPort(new WatchVideoPortModel("top"));
		this.addPort(new WatchVideoPortModel("left"));
		this.addPort(new WatchVideoPortModel("bottom"));
		this.addPort(new WatchVideoPortModel("right"));
	}
}