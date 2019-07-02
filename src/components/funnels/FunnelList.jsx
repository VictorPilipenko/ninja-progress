import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './FunnelList.css'
import { getAllFunnels, createFunnel } from '../../store/actions/projects'
import FunnelItemContainer from './FunnelItemContainer.jsx'
import Modal from '../common/Modal/Modal'
import { ReactComponent as CreateFunnelSVG } from '../../assets/new_funnel.svg';

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

    setTimeout(() => {
      !this.props.error && this.hideModal()
    }, 1500)
  }

  even = n => !(n % 2);

  render() {
    return (
      <>
        <Layout title={`Funnels List`}>
          {
            this.props.funnelsLimit ?
              <>
                <div className='funnel-list-limit'>
                  Created {this.props.funnels && this.props.funnels.length}
                  {' '}
                  {this.props.funnels && this.props.funnels.length > 1 || this.props.funnels.length === 0 ? 'funnels' : 'funnel'}
                  {' '}
                  of {this.props.funnelsLimit}
                </div>
                <div className='funnel-list-limit'
                  style={{
                    borderBottom: '1px solid #dce5ec',
                    top: 100,
                    right: 20,
                    left: 20,
                  }} />
              </>
              : null
          }

          <div className='projects-wrapper' style={this.props.funnelsLimit ? { marginTop: 110 } : { marginTop: 70 }}>
            {
              this.props.funnels && this.props.funnels.length > 0 ?
                this.props.funnels.map((funnel, index) => (
                  <FunnelItemContainer
                    key={index}
                    _id={funnel._id}
                    funnelName={funnel.funnelName}
                    funnelBody={funnel.funnelBody}
                    projectId={funnel.funnelProject}
                    backgroundImg={funnel.funnelBackground}
                  />
                ))
                :
                <div className='create-funnels' style={{ display: 'flex' }}>
                  <CreateFunnelSVG />
                  <div style={{ alignSelf: 'center', width: 'max-content' }}>
                    <p style={{ fontSize: '25px', marginBottom: '-15px' }}>
                      Create your first funnel
                      <br />
                      <span style={{ fontSize: '14px' }}>Start bringing your ideas to life</span>
                    </p>
                    <button className="btn btn-1" style={{ width: '125px', marginTop: '25px' }} onClick={this.showModal}>Create Funnel</button>
                  </div>
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
    funnelsLimit: state.projects[`funnelsListLimit${ownProps.match.params.projectId}`],
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
