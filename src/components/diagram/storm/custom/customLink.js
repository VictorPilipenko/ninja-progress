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
    this.progress = props.inversed ? 100 : 0;
  }

  componentDidMount() {
    this.mounted = true;

    this.callback = () => {
      if (!this.circleTarget || !this.path) {
        return;
      }
      let progress;

      if (this.props.inversed) {
        progress = 0;
      } else {
        progress = 100;
      }

      let pointTarget = this.path.getPointAtLength(
        Number.parseInt((this.path.getTotalLength() * (progress / 100.0)).toFixed())
      );
      this.circleTarget.setAttribute("cx", pointTarget.x);
      this.circleTarget.setAttribute("cy", pointTarget.y);

      if (this.mounted) {
        requestAnimationFrame(this.callback);
      }
    };
    requestAnimationFrame(this.callback);
  }

  show = () => this.circle.setAttribute("opacity", 1);
  hide = () => this.circle.setAttribute("opacity", 0);

  componentWillUnmount() {
    this.mounted = false;
  }

  onMouseEnter = (e) => {
    this.show()
    const length = this.path.getTotalLength(),
      step = 4 * 100 / length; // Move 100px for 1000ms

    this.progress = this.props.inversed ? 100 : 0; // reset progress

    this.animation = requestAnimationFrame(() => {
      this.animateCircle(length, step)
    });
  }

  onMouseLeave = () => {
    this.hide()
    cancelAnimationFrame(this.animation);
  }

  animateCircle = (length, step) => {
    const { inversed } = this.props;

    if (this.path && this.circle) {
      if (inversed) {
        this.progress -= step;
        if (this.progress < 0) {
          this.progress = 100;
        }
      } else {
        this.progress += step;
        if (this.progress > 100) {
          this.progress = 0;
        }
      }

      let point = this.path.getPointAtLength(
        Number.parseInt((length * (this.progress / 100.0)).toFixed())
      );

      this.circle.setAttribute("cx", "" + point.x);
      this.circle.setAttribute("cy", "" + point.y);

      this.animation = requestAnimationFrame(() => {
        this.animateCircle(length, step);
      });
    }
  }

  render() {
    console.log(this.props.selected)
    const { path, model, selected } = this.props;

    return (
      <>
        <path
          ref={ref => this.path = ref}
          strokeWidth={model.width}
          stroke={ selected ? `rgba(	97, 102, 110, 1)` : `rgba(	97, 102, 110, 0.5)`}
          strokeDasharray="5,5"
          d={path}
        />

        <path
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          strokeWidth={model.width * 5}
          d={path}
        />

        <circle
          ref={ref => this.circle = ref}
          r={3}
          fill="blue"
        />

        <circle
          ref={ref => this.circleTarget = ref}
          r={6}
          fill="orange"
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

  getDirection(source, target) {
    const difX = source.x - target.x
    const difY = source.y - target.y
    const isHorisontal = Math.abs(difX) > Math.abs(difY);

    return isHorisontal ? difX > 0 : difY > 0;
  }

  generateLinkSegment(model, widget, selected, path) {
    // console.log(widget)
    return (
      <g>
        <AdvancedLinkSegment
          model={model}
          path={path}
          selected={selected}
          inversed={
            model.sourcePort && model.targetPort ?
              this.getDirection(model.sourcePort, model.targetPort)
              : null
          }
        />
      </g>
    );
  }
}



