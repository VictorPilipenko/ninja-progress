import {
  DiagramEngine,
  DiagramModel,
} from "storm-react-diagrams";

// import the custom models
import { DiamondNodeModel } from "./custom/DiamondNodeModel";
import { DiamondNodeFactory } from "./custom/DiamondNodeFactory";
import { SimplePortFactory } from "./custom/SimplePortFactory";
import { DiamondPortModel } from "./custom/DiamondPortModel";

// import { connect } from 'react-redux'
// import { saveDiagram } from '../../../store/actions/projects'
// import { getDiagram } from '../../../store/actions/projects'

// import { parse } from 'flatted/esm';


export default class Application {

  constructor(props) {
    
    console.log(props)

    this.engine = new DiagramEngine();
    this.engine.installDefaultFactories();

    this.newModel(props);
  }

  newModel(props) {

    this.activeModel = new DiagramModel();


    // register some other factories as well
    this.engine.registerPortFactory(new SimplePortFactory("diamond", config => new DiamondPortModel()));
    this.engine.registerNodeFactory(new DiamondNodeFactory());

    //2) setup the diagram model
    // var model = new DiagramModel();

    //3-A) create a default node
    var node1 = new DiamondNodeModel();
    node1.setPosition(390, 120);

    //3-B) create our new custom node
    var node2 = new DiamondNodeModel();
    node2.setPosition(650, 158);

    var node3 = new DiamondNodeModel();
    node3.setPosition(500, 350);

    //4) add the models to the root graph
    this.activeModel.addAll(node1, node2, node3);

    //5) load model into engine
    // this.engine.setDiagramModel(this.activeModel);

    console.log(this.activeModel)
    console.log(props)

    this.engine.setDiagramModel(props ? props : this.activeModel);
  }

  getDiagramEngine() {
    return this.engine;
  }

  getActiveDiagram() {
    return this.activeModel;
  }
}



