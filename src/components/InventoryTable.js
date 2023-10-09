import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetInventoryWithFilters } from "../apicalls/inventory";
import { getDateFormat } from "../utils/helper";

const InventoryTable = ({ filters, userType }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const response = await GetInventoryWithFilters({ filters });
      if (response?.success) {
        setData(response?.data);
        message.success(response.message);
      } else throw new Error(response.message);
    } catch (error) {
      message.error(error?.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === "organization") {
          return record.inventoryType === "in"
            ? record.donar?.name
            : record.hospital?.hospitalName;
        } else {
          return record.organization.organizationName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];
  return (
    <div>
      <Table dataSource={data} columns={columns}></Table>
    </div>
  );
};

export default InventoryTable;
