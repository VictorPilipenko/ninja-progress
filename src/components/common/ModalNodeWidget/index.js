import React from 'react';
import './index.css'

const ModalNodeWidget = ({ handleClose, show, children, style }) => {
  const showHideClassName = show ? "display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-node-widget-main" style={style}>
        <button className="close-modal-node-widget" onClick={handleClose}>X</button>
        {children}
      </section>
    </div>
  );
};

export default ModalNodeWidget;
