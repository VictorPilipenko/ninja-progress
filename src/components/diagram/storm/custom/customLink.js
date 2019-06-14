import * as React from "react";
import {
	DefaultPortModel,
	DefaultLinkModel,
	DefaultLinkFactory
} from "storm-react-diagrams";


export class AdvancedLinkModel extends DefaultLinkModel {
	constructor() {
		super("advanced");
		this.width = 2;
	}
}

export class AdvancedPortModel extends DefaultPortModel {
	createLinkModel() {
		return new AdvancedLinkModel();
	}
}

export class AdvancedLinkSegment extends React.Component {
	constructor(props) {
		super(props);
		this.percent = 0;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<>
				<path
					ref={ref => {
						this.path = ref;
					}}
					strokeWidth={this.props.model.width}
					stroke="rgba(	97, 102, 110,0.5)"
					d={this.props.path}
				/>
			</>
		);
	}
}

export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super();
		this.type = "advanced";
	}

	getNewInstance(initialConfig) {
		return new AdvancedLinkModel();
	}

	generateLinkSegment(model, widget, selected, path) {
		return (
			<g>
				<AdvancedLinkSegment model={model} path={path} />
			</g>
		);
	}
}



