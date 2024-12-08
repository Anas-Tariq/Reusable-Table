import { useState } from "react";
import { Space, Tag } from "antd";
import type { TableProps } from "antd";

import Table from "./Table";
import "./App.css";

interface DataType {
  id: string;
  name: string;
  age: number;
  date: Date;
  address: string;
  tags: string[];
}
function App() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: "link",
      options: { url: "https://www.google.com" },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      type: "float",
      sortable: false
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      type: "string",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      type: "list",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      type: "date",
      options: {
        format: "DD.MM.YYYY",}
    },
    {
      title: "Action",
      key: "action",
      type: 'actions',
      actions: ['delete', 'edit', 'view']
    },
  ];

  const data: DataType[] = [
    {
      id: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      date: new Date(),
    },
    {
      id: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      date: new Date(),
    },
    {
      id: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      date: new Date(),
    },
  ];

  return (
    <div>
      <Table tableTitle="Users" columns={columns} data={data} />
    </div>
  );
}

export default App;
