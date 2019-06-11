import { NodeModel } from "storm-react-diagrams";
import { EmailMarketingPortModel } from "./EmailMarketingPortModel";

export class EmailMarketingNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new EmailMarketingPortModel(name, "top"));
    this.addPort(new EmailMarketingPortModel(name, "left"));
    this.addPort(new EmailMarketingPortModel(name, "bottom"));
    this.addPort(new EmailMarketingPortModel(name, "right"));
  }
}