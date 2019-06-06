import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './FunnelList.css'
import { getAllTemplates } from '../../store/actions/projects'
import FunnelItemContainer from './FunnelItemContainer.jsx'
// import Mo5dal from '../common/Modal/Modal'
import { ReactComponent as CreateFunnelSVG } from '../../assets/new_funnel.svg';
// import { ReactComponent as TestSVG } from '../../assets/Blog_Post.svg';

class FunnelList extends React.Component {
  componentDidMount() {
    this.props.getAllTemplates();
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

  render() {
    return (
      <>
        <Layout title={`Templates List`}>
          {/* <button className="btn btn-1" onClick={this.showModal}
            style={{
              position: 'absolute',
              top: '10px',
              width: '150px',
              left: '91px',
              zIndex: 1
            }}
          >Create Funnel</button> */}
          <div className='projects-wrapper'>
            {
              this.props.templates && this.props.templates.length > 0 ?
                this.props.templates.map((funnel, index) => (
                  <FunnelItemContainer
                    key={index}
                    _id={funnel._id}
                    funnelName={funnel.templateName}
                    funnelBody={funnel.templateBody}
                    projectId={funnel.templateAuthor}
                  />
                ))
                :
                <div className='create-funnels' style={{ display: 'flex' }}>
                  {/* <TestSVG /> */}
                  <CreateFunnelSVG />
                  <div style={{ alignSelf: 'center', width: 'max-content' }}>
                    <p style={{ fontSize: '25px', marginBottom: '-15px' }}>
                      {/* Create your first funnel */}
                      <br />
                      <span style={{ fontSize: '14px' }}>Start bringing your ideas to life</span>
                    </p>
                    {/* <button className="btn btn-1" style={{ width: '125px', marginTop: '25px' }} onClick={this.showModal}>Create Funnel</button> */}
                  </div>
                </div>
            }
          </div>
        </Layout>
{/* 
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
        </Modal> */}
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.projects[`funnelsList${ownProps.match.params.projectId}`])
  return {
    templates: state.projects.templatesList,
    // projectId: ownProps.match.params.projectId,
    // error: state.projects.createFunnelError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTemplates: () => dispatch(getAllTemplates()),
    // createFunnel: (funnelName, id) => dispatch(createFunnel(funnelName, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunnelList);
