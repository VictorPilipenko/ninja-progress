import * as _ from "lodash";
import { PortModel } from "storm-react-diagrams";
import { AdvancedLinkModel } from "../../customLink";


export class AddToCartPortModel extends PortModel {
	// position: string | "top" | "bottom" | "left" | "right";

	constructor(pos = "top") {
		super(pos, "AddToCart");
		this.position = pos;
	}

	serialize() {
		return _.merge(super.serialize(), {
			position: this.position
		});
	}

	deSerialize(data, engine) {
		super.deSerialize(data, engine);
		this.position = data.position;
	}

	createLinkModel() {
		return new AdvancedLinkModel();
	}
}