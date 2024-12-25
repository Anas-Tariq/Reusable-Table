
import { useEffect, useState } from "react";
import { Modal } from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from '@ant-design/icons';

import { useNavigate } from "react-router-dom";
import DataTable from "../../DataTable";
import { IPagination } from "../../types";


export default function AdvancedDataTable({columns = [], endpoint= ''}) {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const navigate = useNavigate();

  async function getData(values: object) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": import.meta.env.VITE_SEARCH_TOKEN
        },
        body: JSON.stringify(values)
      })
      const data = await response.json();
      setData(data.data.data);
      setPagination(data.data.pagination);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    getData({
      "page": 1,
      "limit": 10,
    });
  }, []);

  const getTableAction = (action: {pagination: { current: number; pageSize: number }; sorter: { columnKey: string; order: string } }) => {
    console.log(action)
    
    getData({
      "page": action.pagination.current == pagination.page ? 1 : action.pagination.current,
      "limit": action.pagination.pageSize,
      "sortBy": action.sorter?.columnKey,
      "sortOrder": action.sorter?.order ? action.sorter?.order == "ascend" ? "ASC" : "DESC" : undefined
    })
  }


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
                setData(prevData => prevData.filter(row => row.id !== content.id));
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
        <DataTable tableTitle="Users" columns={columns} actions={actions} data={data} pagination={pagination} onTableAction={getTableAction} />
    </div>;
}