import * as React from "react";
import * as SRD from "@projectstorm/react-diagrams";

export class NodeFactory extends SRD.AbstractNodeFactory {

  constructor(name, reactWidget, nodeModel, svg) {
    super(name);
    this.name = name;
    this.reactWidget = reactWidget;
    this.nodeModel = nodeModel;
    this.svg = svg
  }

  generateReactWidget(diagramEngine, node) {
    return <this.reactWidget
      node={node}
      svg={this.svg}
      engine={diagramEngine}
    />
  }

  getNewInstance() {
    return new this.nodeModel();
  }
}