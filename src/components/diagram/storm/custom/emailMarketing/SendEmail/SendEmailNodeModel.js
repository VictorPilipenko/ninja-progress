import { NodeModel } from "storm-react-diagrams";
import { SendEmailPortModel } from "./SendEmailPortModel";

export class SendEmailNodeModel extends NodeModel {
	constructor() {
		super("SendEmail");
		this.addPort(new SendEmailPortModel("top"));
		this.addPort(new SendEmailPortModel("left"));
		this.addPort(new SendEmailPortModel("bottom"));
		this.addPort(new SendEmailPortModel("right"));
	}
}