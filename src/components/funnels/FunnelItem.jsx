import React from 'react';
import './FunnelItem.css';

class FunnelItem extends React.Component {
  state = {
    show: false,
    showDelete: false,
    projectName: '',
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showModalDelete = () => {
    this.setState({ showDelete: true, show: false });
  };

  hideModalDelete = () => {
    this.setState({ showDelete: false });
  };

  handleDeleteFunnel = () => {
    this.props.handleDelete(this.props.projectId, this.props._id)
    this.hideModalDelete()
    this.hideModal()
  }

  render() {
    const {
      // _id,
      funnelName,
      funnels,
      // handleDelete,
    } = this.props;
    return (
      <>
        <div className='project-wrapper'>
          <div className='project-image'>
            {/* <button className='view-funnels' onClick={this.showModal}>View Funnels</button> */}
          </div>

          <div className='project'>
            {funnelName}
            <br />
            {/* {funnels} funnels */}
          </div>

          {/* <button className='delete-project' onClick={() => handleDelete(_id)}>Delete</button> */}

          <button className='options-project' onClick={this.showModal}>Options</button>

          <ClickOutside
            onClickOutside={() => {
              this.setState({ show: false })
            }}
          >
            <Select show={this.state.show} handleClose={this.hideModal} expanded={this.state.expanded}>
              <button className='btn-select btn-select-copy'>Make a copy</button>
              <button className='btn-select btn-select-share'>Share</button>
              <button className='btn-select btn-select-delete' onClick={this.showModalDelete}>Delete</button>
            </Select>
          </ClickOutside>

          <Modal show={this.state.showDelete} handleClose={this.hideModalDelete}>
            <label className='label-create'>Delete</label>

            <p style={{ fontSize: '13px' }} className='label-input-delete-project'>Are you sure you want to delete this funnel?</p>


            <div className='delete-modal-btn-wrapper'>
              <button className='btn btn-1 btn-delete-modal' onClick={() => this.handleDeleteFunnel()}>Delete</button>
              <button className='btn btn-1 btn-delete-modal' onClick={this.hideModalDelete}>Exit</button>
            </div>

            {/* {this.props.error && this.props.error.length > 0 && (
              <div className={`input-group`}>{this.props.error}</div>
            )} */}
          </Modal>

        </div>


      </>
    );
  }
}

export default FunnelItem;

//modalka, fuck yeah
const Select = ({ handleClose, show, expanded, children }) => {
  const showHideClassName = show ? "select display-block" : "select display-none";

  return (
    <div className={showHideClassName}>
      <section className="select-main">
        {children}
      </section>
    </div>
  );
};

//modalka, fuck yeah
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="close-modal" onClick={handleClose}>X</button>
        {children}
      </section>
    </div>
  );
};


export class ClickOutside extends React.Component {
  constructor(props) {
    super(props)
    this.getContainer = this.getContainer.bind(this)
    this.isTouch = false
  }

  getContainer(ref) {
    this.container = ref
  }

  render() {
    const { children, onClickOutside, ...props } = this.props
    return <div {...props} ref={this.getContainer}>{children}</div>
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true)
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true)
    document.removeEventListener('click', this.handle, true)
  }

  handle = e => {
    if (e.type === 'touchend') this.isTouch = true
    if (e.type === 'click' && this.isTouch) return
    const { onClickOutside } = this.props
    const el = this.container
    if (el && !el.contains(e.target)) onClickOutside(e)
  }
}