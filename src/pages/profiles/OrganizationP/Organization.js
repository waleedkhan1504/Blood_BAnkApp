import React, { useEffect, useState } from "react";
import {
  GetAllHospitalsOfAnOrganization,
  GetAllOrganizationsOfADonar,
  GetAllOrganizationsOfAHospital,
} from "../../../apicalls/auth";
import { Modal, Table, message } from "antd";
import { getDateFormat } from "../../../utils/helper";
import InventoryTable from "../../../components/InventoryTable";
import { useSelector } from "react-redux";

const Organization = ({ userType }) => {
  const [data, setData] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const getData = async () => {
    let response = null;
    if (userType === "hospital") {
      response = await GetAllOrganizationsOfAHospital();
    } else response = await GetAllOrganizationsOfADonar();

    if (response?.success) {
      setData(response.data);
    } else {
      throw new Error(response?.message);
    }
  };
  const columns = [
    {
      title: " Name",
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          className="underline text-md cursor-pointer"
          onClick={() => {
            setSelectedOrganization(record);
            setShowHistoryModal(true);
          }}
        >
          History
        </span>
      ),
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table dataSource={data} columns={columns}></Table>
      {showHistoryModal && (
        <Modal
          title={`${
            userType === "donar" ? "Donation History" : "Consumption History"
          }
       IN ${selectedOrganization.organizationName}`}
          centered
          open={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          width={1000}
          onCancel={() => setShowHistoryModal(false)}
        >
          <InventoryTable
            filters={{
              organization: selectedOrganization._id,
              [userType]: currentUser._id,
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Organization;
