import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDateFormat } from "../../../utils/helper";
import { SetLoading } from "../../../redux/loaderSlice";
import { GetAllHospitalsOfAnOrganization } from "../../../apicalls/auth";

const Hospital = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllHospitalsOfAnOrganization();
      dispatch(SetLoading(false));
      if (response?.success) {
        setData(response?.data);
        console.log(response?.data);
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Hospital Name",
      dataIndex: "hospitalName",
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
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Hospital;
