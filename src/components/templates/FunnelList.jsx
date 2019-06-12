import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './FunnelList.css'
import { getAllTemplates } from '../../store/actions/projects'
import FunnelItemContainer from './FunnelItemContainer.jsx'

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
    console.log(this.props)
    return (
      <>
        <Layout title={`Templates List`}>
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
                <div className='create-funnels'>
                  No templates.
              </div>
            }
          </div>
        </Layout>
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.projects[`funnelsList${ownProps.match.params.projectId}`])
  return {
    templates: state.projects.templatesList,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTemplates: () => dispatch(getAllTemplates()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunnelList);
