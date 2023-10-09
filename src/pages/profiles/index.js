import React from "react";
import { useSelector } from "react-redux";
import Donar from "./DonarP/Donar";
import Organization from "./OrganizationP/Organization";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Hospital from "./HopitalP/Hospital";
import Inventory from "./Inventory/Inventory";
import InventoryTable from "../../components/InventoryTable";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div>
      <Tabs>
        {currentUser.userType === "donar" && (
          <>
            <Tabs.TabPane tab="organization" key="1">
              <Organization userType="donar" />
            </Tabs.TabPane>
            <Tabs.TabPane tab="inventory" key="2">
              <InventoryTable
                filters={{ inventoryType: "in", donar: currentUser._id }}
                userType="donar"
              />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab="Inventory" key="1">
              <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="hospitals" key="2">
              <Hospital />
            </Tabs.TabPane>
            <Tabs.TabPane tab="donars" key="3">
              <Donar />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "hospital" && (
          <>
            <Tabs.TabPane tab="Consumptions" key="1">
              <InventoryTable
                filters={{ hospital: currentUser._id, inventoryType: "out" }}
                userType="hospital"
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key="2">
              <Organization userType="hospital" />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
