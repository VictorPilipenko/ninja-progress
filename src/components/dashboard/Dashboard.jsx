import React from 'react';
import Layout from "../common/Layout";
import Cookies from "js-cookie";

const Dashboard = () => {
  // console.log(console.log(localStorage.getItem('profile')))

  const userFirstName = Cookies.get("userFirstName");
  console.log(userFirstName)

  return (
    <Layout title="Dashboard">
      <div style={{ margin: 8 }}>
        Dashboard.
      </div>
    </Layout>
  );
}

export default Dashboard;


