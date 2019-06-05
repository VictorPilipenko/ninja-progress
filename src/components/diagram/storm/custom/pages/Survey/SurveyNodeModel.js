import { NodeModel } from "storm-react-diagrams";
import { SurveyPortModel } from "./SurveyPortModel";

export class SurveyNodeModel extends NodeModel {
	constructor() {
		super("Survey");
		this.addPort(new SurveyPortModel("top"));
		this.addPort(new SurveyPortModel("left"));
		this.addPort(new SurveyPortModel("bottom"));
		this.addPort(new SurveyPortModel("right"));
	}
}