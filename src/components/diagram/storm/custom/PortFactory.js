import { AbstractPortFactory } from "@projectstorm/react-diagrams";

export class PortFactory extends AbstractPortFactory {
	constructor(type, cb) {
		super(type);
		this.cb = cb;
	}

	getNewInstance(initialConfig) {
		return this.cb(initialConfig);
	}
}