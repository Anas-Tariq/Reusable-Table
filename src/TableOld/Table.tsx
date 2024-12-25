import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { IPagination, TableColumnProps } from "./types";

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
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function getData(values: object) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData({
      "page": 1,
      "limit": 10,
    });
  }, []);

  const getTableAction = (action: {pagination: { current: number; pageSize: number }; sorter: { columnKey: string; order: string } }) => {

    
    getData({
      "page": action.pagination.current == pagination.page ? 1 : action.pagination.current,
      "limit": action.pagination.pageSize,
      "sortBy": action.sorter?.columnKey,
      "sortOrder": action.sorter?.order ? action.sorter?.order == "ascend" ? "ASC" : "DESC" : undefined
    })
  }


    const columns: TableColumnProps[] = [
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
    const Backcolumns: TableColumnProps[] = [
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
          actionName: 'Remove',
          actionHandler: (content: any) => {
            console.log(content);
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
            console.log(content);
            navigate(`/organization/${content.id}`)
          },
          actionIcon: <EditOutlined />
        },
      ]


    return <div>
        <DataTable tableTitle="Users" columns={Backcolumns} actions={actions} data={backData} pagination={pagination} onTableAction={getTableAction} loading={loading} />
    </div>;
}