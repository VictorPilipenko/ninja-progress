import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

export const PrivateRouteAddCollaborator = ({ component: ComposedComponent, ...rest }) => {

  class Authentication extends Component {

    componentDidMount = () => {
      // this.props.tokenCollaborator && localStorage.setItem('collaborate-confirm-token', JSON.stringify(this.props.tokenCollaborator));

      // let params = (new URL(document.location));
      // console.log(router)
      // let arr = []
      // if (this.props.authenticated && this.props.router && this.props.router.from.pathname) {
      //   arr = this.props.router.from.pathname.split('/')
      //   localStorage.setItem('collaborate-confirm-token', JSON.stringify(arr[2]));
      // }
      // // console.log(arr[2])

      // if (!this.props.authenticated) {
      //   console.log(this.props.router)
      // }

      console.log(this.props.router)

    }

    // redirect if not authenticated; otherwise, return the component imputted into <PrivateRoute />
    handleRender(props) {
      if (!this.props.authenticated) {
        return <Redirect to={{
          pathname: `/sign-in/${props.location}`,
          state: {
            from: props.location,
            message: 'You need to sign up'
          }
        }} />
      } else {
        return <ComposedComponent {...props} />
      }
    }

    render() {



      return (
        <Route {...rest} render={this.handleRender.bind(this)} />
      )
    }
  }

  function mapStateToProps(state, ownProps) {
    // console.log('ownProps\n', ownProps)
    return {
      authenticated: state.auth.authenticatedReset,
      // tokenCollaborator: ownProps.match.params.token,
      router: state.router
    };
  }

  const AuthenticationContainer = connect(mapStateToProps)(Authentication)
  return <AuthenticationContainer />
}