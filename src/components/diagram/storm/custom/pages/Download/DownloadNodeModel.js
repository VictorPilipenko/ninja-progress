import { NodeModel } from "storm-react-diagrams";
import { DownloadPortModel } from "./DownloadPortModel";

export class DownloadNodeModel extends NodeModel {
	constructor() {
		super("Download");
		this.addPort(new DownloadPortModel("top"));
		this.addPort(new DownloadPortModel("left"));
		this.addPort(new DownloadPortModel("bottom"));
		this.addPort(new DownloadPortModel("right"));
	}
}