import * as React from "react";
import {
	// DiagramEngine,
	// DiagramModel,
	// DefaultNodeModel,
	// LinkModel,
	DefaultPortModel,
	// DiagramWidget,
	// LinkWidget,
	// LinkProps,
	// DefaultLinkWidget,
	DefaultLinkModel,
	DefaultLinkFactory
} from "storm-react-diagrams";


export class AdvancedLinkModel extends DefaultLinkModel {
	constructor() {
		super("advanced");
		this.width = 5;
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

	// componentDidMount() {
	// 	this.mounted = true;
	// 	this.callback = () => {
	// 		if (!this.circle || !this.path) {
	// 			return;
	// 		}

	// 		this.percent += 2;
	// 		if (this.percent > 100) {
	// 			this.percent = 0;
	// 		}

	// 		let point = this.path.getPointAtLength(this.path.getTotalLength() * (this.percent / 100.0));

	// 		this.circle.setAttribute("cx", "" + point.x);
	// 		this.circle.setAttribute("cy", "" + point.y);

	// 		if (this.mounted) {
	// 			requestAnimationFrame(this.callback);
	// 		}
	// 	};
	// 	requestAnimationFrame(this.callback);
	// }

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
					stroke="rgba(255,0,0,0.5)"
					d={this.props.path}
				/>
				{/* <circle
					ref={ref => {
						this.circle = ref;
					}}
					r={10}
					fill="orange"
				/> */}
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



