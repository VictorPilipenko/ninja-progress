import React from 'react';
import Layout from "../common/Layout";
import Cookies from "js-cookie";

const Collaborations = () => {
  // console.log(console.log(localStorage.getItem('profile')))

  const userFirstName = Cookies.get("userFirstName");
  console.log(userFirstName)

  return (
    <Layout title="Collaborations">
      <div style={{ margin: 8 }}>
        Collaborations.
      </div>
    </Layout>
  );
}

export default Collaborations;


