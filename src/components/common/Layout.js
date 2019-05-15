import React from "react";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import SideNav, { /*Toggle, Nav,*/ NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import { NavLink } from 'react-router-dom'
import './Layout.css'

import { push } from 'connected-react-router'
import { connect } from 'react-redux';



class Layout extends React.Component {
  state = {
    expanded: true,
    // activeTab: '/'
  };
  render() {
    const { children } = this.props;
    console.log()
    return (
      <>
        {/* <Router>
          <Route render={() => (
            <React.Fragment>
              <SideNav
                onSelect={(selected) => {
                  const to = selected;
                  if (this.props.pathname !== to) {
                    this.props.changeRoute(to)
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="/">
                  <NavItem eventKey="/">
                    <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                      Home
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="/projects">
                    <NavIcon>
                      <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                      Devices
                    </NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main style={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'all .15s',
                marginLeft: `${this.state.expanded ? 240 : 64}px`,
              }}>
                <Header title={this.props.title} />
                {children}
              </main>
            </React.Fragment>
          )}
          />
        </Router> */}
        <SideNav
          expanded={this.state.expanded}
          onToggle={expanded => this.setState({ expanded })}
        >
          <SideNav.Toggle />
          <SideNav.Nav
            defaultSelected={this.state.activeTab}
            onSelect={eventKey => {
              // setTimeout(() => {
                this.props.changeRoute(eventKey)
              // }, 1000);
            }}
            style={{color: 'blue'}}
          >
            <NavItem eventKey="/">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Dashboard
              </NavText>
            </NavItem>

            <NavItem eventKey="/projects">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Projects
              </NavText>
            </NavItem>

          </SideNav.Nav>
        </SideNav>
        <main style={{
          position: 'relative',
          overflow: 'hidden',
          transition: 'all .15s',
          marginLeft: `${this.state.expanded ? 240 : 64}px`,
        }}>
          <Header title={this.props.title} />
          {children}
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

const mapDispatchToProps = dispatch => {
  return {
    changeRoute: url => dispatch(push(url)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);