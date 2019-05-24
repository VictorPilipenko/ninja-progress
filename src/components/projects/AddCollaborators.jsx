import React from 'react'
import { connect } from 'react-redux'
import { addCollaborator } from '../../store/actions/collaborations'

class AddCollaborators extends React.Component {
  componentDidMount() {
    // this.props.addCollaborator(this.props.tokenCollaborator)
    // this.props.tokenCollaborator && localStorage.setItem('collaborate-confirm-token', JSON.stringify(this.props.tokenCollaborator));
    console.log('AddCollaborators Component')

    // const token = JSON.parse(localStorage.getItem('token'));
    // if (token) {
      // console.log(this.props.tokenCollaborator)
      this.props.addCollaborator(this.props.tokenCollaborator)
    // }
  }

  render() {
    return (
      <>
        {
          this.props.error && this.props.error.length > 0 ?
            <p className='create-funnels'>{this.props.error}</p> : null
        }
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('state.projects.addCollaboratorError: ', state.projects.addCollaboratorError)
  return {
    tokenCollaborator: ownProps.match.params.token,
    error: state.collaborations.addCollaboratorError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addCollaborator: id => dispatch(addCollaborator(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollaborators);