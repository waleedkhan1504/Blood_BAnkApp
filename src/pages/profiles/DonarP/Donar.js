import React, { useEffect, useState } from "react";
//import { GetAllDonarsOfAnOrganization } from "../../apicalls/auth";
import { Table, message } from "antd";
import { GetAllDonarsOfAnOrganization } from "../../../apicalls/auth";
import { getDateFormat } from "../../../utils/helper";
//import { getDateFormat } from "../../utils/helper";

const Donar = () => {
  const [data, setData] = useState([]);
  const getDonarRecords = async () => {
    try {
      const response = await GetAllDonarsOfAnOrganization();

      if (response?.success) {
        setData(response?.data);
        //  console.log(response?.data?.name);
        message.success(response?.message);
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];
  useEffect(() => {
    getDonarRecords();
  }, []);
  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Donar;
