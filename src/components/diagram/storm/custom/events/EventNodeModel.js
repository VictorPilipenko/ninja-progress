import { NodeModel } from "storm-react-diagrams";
import { EventPortModel } from "./EventPortModel";

export class EventNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new EventPortModel(name, "top"));
    this.addPort(new EventPortModel(name, "left"));
    this.addPort(new EventPortModel(name, "bottom"));
    this.addPort(new EventPortModel(name, "right"));
  }
}