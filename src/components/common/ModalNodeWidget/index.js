import React from "react";
import "./index.css";
import { ReactComponent as ArrowSelectSVG } from "../../../assets/arrow-up.svg";

const ModalNodeWidget = ({ handleClose, show, children, style, close }) => {
  const showHideClassName = show ? "display-block-node-widget" : "display-none";
  const showHideClassNameHover = show
    ? "display-block-node-widget-hover"
    : "display-none";

  return (
    <div className={showHideClassName}>
      <div
        className="test-modal"
        onClick={() => handleClose()}
        title={"click to close modal"}
      />
      <section className="modal-node-widget-main" style={style}>
        <button
          className="close-modal-node-widget"
          onClick={handleClose}
          title={"click to close modal"}
        >
          <div className="arrow-for-select">
            <ArrowSelectSVG />
          </div>
        </button>
        {children}
      </section>
    </div>
  );
};

export default ModalNodeWidget;
