import { useEffect, useState, useMemo } from "react";
import { Table } from "antd";

import { DataTableProps, DataType, ColumnType } from "../.././types";
import ColumnsRenderer from "../molecules/ColumnsRenderer";
import tableSorter from "../../util/tableSorter.util";
import hasPermission, { userPermissions } from "../../util/permissionUtil";

function DataTable({
  columns = [],
  actions = [],
  data = [],
  pagination = {},
  onTableAction,
  loading,
  useClientSideSorting,
  permissoinName,
}: DataTableProps) {
  const [antData, setAntData] = useState<DataType[]>([]);
  const [antdColumn, setAntdColumn] = useState<any[]>([]);
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: string | null;
    order: "ascend" | "descend" | null;
  }>({
    columnKey: null,
    order: null,
  });
  const formattedColumns = useMemo(() => {
    const columnsWithActions: ColumnType[] = [
      ...columns,
      {
        title: "Action",
        key: "action",
        type: "actions",
        actions: actions,
      },
    ];
    return columnsWithActions.map((col) => ({
      ...col,
      key: col.dataIndex,
      render: (content: any) => (
        <ColumnsRenderer
          el={col.type || "default"}
          content={content}
          options={col.options || {}}
          actions={col.actions || []}
        />
      ),
      sorter:
        ["string", "integer", "float", "date", "link"].includes(
          col.type || "default"
        ) && col.sortable !== false
          ? (a: any, b: any) => {
              const sorterFunc = tableSorter(col.type || "default");
              return sorterFunc
                ? sorterFunc(a[col.dataIndex], b[col.dataIndex])
                : 0;
            }
          : undefined,
    }));
  }, [columns, actions, sortedInfo]);

  useEffect(() => {
    setAntData([...data]);
    setAntdColumn(formattedColumns);
  }, [data, formattedColumns]);

  return (
    <>
      {hasPermission(permissoinName) && (
        <Table
          loading={loading}
          columns={antdColumn}
          dataSource={antData}
          onChange={(pagination, filters, sorter: any) => {
            onTableAction && onTableAction({ pagination, filters, sorter });
            if (sorter && useClientSideSorting) {
              setSortedInfo({
                columnKey: sorter.columnKey,
                order: sorter.order === "ascend" ? "ascend" : "descend",
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
      )}
    </>
  );
}

export default DataTable;
