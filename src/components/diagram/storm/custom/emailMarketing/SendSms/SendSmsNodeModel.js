import { NodeModel } from "storm-react-diagrams";
import { SendSmsPortModel } from "./SendSmsPortModel";

export class SendSmsNodeModel extends NodeModel {
	constructor() {
		super("SendSms");
		this.addPort(new SendSmsPortModel("top"));
		this.addPort(new SendSmsPortModel("left"));
		this.addPort(new SendSmsPortModel("bottom"));
		this.addPort(new SendSmsPortModel("right"));
	}
}