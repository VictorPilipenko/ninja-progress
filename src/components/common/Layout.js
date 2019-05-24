import React from "react";
import Header from "./Header";
import './Layout.css'
import { connect } from 'react-redux';
import Sidebar from './SideNav/Sidebar/Sidebar.jsx'
import SidebarSettings from './SideNav/SidebarSettings/SidebarSettings.jsx'

class Layout extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <>
        {this.props.pathname.includes('settings') ?
          <>
            <Sidebar />
              <Header title={this.props.title} />
            <main className='main-settings'>
              <SidebarSettings />
              {children}
            </main>
          </>
          :
          <>
            <Sidebar />
              <Header title={this.props.title} />
            <main className='main-settings'>
              {children}
            </main>
          </>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
})


export default connect(mapStateToProps)(Layout);