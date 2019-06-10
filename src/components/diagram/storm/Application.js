import * as RJD from "storm-react-diagrams";

// import the custom models
import { BlogPostNodeFactory } from "./custom/pages/BlogPost/BlogPostNodeFactory";
import { BlogPostPortModel } from "./custom/pages/BlogPost/BlogPostPortModel";
import { CalendarNodeFactory } from "./custom/pages/Calendar/CalendarNodeFactory";
import { CalendarPortModel } from "./custom/pages/Calendar/CalendarPortModel";
import { DownloadNodeFactory } from "./custom/pages/Download/DownloadNodeFactory";
import { DownloadPortModel } from "./custom/pages/Download/DownloadPortModel";
import { GenericNodeFactory } from "./custom/pages/Generic/GenericNodeFactory";
import { GenericPortModel } from "./custom/pages/Generic/GenericPortModel";
import { MembersAreaNodeFactory } from "./custom/pages/MembersArea/MembersAreaNodeFactory";
import { MembersAreaPortModel } from "./custom/pages/MembersArea/MembersAreaPortModel";
import { OptInNodeFactory } from "./custom/pages/OptIn/OptInNodeFactory";
import { OptInPortModel } from "./custom/pages/OptIn/OptInPortModel";
import { OrderPageNodeFactory } from "./custom/pages/OrderPage/OrderPageNodeFactory";
import { OrderPagePortModel } from "./custom/pages/OrderPage/OrderPagePortModel";
import { PopupNodeFactory } from "./custom/pages/Popup/PopupNodeFactory";
import { PopupPortModel } from "./custom/pages/Popup/PopupPortModel";
import { SalesPageNodeFactory } from "./custom/pages/SalesPage/SalesPageNodeFactory";
import { SalesPagePortModel } from "./custom/pages/SalesPage/SalesPagePortModel";
import { SalesVideoNodeFactory } from "./custom/pages/SalesVideo/SalesVideoNodeFactory";
import { SalesVideoPortModel } from "./custom/pages/SalesVideo/SalesVideoPortModel";
import { SurveyNodeFactory } from "./custom/pages/Survey/SurveyNodeFactory";
import { SurveyPortModel } from "./custom/pages/Survey/SurveyPortModel";
import { ThankYouNodeFactory } from "./custom/pages/ThankYou/ThankYouNodeFactory";
import { ThankYouPortModel } from "./custom/pages/ThankYou/ThankYouPortModel";
import { UpsellNodeFactory } from "./custom/pages/Upsell/UpsellNodeFactory";
import { UpsellPortModel } from "./custom/pages/Upsell/UpsellPortModel";
import { WebinarNodeFactory } from "./custom/pages/Webinar/WebinarNodeFactory";
import { WebinarPortModel } from "./custom/pages/Webinar/WebinarPortModel";
import { WebinarReplayNodeFactory } from "./custom/pages/WebinarReplay/WebinarReplayNodeFactory";
import { WebinarReplayPortModel } from "./custom/pages/WebinarReplay/WebinarReplayPortModel";

import { AddToCartNodeFactory } from "./custom/events/AddToCart/AddToCartNodeFactory";
import { AddToCartPortModel } from "./custom/events/AddToCart/AddToCartPortModel";
import { ClickButtonNodeFactory } from "./custom/events/ClickButton/ClickButtonNodeFactory";
import { ClickButtonPortModel } from "./custom/events/ClickButton/ClickButtonPortModel";
import { CompleteFormNodeFactory } from "./custom/events/CompleteForm/CompleteFormNodeFactory";
import { CompleteFormPortModel } from "./custom/events/CompleteForm/CompleteFormPortModel";
import { GenericEventNodeFactory } from "./custom/events/GenericEvent/GenericEventNodeFactory";
import { GenericEventPortModel } from "./custom/events/GenericEvent/GenericEventPortModel";
import { PopUpBoxNodeFactory } from "./custom/events/PopUpBox/PopUpBoxNodeFactory";
import { PopUpBoxPortModel } from "./custom/events/PopUpBox/PopUpBoxPortModel";
import { PurchaseNodeFactory } from "./custom/events/Purchase/PurchaseNodeFactory";
import { PurchasePortModel } from "./custom/events/Purchase/PurchasePortModel";
import { ScrollNodeFactory } from "./custom/events/Scroll/ScrollNodeFactory";
import { ScrollPortModel } from "./custom/events/Scroll/ScrollPortModel";
import { WatchVideoNodeFactory } from "./custom/events/WatchVideo/WatchVideoNodeFactory";
import { WatchVideoPortModel } from "./custom/events/WatchVideo/WatchVideoPortModel";

import { AddTagNodeFactory } from "./custom/emailMarketing/AddTag/AddTagNodeFactory";
import { AddTagPortModel } from "./custom/emailMarketing/AddTag/AddTagPortModel";
import { ConditionNodeFactory } from "./custom/emailMarketing/Condition/ConditionNodeFactory";
import { ConditionPortModel } from "./custom/emailMarketing/Condition/ConditionPortModel";


//import custom link and fuck
import { SimplePortFactory } from "./custom/SimplePortFactory";
import { AdvancedLinkFactory } from "./custom/customLink";


export default class Application {
  constructor(props) {
    this.engine = new RJD.DiagramEngine();
    this.engine.installDefaultFactories();
    this.engine.registerLinkFactory(new AdvancedLinkFactory());

    this.engine.registerPortFactory(new SimplePortFactory("BlogPost", config => new BlogPostPortModel()));
    this.engine.registerNodeFactory(new BlogPostNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Calendar", config => new CalendarPortModel()));
    this.engine.registerNodeFactory(new CalendarNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Download", config => new DownloadPortModel()));
    this.engine.registerNodeFactory(new DownloadNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Generic", config => new GenericPortModel()));
    this.engine.registerNodeFactory(new GenericNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("MembersArea", config => new MembersAreaPortModel()));
    this.engine.registerNodeFactory(new MembersAreaNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("OptIn", config => new OptInPortModel()));
    this.engine.registerNodeFactory(new OptInNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("OrderPage", config => new OrderPagePortModel()));
    this.engine.registerNodeFactory(new OrderPageNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Popup", config => new PopupPortModel()));
    this.engine.registerNodeFactory(new PopupNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("SalesPage", config => new SalesPagePortModel()));
    this.engine.registerNodeFactory(new SalesPageNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("SalesVideo", config => new SalesVideoPortModel()));
    this.engine.registerNodeFactory(new SalesVideoNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Survey", config => new SurveyPortModel()));
    this.engine.registerNodeFactory(new SurveyNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("ThankYou", config => new ThankYouPortModel()));
    this.engine.registerNodeFactory(new ThankYouNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Upsell", config => new UpsellPortModel()));
    this.engine.registerNodeFactory(new UpsellNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Webinar", config => new WebinarPortModel()));
    this.engine.registerNodeFactory(new WebinarNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("WebinarReplay", config => new WebinarReplayPortModel()));
    this.engine.registerNodeFactory(new WebinarReplayNodeFactory());

    this.engine.registerPortFactory(new SimplePortFactory("AddToCart", config => new AddToCartPortModel()));
    this.engine.registerNodeFactory(new AddToCartNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("ClickButton", config => new ClickButtonPortModel()));
    this.engine.registerNodeFactory(new ClickButtonNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("CompleteForm", config => new CompleteFormPortModel()));
    this.engine.registerNodeFactory(new CompleteFormNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("GenericEvent", config => new GenericEventPortModel()));
    this.engine.registerNodeFactory(new GenericEventNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("PopUpBox", config => new PopUpBoxPortModel()));
    this.engine.registerNodeFactory(new PopUpBoxNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Purchase", config => new PurchasePortModel()));
    this.engine.registerNodeFactory(new PurchaseNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Scroll", config => new ScrollPortModel()));
    this.engine.registerNodeFactory(new ScrollNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("WatchVideo", config => new WatchVideoPortModel()));
    this.engine.registerNodeFactory(new WatchVideoNodeFactory());

    this.engine.registerPortFactory(new SimplePortFactory("AddTag", config => new AddTagPortModel()));
    this.engine.registerNodeFactory(new AddTagNodeFactory());
    this.engine.registerPortFactory(new SimplePortFactory("Condition", config => new ConditionPortModel()));
    this.engine.registerNodeFactory(new ConditionNodeFactory());

    props ? this.deSerialization(this.engine, props) : this.newModel()
  }

  // createElements(configElements) {
  //   return configElements.map(item => {
  //     const newElement = new this.vocabulary[item.type]();
  //     newElement.setPosition(item.x, item.y);
  //     return newElement;
  //   })
  // }

  newModel() {
    this.activeModel = new RJD.DiagramModel();
    this.engine.setDiagramModel(this.activeModel);
  }

  getDiagramEngine() {
    return this.engine;
  }

  serialization(engine, activeModel) {
    // We need this to help the system know what models to create form the JSON
    engine = new RJD.DiagramEngine();
    engine.installDefaultFactories();
    engine.registerLinkFactory(new AdvancedLinkFactory());

    engine.registerPortFactory(new SimplePortFactory("blogPost", config => new BlogPostPortModel()));
    engine.registerNodeFactory(new BlogPostNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("calendar", config => new CalendarPortModel()));
    engine.registerNodeFactory(new CalendarNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("download", config => new DownloadPortModel()));
    engine.registerNodeFactory(new DownloadNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("generic", config => new GenericPortModel()));
    engine.registerNodeFactory(new GenericNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("membersArea", config => new MembersAreaPortModel()));
    engine.registerNodeFactory(new MembersAreaNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("optIn", config => new OptInPortModel()));
    engine.registerNodeFactory(new OptInNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("orderPage", config => new OrderPagePortModel()));
    engine.registerNodeFactory(new OrderPageNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("popup", config => new PopupPortModel()));
    engine.registerNodeFactory(new PopupNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("salesPage", config => new SalesPagePortModel()));
    engine.registerNodeFactory(new SalesPageNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("SalesVideo", config => new SalesVideoPortModel()));
    engine.registerNodeFactory(new SalesVideoNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("Survey", config => new SurveyPortModel()));
    engine.registerNodeFactory(new SurveyNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("ThankYou", config => new ThankYouPortModel()));
    engine.registerNodeFactory(new ThankYouNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("Upsell", config => new UpsellPortModel()));
    engine.registerNodeFactory(new UpsellNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("Webinar", config => new WebinarPortModel()));
    engine.registerNodeFactory(new WebinarNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("WebinarReplay", config => new WebinarReplayPortModel()));
    engine.registerNodeFactory(new WebinarReplayNodeFactory());

    engine.registerPortFactory(new SimplePortFactory("AddToCart", config => new AddToCartPortModel()));
    engine.registerNodeFactory(new AddToCartNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("ClickButton", config => new ClickButtonPortModel()));
    engine.registerNodeFactory(new ClickButtonNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("CompleteForm", config => new CompleteFormPortModel()));
    engine.registerNodeFactory(new CompleteFormNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("GenericEvent", config => new GenericEventPortModel()));
    engine.registerNodeFactory(new GenericEventNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("PopUpBox", config => new PopUpBoxPortModel()));
    engine.registerNodeFactory(new PopUpBoxNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("Purchase", config => new PurchasePortModel()));
    engine.registerNodeFactory(new PurchaseNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("Scroll", config => new ScrollPortModel()));
    engine.registerNodeFactory(new ScrollNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("WatchVideo", config => new WatchVideoPortModel()));
    engine.registerNodeFactory(new WatchVideoNodeFactory());

    engine.registerPortFactory(new SimplePortFactory("AddTag", config => new AddTagPortModel()));
    engine.registerNodeFactory(new AddTagNodeFactory());
    engine.registerPortFactory(new SimplePortFactory("Condition", config => new ConditionPortModel()));
    engine.registerNodeFactory(new ConditionNodeFactory());

    // Serialize the model
    const str = JSON.stringify(activeModel.serializeDiagram());
    return str;
  }

  deSerialization(engine, str) {
    // Deserialize the model
    const model2 = new RJD.DiagramModel();
    model2.deSerializeDiagram(JSON.parse(str), engine);
    engine.setDiagramModel(model2);
    return model2;
  }
}










































