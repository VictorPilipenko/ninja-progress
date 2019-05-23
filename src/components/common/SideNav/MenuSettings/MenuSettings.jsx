import React from "react";
import "./MenuSettings.css";
import MenuSettingsItem from "./MenuSettingsItem";

const Menu = () => {
  return (
    <div className='menu-settings'>
      <MenuSettingsItem exact={true} to="/settings" name="Account Details" />
      <MenuSettingsItem exact={false} to="/settings/my-subscriptions" name="My Subscriptions" />
      <MenuSettingsItem exact={false} to="/settings/payment-methods" name="Payment Methods" />
      <MenuSettingsItem exact={false} to="/settings/users" name="Users" />
    </div>
  );
}

export default Menu;
