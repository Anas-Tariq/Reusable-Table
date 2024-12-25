import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button } from "antd";

import { ColumnType, DataTableProps, DataType } from "./types";
import ColumnsTypeHandler from "./components/molecules/ColumnsTypeHandler";
import tableSorter from "./util/tableSorter.util";
import tableSearch from "./util/tableSearch.util";

function DataTable({ tableTitle = "Title", columns = [], actions = [], data = [], pagination = {}, onTableAction, loading }: DataTableProps) {
  const [antData, setAntData] = useState<DataType[]>([]);
  const [antdColumn, setAntdColumn] = useState<any[]>([]);
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string | null, order: 'ascend' | 'descend' | null }>({
    columnKey: null,
    order: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setAntData([...data])
    const columnsWithActions: ColumnType[] = [...columns, {
      title: "Action",
      key: "action",
      type: 'actions',
      actions: actions
    }];
    const formattedColumns = columnsWithActions.map((col) => ({
      ...col,
      key: col.dataIndex,
      sortOrder: sortedInfo.columnKey === col.dataIndex ? sortedInfo.order : null,
      render: (content: any) => (
        <ColumnsTypeHandler
          el={col.type || "default"}
          content={content}
          options={col.options || {}}
          actions={col.actions || []}
        />
      ),
      sorter: ['string', 'integer', 'float', 'date', 'link'].includes(col.type || 'default') && col.sortable !== false ? 
        (a: any, b: any) => {
          const sorterFunc = tableSorter(col.type || 'default');
          return sorterFunc ? sorterFunc(a[col.dataIndex], b[col.dataIndex]) : 0;
        } : 
        undefined
    }));
    setAntdColumn(formattedColumns);
  }, [columns, data, sortedInfo]);

  return (
    <>
      <h2>{tableTitle}</h2>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          placeholder="Search in all columns..."
          prefix={<SearchOutlined />}
          onChange={(e) => setAntData(tableSearch(e.target.value, columns, data))}
          style={{ marginBottom: 16, width: 'inherit' }}
          allowClear
        />
        <Button onClick={() => navigate("/form")} icon={<PlusOutlined />} type="default" size={'large'}>
          Add New
        </Button>
      </span>
      <Table
      loading={loading}
        columns={antdColumn} 
        dataSource={antData} 
        onChange={(pagination, filters, sorter: any) => {
          onTableAction && onTableAction({pagination, filters, sorter});          
          if (sorter) {
            console.log(sorter);
            setSortedInfo({
              columnKey: sorter.columnKey,
              order: sorter.order === 'ascend' ? 'ascend' : 'descend'
            });            
          }
        }}
        pagination={{ 
          pageSize: pagination.limit, 
          hideOnSinglePage: true, 
          total: pagination.total,
          current: pagination.page,
          defaultCurrent: 1,
        }} 
      />
    </>
  );
}

export default DataTable;
