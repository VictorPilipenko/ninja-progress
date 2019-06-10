import * as RJD from "storm-react-diagrams";

//import custom link, port and factory
import { NodeFactory } from "./custom/NodeFactory";
import { PortFactory } from "./custom/PortFactory";
import { AdvancedLinkFactory } from "./custom/customLink";

// import the custom models
import { BlogPostPortModel } from "./custom/pages/BlogPost/BlogPostPortModel";
import { BlogPostNodeModel } from "./custom/pages/BlogPost/BlogPostNodeModel";
import { BlogPostNodeWidget } from "./custom/pages/BlogPost/BlogPostNodeWidget";

import BlogPostSVG from '../../../assets/pages/blog-post.svg'
import CalendarSVG from '../../../assets/pages/calendar.svg'
import DownloadSVG from '../../../assets/pages/download.svg'
import GenericSVG from '../../../assets/pages/generic.svg'
import MembersAreaSVG from '../../../assets/pages/members-area.svg'
import OptInSVG from '../../../assets/pages/opt-in.svg'
import OrderPageSVG from '../../../assets/pages/order-page.svg'
import PopupSVG from '../../../assets/pages/popup.svg'
import SalesPageSVG from '../../../assets/pages/sales-page.svg'
import SalesVideoSVG from '../../../assets/pages/sales-video.svg'
import SurveySVG from '../../../assets/pages/survey.svg'
import ThankYouSVG from '../../../assets/pages/thank-you.svg'
import UpsellSVG from '../../../assets/pages/upsell.svg'
import WebinarSVG from '../../../assets/pages/webinar.svg'
import WebinarReplaySVG from '../../../assets/pages/webinar-replay.svg'

import AddToCartSVG from '../../../assets/Events/AddToCart.svg'
import ClickButtonSVG from '../../../assets/Events/ClickButton.svg'
import CompleteFormSVG from '../../../assets/Events/CompleteForm.svg'
import GenericEventSVG from '../../../assets/Events/GenericEvent.svg'
import PopUpBoxSVG from '../../../assets/Events/PopUpBox.svg'
import PurchaseSVG from '../../../assets/Events/Purchase.svg'
import ScrollSVG from '../../../assets/Events/Scroll.svg'
import WatchVideoSVG from '../../../assets/Events/WatchVideo.svg'

import AddTagSVG from '../../../assets/EmailMarketing/AddTag.svg'
import ConditionSVG from '../../../assets/EmailMarketing/Condition.svg'
import CustomActionSVG from '../../../assets/EmailMarketing/CustomAction.svg'
import RemoveTagSVG from '../../../assets/EmailMarketing/RemoveTag.svg'
import SendEmailSVG from '../../../assets/EmailMarketing/SendEmail.svg'
import SendNotificationSVG from '../../../assets/EmailMarketing/SendNotification.svg'

/*****************************************************************************/
import { CalendarPortModel } from "./custom/pages/Calendar/CalendarPortModel";
import { CalendarNodeModel } from "./custom/pages/Calendar/CalendarNodeModel";
import { CalendarNodeWidget } from "./custom/pages/Calendar/CalendarNodeWidget";
/*****************************************************************************/
import { DownloadPortModel } from "./custom/pages/Download/DownloadPortModel";
import { DownloadNodeModel } from "./custom/pages/Download/DownloadNodeModel";
import { DownloadNodeWidget } from "./custom/pages/Download/DownloadNodeWidget";
/*****************************************************************************/
import { GenericPortModel } from "./custom/pages/Generic/GenericPortModel";
import { GenericNodeModel } from "./custom/pages/Generic/GenericNodeModel";
import { GenericNodeWidget } from "./custom/pages/Generic/GenericNodeWidget";
/*****************************************************************************/
import { MembersAreaPortModel } from "./custom/pages/MembersArea/MembersAreaPortModel";
import { MembersAreaNodeModel } from "./custom/pages/MembersArea/MembersAreaNodeModel";
import { MembersAreaNodeWidget } from "./custom/pages/MembersArea/MembersAreaNodeWidget";
/*****************************************************************************/
import { OptInPortModel } from "./custom/pages/OptIn/OptInPortModel";
import { OptInNodeModel } from "./custom/pages/OptIn/OptInNodeModel";
import { OptInNodeWidget } from "./custom/pages/OptIn/OptInNodeWidget";
/*****************************************************************************/
import { OrderPagePortModel } from "./custom/pages/OrderPage/OrderPagePortModel";
import { OrderPageNodeModel } from "./custom/pages/OrderPage/OrderPageNodeModel";
import { OrderPageNodeWidget } from "./custom/pages/OrderPage/OrderPageNodeWidget";
/*****************************************************************************/
import { PopupPortModel } from "./custom/pages/Popup/PopupPortModel";
import { PopupNodeModel } from "./custom/pages/Popup/PopupNodeModel";
import { PopupNodeWidget } from "./custom/pages/Popup/PopupNodeWidget";
/*****************************************************************************/
import { SalesPagePortModel } from "./custom/pages/SalesPage/SalesPagePortModel";
import { SalesPageNodeModel } from "./custom/pages/SalesPage/SalesPageNodeModel";
import { SalesPageNodeWidget } from "./custom/pages/SalesPage/SalesPageNodeWidget";
/*****************************************************************************/
import { SalesVideoPortModel } from "./custom/pages/SalesVideo/SalesVideoPortModel";
import { SalesVideoNodeModel } from "./custom/pages/SalesVideo/SalesVideoNodeModel";
import { SalesVideoNodeWidget } from "./custom/pages/SalesVideo/SalesVideoNodeWidget";
/*****************************************************************************/
import { SurveyPortModel } from "./custom/pages/Survey/SurveyPortModel";
import { SurveyNodeModel } from "./custom/pages/Survey/SurveyNodeModel";
import { SurveyNodeWidget } from "./custom/pages/Survey/SurveyNodeWidget";
/*****************************************************************************/
import { ThankYouPortModel } from "./custom/pages/ThankYou/ThankYouPortModel";
import { ThankYouNodeModel } from "./custom/pages/ThankYou/ThankYouNodeModel";
import { ThankYouNodeWidget } from "./custom/pages/ThankYou/ThankYouNodeWidget";
/*****************************************************************************/
import { UpsellPortModel } from "./custom/pages/Upsell/UpsellPortModel";
import { UpsellNodeModel } from "./custom/pages/Upsell/UpsellNodeModel";
import { UpsellNodeWidget } from "./custom/pages/Upsell/UpsellNodeWidget";
/*****************************************************************************/
import { WebinarPortModel } from "./custom/pages/Webinar/WebinarPortModel";
import { WebinarNodeModel } from "./custom/pages/Webinar/WebinarNodeModel";
import { WebinarNodeWidget } from "./custom/pages/Webinar/WebinarNodeWidget";
/*****************************************************************************/
import { WebinarReplayPortModel } from "./custom/pages/WebinarReplay/WebinarReplayPortModel";
import { WebinarReplayNodeModel } from "./custom/pages/WebinarReplay/WebinarReplayNodeModel";
import { WebinarReplayNodeWidget } from "./custom/pages/WebinarReplay/WebinarReplayNodeWidget";
/*****************************************************************************/

/*****************************************************************************/
import { AddToCartPortModel } from "./custom/events/AddToCart/AddToCartPortModel";
import { AddToCartNodeModel } from "./custom/events/AddToCart/AddToCartNodeModel";
import { AddToCartNodeWidget } from "./custom/events/AddToCart/AddToCartNodeWidget";
/*****************************************************************************/
import { ClickButtonPortModel } from "./custom/events/ClickButton/ClickButtonPortModel";
import { ClickButtonNodeModel } from "./custom/events/ClickButton/ClickButtonNodeModel";
import { ClickButtonNodeWidget } from "./custom/events/ClickButton/ClickButtonNodeWidget";
/*****************************************************************************/
import { CompleteFormPortModel } from "./custom/events/CompleteForm/CompleteFormPortModel";
import { CompleteFormNodeModel } from "./custom/events/CompleteForm/CompleteFormNodeModel";
import { CompleteFormNodeWidget } from "./custom/events/CompleteForm/CompleteFormNodeWidget";
/*****************************************************************************/
import { GenericEventPortModel } from "./custom/events/GenericEvent/GenericEventPortModel";
import { GenericEventNodeModel } from "./custom/events/GenericEvent/GenericEventNodeModel";
import { GenericEventNodeWidget } from "./custom/events/GenericEvent/GenericEventNodeWidget";
/*****************************************************************************/
import { PopUpBoxPortModel } from "./custom/events/PopUpBox/PopUpBoxPortModel";
import { PopUpBoxNodeModel } from "./custom/events/PopUpBox/PopUpBoxNodeModel";
import { PopUpBoxNodeWidget } from "./custom/events/PopUpBox/PopUpBoxNodeWidget";
/*****************************************************************************/
import { PurchasePortModel } from "./custom/events/Purchase/PurchasePortModel";
import { PurchaseNodeModel } from "./custom/events/Purchase/PurchaseNodeModel";
import { PurchaseNodeWidget } from "./custom/events/Purchase/PurchaseNodeWidget";
/*****************************************************************************/
import { ScrollPortModel } from "./custom/events/Scroll/ScrollPortModel";
import { ScrollNodeModel } from "./custom/events/Scroll/ScrollNodeModel";
import { ScrollNodeWidget } from "./custom/events/Scroll/ScrollNodeWidget";
/*****************************************************************************/
import { WatchVideoPortModel } from "./custom/events/WatchVideo/WatchVideoPortModel";
import { WatchVideoNodeModel } from "./custom/events/WatchVideo/WatchVideoNodeModel";
import { WatchVideoNodeWidget } from "./custom/events/WatchVideo/WatchVideoNodeWidget";
/*****************************************************************************/

/*****************************************************************************/
import { AddTagPortModel } from "./custom/emailMarketing/AddTag/AddTagPortModel";
import { AddTagNodeModel } from "./custom/emailMarketing/AddTag/AddTagNodeModel";
import { AddTagNodeWidget } from "./custom/emailMarketing/AddTag/AddTagNodeWidget";
/*****************************************************************************/
import { ConditionPortModel } from "./custom/emailMarketing/Condition/ConditionPortModel";
import { ConditionNodeModel } from "./custom/emailMarketing/Condition/ConditionNodeModel";
import { ConditionNodeWidget } from "./custom/emailMarketing/Condition/ConditionNodeWidget";
/*****************************************************************************/
import { CustomActionPortModel } from "./custom/emailMarketing/CustomAction/CustomActionPortModel";
import { CustomActionNodeModel } from "./custom/emailMarketing/CustomAction/CustomActionNodeModel";
import { CustomActionNodeWidget } from "./custom/emailMarketing/CustomAction/CustomActionNodeWidget";
/*****************************************************************************/
import { RemoveTagPortModel } from "./custom/emailMarketing/RemoveTag/RemoveTagPortModel";
import { RemoveTagNodeModel } from "./custom/emailMarketing/RemoveTag/RemoveTagNodeModel";
import { RemoveTagNodeWidget } from "./custom/emailMarketing/RemoveTag/RemoveTagNodeWidget";
/*****************************************************************************/
import { SendEmailPortModel } from "./custom/emailMarketing/SendEmail/SendEmailPortModel";
import { SendEmailNodeModel } from "./custom/emailMarketing/SendEmail/SendEmailNodeModel";
import { SendEmailNodeWidget } from "./custom/emailMarketing/SendEmail/SendEmailNodeWidget";
/*****************************************************************************/
import { SendNotificationPortModel } from "./custom/emailMarketing/SendNotification/SendNotificationPortModel";
import { SendNotificationNodeModel } from "./custom/emailMarketing/SendNotification/SendNotificationNodeModel";
import { SendNotificationNodeWidget } from "./custom/emailMarketing/SendNotification/SendNotificationNodeWidget";
/*****************************************************************************/
// import { SendSmsPortModel } from "./custom/emailMarketing/SendSms/SendSmsPortModel";
// import { SendSmsNodeModel } from "./custom/emailMarketing/SendSms/SendSmsNodeModel";
// import { SendSmsNodeWidget } from "./custom/emailMarketing/SendSms/SendSmsNodeWidget";
// /*****************************************************************************/

export default class Application  {
  constructor(props, svg) {

    // console.log(svg)

    this.elements = [
      { name: "BlogPost", port: BlogPostPortModel, widget: BlogPostNodeWidget, nodeModel: BlogPostNodeModel, svg: BlogPostSVG },
      { name: "Calendar", port: CalendarPortModel, widget: CalendarNodeWidget, nodeModel: CalendarNodeModel, svg: CalendarSVG },
      { name: "Download", port: DownloadPortModel, widget: DownloadNodeWidget, nodeModel: DownloadNodeModel, svg: DownloadSVG },
      { name: "Generic", port: GenericPortModel, widget: GenericNodeWidget, nodeModel: GenericNodeModel, svg: GenericSVG },
      { name: "MembersArea", port: MembersAreaPortModel, widget: MembersAreaNodeWidget, nodeModel: MembersAreaNodeModel, svg: MembersAreaSVG },
      { name: "OptIn", port: OptInPortModel, widget: OptInNodeWidget, nodeModel: OptInNodeModel, svg: OptInSVG },
      { name: "OrderPage", port: OrderPagePortModel, widget: OrderPageNodeWidget, nodeModel: OrderPageNodeModel, svg: OrderPageSVG },
      { name: "Popup", port: PopupPortModel, widget: PopupNodeWidget, nodeModel: PopupNodeModel, svg: PopupSVG },
      { name: "SalesPage", port: SalesPagePortModel, widget: SalesPageNodeWidget, nodeModel: SalesPageNodeModel, svg: SalesPageSVG },
      { name: "SalesVideo", port: SalesVideoPortModel, widget: SalesVideoNodeWidget, nodeModel: SalesVideoNodeModel, svg: SalesVideoSVG },
      { name: "Survey", port: SurveyPortModel, widget: SurveyNodeWidget, nodeModel: SurveyNodeModel, svg: SurveySVG },
      { name: "ThankYou", port: ThankYouPortModel, widget: ThankYouNodeWidget, nodeModel: ThankYouNodeModel, svg: ThankYouSVG },
      { name: "Upsell", port: UpsellPortModel, widget: UpsellNodeWidget, nodeModel: UpsellNodeModel, svg: UpsellSVG },
      { name: "Webinar", port: WebinarPortModel, widget: WebinarNodeWidget, nodeModel: WebinarNodeModel, svg: WebinarSVG },
      { name: "WebinarReplay", port: WebinarReplayPortModel, widget: WebinarReplayNodeWidget, nodeModel: WebinarReplayNodeModel, svg: WebinarReplaySVG },

      { name: "AddToCart", port: AddToCartPortModel, widget: AddToCartNodeWidget, nodeModel: AddToCartNodeModel, svg: AddToCartSVG },
      { name: "ClickButton", port: ClickButtonPortModel, widget: ClickButtonNodeWidget, nodeModel: ClickButtonNodeModel, svg: ClickButtonSVG },
      { name: "CompleteForm", port: CompleteFormPortModel, widget: CompleteFormNodeWidget, nodeModel: CompleteFormNodeModel, svg: CompleteFormSVG },
      { name: "GenericEvent", port: GenericEventPortModel, widget: GenericEventNodeWidget, nodeModel: GenericEventNodeModel, svg: GenericEventSVG },
      { name: "PopUpBox", port: PopUpBoxPortModel, widget: PopUpBoxNodeWidget, nodeModel: PopUpBoxNodeModel, svg: PopUpBoxSVG },
      { name: "Purchase", port: PurchasePortModel, widget: PurchaseNodeWidget, nodeModel: PurchaseNodeModel, svg: PurchaseSVG },
      { name: "Scroll", port: ScrollPortModel, widget: ScrollNodeWidget, nodeModel: ScrollNodeModel, svg: ScrollSVG },
      { name: "WatchVideo", port: WatchVideoPortModel, widget: WatchVideoNodeWidget, nodeModel: WatchVideoNodeModel, svg: WatchVideoSVG },

      { name: "AddTag", port: AddTagPortModel, widget: AddTagNodeWidget, nodeModel: AddTagNodeModel, svg: AddTagSVG },
      { name: "Condition", port: ConditionPortModel, widget: ConditionNodeWidget, nodeModel: ConditionNodeModel, svg: ConditionSVG },
      { name: "CustomAction", port: CustomActionPortModel, widget: CustomActionNodeWidget, nodeModel: CustomActionNodeModel, svg: CustomActionSVG },
      { name: "RemoveTag", port: RemoveTagPortModel, widget: RemoveTagNodeWidget, nodeModel: RemoveTagNodeModel, svg: RemoveTagSVG },
      { name: "SendEmail", port: SendEmailPortModel, widget: SendEmailNodeWidget, nodeModel: SendEmailNodeModel, svg: SendEmailSVG },
      { name: "SendNotification", port: SendNotificationPortModel, widget: SendNotificationNodeWidget, nodeModel: SendNotificationNodeModel, svg: SendNotificationSVG },
      // { name: "SendSms", port: SendSmsPortModel, widget: SendSmsNodeWidget, nodeModel: SendSmsNodeModel, svg: SendSmsSVG },

    ];

    this.engine = new RJD.DiagramEngine();
    this.engine.installDefaultFactories();
    this.engine.registerLinkFactory(new AdvancedLinkFactory());

    this.createElements(this.elements, this.engine)

    props ? this.deSerialization(this.engine, props) : this.newModel()
  }

  createElements(configElements, engine) {
    return configElements.forEach(item => {
      engine.registerPortFactory(new PortFactory(item.name, config => new item.port()));
      engine.registerNodeFactory(new NodeFactory(item.name, item.widget, item.nodeModel, item.svg));
    })
  }

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

    this.createElements(this.elements, engine)

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
