import { NodeModel } from "storm-react-diagrams";
import { PagePortModel } from "./PagePortModel";

export class PageNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new PagePortModel(name, "top"));
    this.addPort(new PagePortModel(name, "left"));
    this.addPort(new PagePortModel(name, "bottom"));
    this.addPort(new PagePortModel(name, "right"));
    this.extras.name = name;
    this.extras.setName = this.setName;
  }

  setName(name) {
    console.log(name)
    this.extras.name = name;
  }
}