import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './FunnelList.css'
import { getAllFunnels, createFunnel } from '../../store/actions/projects'
import FunnelItemContainer from './FunnelItemContainer.jsx'

class FunnelList extends React.Component {
  componentDidMount() {
    this.props.getAllFunnels(this.props.projectId);
  }

  state = {
    show: false,
    funnelName: ''
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = e => this.setState({
    funnelName: e.target.value
  });

  handleCreateFunnel = () => {
    this.props.createFunnel(this.state.funnelName, this.props.projectId)
    this.props.error && this.props.error.length > 0 && this.hideModal()
  }

  render() {
    console.log(this.props)
    return (
      <>
        <Layout title={`Funnels List`}>
          <button className="btn btn-1" onClick={this.showModal}
            style={{
              position: 'absolute',
              top: '-9px',
              width: '140px',
              left: '150px',
            }}
          >Create Funnel</button>
          <div className='projects-wrapper'>
            {console.log(this.props.funnels)}
            {
              this.props.funnels && this.props.funnels.length > 0 ?
                this.props.funnels.map((funnel, index) => (
                  <FunnelItemContainer
                    key={index}
                    _id={funnel._id}
                    funnelName={funnel.funnelName}
                    projectId={funnel.funnelProject}
                  />
                ))
                :
                <div className='create-funnels'>
                  No Funnels. Please, add one
                  <br />
                  <button className="btn btn-1" onClick={this.showModal}>Create Funnel</button>
                </div>

            }
          </div>
        </Layout>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <label className='label-create'>Create Funnel</label>

          <label htmlFor="Name" className='label-input'>
            Name
          </label>
          <input
            id="Name"
            placeholder="Funnel Name"
            type="text"
            value={this.state.funnelName}
            onChange={this.handleChange}
          />
          {this.props.error && this.props.error.length > 0 && (
            <div className={`input-group`}>{this.props.error}</div>
          )}
          <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.handleCreateFunnel()}>Create Funnel</button>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    funnels: state.projects[`funnelsList${ownProps.match.params.projectId}`],
    projectId: ownProps.match.params.projectId,
    error: state.projects.createFunnelError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllFunnels: id => dispatch(getAllFunnels(id)),
    createFunnel: (funnelName, id) => dispatch(createFunnel(funnelName, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunnelList);

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