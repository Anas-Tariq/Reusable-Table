import DataTable from "./DataTable";
import { act, useEffect, useState } from "react";
import { Modal, Space, Tag } from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";

interface IActionType {
  actionName: string;
  actionIcon: React.ReactNode;
  actionHandler: (id: string | number) => void;
}

interface ITableColumns extends TableProps<DataType> {
  type?: "string" | "integer" | "float" | "date" | "phone" | "link" | "list" | "actions" | "default";
  options?: {
    format?: string;
    url?: string;
  };
  actions?: IActionType[]
}
interface DataType {
    id: string;
    name: string;
    age: number;
    date: Date;
    status: string;
    address: string;
    tags: string[];
  }



export default function Table() {
  const [backData, setBackData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  async function getData(values: object) {
    try {
      const response = await fetch(import.meta.env.VITE_SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": import.meta.env.VITE_SEARCH_TOKEN
        },
        body: JSON.stringify(values)
      })
      const data = await response.json();
      setBackData(data.data.data);
      setPagination(data.data.pagination);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    getData({
      "isActive": true,
      "organizationName": "test",
      "isMfaRequired": false,
      "page": 1,
      "limit": 10,
      "sortBy": "createdAt",
      "sortOrder": "DESC"
    });
  }, []);

  const getTableAction = (action: { antPagination: { current: number; pageSize: number }; sorter: { columnKey: string; order: string } }) => {
    console.log(action)
    
    // action.antPagination == undefined ? getData({
    //   "isActive": true,
    //   "organizationName": "test",
    //   "isMfaRequired": false,
    //   "page": 1,
    //   "limit": pagination.limit,
    //   "sortBy": action.sorter?.columnKey,
    //   "sortOrder": action.sorter?.order == "ascend" ? "ASC" : "DESC"
    // })
    // :  getData({
    //   "isActive": true,
    //   "organizationName": "test",
    //   "isMfaRequired": false,
    //   "page": action.antPagination.current,
    //   "limit": action.antPagination.pageSize,
    //   "sortBy": action.sorter?.columnKey,
    //   "sortOrder": action.sorter?.order == "ascend" ? "ASC" : "DESC"
    // });
  }

    const columns: TableProps<DataType>["columns"] = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          type: "link",
          options: { url: "https://www.google.com", isInternal: true },
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          type: "float",
          sortable: false
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          type: "status",
          options: {
            statusValues: [
              { value: "complete", label: "Complete", color: "green" },
              { value: "pending", label: "Pending", color: "yellow" },
              { value: "process", label: "Process", color: "pink" },
            ],
          },
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
      ];
    const Backcolumns: TableProps<DataType>["columns"] = [
        {
          title: "Organization Name",
          dataIndex: "organizationName",
          key: "organizationName",
          type: "string",          
        },
        {
          title: "Active",
          dataIndex: "isActive",
          key: "isActive",
          type: "boolean",
        },
        {
          title: "Tenant ID",
          dataIndex: "tenantId",
          key: "tenantId",
          type: "string",
        },
        {
          title: "Default MFA",
          key: "defaultMfa",
          dataIndex: "defaultMfa",
          type: "text",
        },
        {
          title: "Created At",
          key: "createdAt",
          dataIndex: "createdAt",
          type: "date",
          options: {
            format: "DD/MM/YYYY",}
        },
        {
          title: "Action",
          key: "action",
          type: 'actions',
          actions: [ 
            {
              actionName: 'Delete',
              actionHandler: (content: any) => {
                Modal.confirm({
                  title: 'Are you sure delete this task?',
                  icon: <ExclamationCircleFilled />,
                  content: 'This action cannot be undone',
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk() {
                    setBackData(prevData => prevData.filter(row => row.id !== content.id));
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              },
              actionIcon: <DeleteOutlined />
            },
            {
              actionName: 'Edit',
              actionHandler: (content: any) => {
                navigate(`/organization/${content.id}`)
              },
              actionIcon: <EditOutlined />
            },
          ]
        },
      ];
    
      const data: DataType[] = [
        {
          id: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          status: 'pending',
          tags: ["nice", "developer"],
          date: new Date(),
        },
        {
          id: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          status: 'complete',
          tags: ["loser"],
          date: new Date(),
        },
        {
          id: "3",
          name: "Joe Black",
          age: 32,
          address: "Sydney No. 1 Lake Park",
          status: 'process',
          tags: ["cool", "teacher"],
          date: new Date(),
        },
      ];

      const actions = [
        {
          actionName: 'Delete',
          actionHandler: (content: any) => {
            Modal.confirm({
              title: 'Are you sure delete this task?',
              icon: <ExclamationCircleFilled />,
              content: 'This action cannot be undone',
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk() {
                setBackData(prevData => prevData.filter(row => row.id !== content.id));
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          },
          actionIcon: <DeleteOutlined />
        },
        {
          actionName: 'Edit',
          actionHandler: (content: any) => {
            navigate(`/organization/${content.id}`)
          },
          actionIcon: <EditOutlined />
        },
      ]


    return <div>
        <DataTable tableTitle="Users" columns={columns} actions={actions} data={data} pagination={pagination} onTableAction={getTableAction} />
    </div>;
}