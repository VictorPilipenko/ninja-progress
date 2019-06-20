import * as React from "react";
import {
  DefaultPortModel,
  DefaultLinkModel,
  DefaultLinkFactory,
  DefaultNodeModel,
} from "storm-react-diagrams";

import { PointModel } from "storm-react-diagrams";
import * as _ from "lodash";

import { ReactComponent as ArrowLinkSVG } from '../../../../assets/arrow-link.svg';


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

      this.circleTarget2.setAttribute("cx", pointTarget.x);
      this.circleTarget2.setAttribute("cy", pointTarget.y);



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

  onMouseEnter = () => {
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

  simulateKey(keyCode, type) {
    var evtName = (typeof (type) === "string") ? "key" + type : "keydown";
    var event = document.createEvent("HTMLEvents");
    event.initEvent(evtName, true, false);
    event.keyCode = keyCode;
    document.dispatchEvent(event);
  }

  handleMouseTargetEnter = e => {
    console.log(this.props.selected)

    // this.simulateKey(16, "down");
    // console.log(e.shiftKey)
  }


  render() {
    const { path, model, selected } = this.props;
    // console.log(selected)
    return (
      <>
        <path
          ref={ref => this.path = ref}
          strokeWidth={model.width}
          stroke={selected ? `rgba(	97, 102, 110, 1)` : `rgba(	97, 102, 110, 0.5)`}
          strokeDasharray="5,5"
          d={path}
          stroke-linecap="square"

          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          // onMouseEnter={e => this.handleMouseTargetEnter(e)}
        />

        <circle
          className='circleee'
          ref={ref => this.circle = ref}
          r={3}
          fill="orange"
        />

        {/* <circle
          className='circleee'
          ref={ref => this.circleTarget = ref}
          r={6}
          fill="orange"
        // onMouseEnter={this.handleMouseTargetEnter}
        // onMouseLeave={this.handleMouseTargetLeave}
        /> */}


        {/* <g id="стрелка" transform="translate(-413 792) rotate(-90)">
          <circle id="Ellipse_50" data-name="Ellipse 50" cx="6" cy="6" r="6" transform="translate(780 413)" fill="#fd8f21" />
          <path id="стрелка-2" data-name="стрелка" d="M-493.5,8397.362l2.386,2.386,2.385-2.386" transform="translate(1277 -7979)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
        </g> */}


        <g>
          <circle ref={ref => this.circleTarget = ref} r="6" fill="#fd8f21" />
          <circle ref={ref => this.circleTarget2 = ref} r="2" fill="#fff" />
        </g>


        {/* <g width="100" height="100">
          <circle ref={ref => this.circleTarget = ref} r="6" fill="red" />
          <path
            d="M-493.5,8397.362l2.386,2.386,2.385-2.386" transform="translate(50,80)"  />
        </g> */}


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
          engine={widget.props.diagramEngine}
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



