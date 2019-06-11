import { NodeModel, DefaultNodeModel } from "storm-react-diagrams";
import { TrafficPortModel } from "./TrafficPortModel";

export class TrafficNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new TrafficPortModel(name, "top"));
    this.addPort(new TrafficPortModel(name, "left"));
    this.addPort(new TrafficPortModel(name, "bottom"));
    this.addPort(new TrafficPortModel(name, "right"));
    
  }
}