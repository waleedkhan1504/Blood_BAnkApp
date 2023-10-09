import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { GetInventory } from "../../../apicalls/inventory";
import InventoryForm from "./InventoryForm";
import { getDateFormat } from "../../../utils/helper";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const getInventoryRecords = async () => {
    try {
      const response = await GetInventory();
      if (response?.success) {
        setData(response?.data);
        message.success(response?.message);
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getInventoryRecords();
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
        if (record.inventoryType === "in") {
          return record.donar.name;
        } else {
          return record.hospital.hospitalName;
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
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-3 border-size-2"
      ></Table>
      {open && (
        <InventoryForm
          open={open}
          setOpen={setOpen}
          reloadData={getInventoryRecords}
        />
      )}
    </div>
  );
};

export default Inventory;
