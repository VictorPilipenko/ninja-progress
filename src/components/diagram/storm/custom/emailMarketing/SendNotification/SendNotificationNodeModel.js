import { NodeModel } from "storm-react-diagrams";
import { SendNotificationPortModel } from "./SendNotificationPortModel";

export class SendNotificationNodeModel extends NodeModel {
	constructor() {
		super("SendNotification");
		this.addPort(new SendNotificationPortModel("top"));
		this.addPort(new SendNotificationPortModel("left"));
		this.addPort(new SendNotificationPortModel("bottom"));
		this.addPort(new SendNotificationPortModel("right"));
	}
}