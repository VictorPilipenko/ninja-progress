import { NodeModel } from "storm-react-diagrams";
import { BlogPostPortModel } from "./BlogPostPortModel";

export class BlogPostNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new BlogPostPortModel(name, "top"));
    this.addPort(new BlogPostPortModel(name, "left"));
    this.addPort(new BlogPostPortModel(name, "bottom"));
    this.addPort(new BlogPostPortModel(name, "right"));
  }
}