import { NodeModel } from "storm-react-diagrams";
import { MembersAreaPortModel } from "./MembersAreaPortModel";

export class MembersAreaNodeModel extends NodeModel {
	constructor() {
		super("MembersArea");
		this.addPort(new MembersAreaPortModel("top"));
		this.addPort(new MembersAreaPortModel("left"));
		this.addPort(new MembersAreaPortModel("bottom"));
		this.addPort(new MembersAreaPortModel("right"));
	}
}