import * as RJD from "storm-react-diagrams";

//import custom link, port and factory
import { NodeFactory } from "./custom/NodeFactory";
import { PortFactory } from "./custom/PortFactory";
import { AdvancedLinkFactory } from "./custom/customLink";

// import the custom models
import { PagePortModel } from "./custom/pages/PagePortModel";
import { PageNodeModel } from "./custom/pages/PageNodeModel";
import PageNodeWidget from "./custom/pages/PageNodeWidget";

import { EmailMarketingPortModel } from "./custom/emailMarketing/EmailMarketingPortModel";
import { EmailMarketingNodeModel } from "./custom/emailMarketing/EmailMarketingNodeModel";
import { EmailMarketingNodeWidget } from "./custom/emailMarketing/EmailMarketingNodeWidget";

import { EventPortModel } from "./custom/events/EventPortModel";
import { EventNodeModel } from "./custom/events/EventNodeModel";
import { EventNodeWidget } from "./custom/events/EventNodeWidget";

import { TrafficPortModel } from "./custom/traffic/TrafficPortModel";
import { TrafficNodeModel } from "./custom/traffic/TrafficNodeModel";
import { TrafficNodeWidget } from "./custom/traffic/TrafficNodeWidget";

import { API_URL } from '../../../config'

export default class Application {
  constructor(props, svg) {

    this.engine = new RJD.DiagramEngine();
    this.engine.installDefaultFactories();
    this.engine.registerLinkFactory(new AdvancedLinkFactory());

    this.allElements = []

    this.elementsPages = []
    this.elementsTraffic = []
    this.elementsEmailMarketing = []
    this.elementsEvents = []

    if (svg) {

      let allPages = this.getValues(svg, 'Pages')
      let allTraffic = this.getValues(svg, 'Traffic')
      let allEmailMarketing = this.getValues(svg, 'EmailMarketing')
      let allEvents = this.getValues(svg, 'Events')

      allPages.forEach((item) => (
        this.elementsPages.push(
          {
            name: item.name,
            port: PagePortModel,
            widget: PageNodeWidget,
            nodeModel: PageNodeModel,
            svg: API_URL + item.url,
          }
        )
      ))

      allTraffic.forEach((item) => (
        this.elementsTraffic.push(
          {
            name: item.name,
            port: TrafficPortModel,
            widget: TrafficNodeWidget,
            nodeModel: TrafficNodeModel,
            svg: API_URL + item.url,
          }
        )
      ))

      allEmailMarketing.forEach((item) => (
        this.elementsEmailMarketing.push(
          {
            name: item.name,
            port: EmailMarketingPortModel,
            widget: EmailMarketingNodeWidget,
            nodeModel: EmailMarketingNodeModel,
            svg: API_URL + item.url,
          }
        )
      ))

      allEvents.forEach((item) => (
        this.elementsEvents.push(
          {
            name: item.name,
            port: EventPortModel,
            widget: EventNodeWidget,
            nodeModel: EventNodeModel,
            svg: API_URL + item.url,
          }
        )
      ))

      this.allElements = this.allElements.concat(this.elementsPages, this.elementsTraffic, this.elementsEmailMarketing, this.elementsEvents);

      this.createElements(this.allElements, this.engine)

      props ? this.deSerialization(this.engine, props) : this.newModel()
    }

  }

  getValues(array, value) {
    var obj = array.filter((arr, i) => {
      return arr.title === value ? arr.data : null;
    });
    return obj[0].data;
  }


  createElements(configElements, engine) {
    return configElements.forEach(item => {
      engine.registerPortFactory(new PortFactory(
        item.name, 
        () => new item.port(item.name)
      ));
      engine.registerNodeFactory(new NodeFactory(
        item.name,
        item.widget,
        item.nodeModel,
        item.svg,
      ));
    })
  }

  newModel() {
    this.activeModel = new RJD.DiagramModel();
    this.engine.setDiagramModel(this.activeModel);
  }

  getDiagramEngine() {
    return this.engine;
  }

  serialization(activeModel) {
    // We need this to help the system know what models to create form the JSON
    let engine = new RJD.DiagramEngine();
    engine.installDefaultFactories();
    engine.registerLinkFactory(new AdvancedLinkFactory());

    this.createElements(this.allElements, engine)

    // Serialize the model
    const str = JSON.stringify(activeModel.serializeDiagram());
    return str;
  }

  deSerialization(engine, str) {
    const model2 = new RJD.DiagramModel();
    model2.deSerializeDiagram(JSON.parse(str), engine);
    engine.setDiagramModel(model2);
    return model2;
  }
}
