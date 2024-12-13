import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Tag, Modal, Input, Button } from "antd";
import ColumnsType from "./components/attoms/ColumnsType";

interface TypesName {
  type?: 'string' | 'integer' | 'float' | 'date' | 'phone' | 'link' | 'list' | 'actions' | 'default';
}

interface IActionType {
  actionName: string;
  actionIcon: React.ReactNode;
  actionHandler: (id: string | number) => void;
}

interface IStatusValues {
  value: string;
  color: string;
  label: string;
}
interface IColumnsOptions {
  format?: string;
  url?: string;
  isInternal?: boolean
  statusValues?: IStatusValues[]
  trueValue?: string;
  falseValue?: string;
}

interface ColumnType {
  title: string;
  dataIndex: string;
  type?: TypesName['type'];
  sortable?: boolean;
  options?: IColumnsOptions;
  actions?: IActionType[];
}

interface DataType {
  id: string | number;
  [key: string]: any;
}

interface TypeAttributesProps {
  el?: TypesName['type'];
  content: any;
  options?: IColumnsOptions;
  actions?: IActionType[];
}

interface DataTableProps {
  tableTitle?: string;
  columns: ColumnType[];
  pagination?: any;
  actions?: IActionType[];
  onTableAction?: Function;
  data: DataType[];
}

// Add sorting functions for different data types
const getSorter = (type: string) => {
  switch (type) {
    case 'string':
      return (a: any, b: any) => (a ?? '').localeCompare(b ?? '');
    case 'link':
      return (a: any, b: any) => (a ?? '').localeCompare(b ?? '');
    case 'integer':
      return (a: any, b: any) => Number(a) - Number(b);
    case 'float':
      return (a: any, b: any) => parseFloat(a) - parseFloat(b);
    case 'date':
      return (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime();
    default:
      return undefined;
  }
};

function DataTable({ tableTitle = "Title", columns = [], actions = [], data = [], pagination = {}, onTableAction }: DataTableProps) {
  const [antData, setAntData] = useState<DataType[]>([]);
  const [antdColumn, setAntdColumn] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string | null, order: 'ascend' | 'descend' | null }>({
    columnKey: null,
    order: null,
  });
  const navigate = useNavigate();

  // Function to handle search across all columns
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = value ? data.filter((record: DataType) => {
      return columns.some((col) => {
        const cellValue = record[col.dataIndex];
        if (cellValue == null) return false;
        
        // Convert cell value to string based on type
        let stringValue = '';
        switch (col.type) {
          case 'date':
            stringValue = dayjs(cellValue).format(col.options?.format || "DD.MM.YYYY");
            break;
          case 'list':
            stringValue = Array.isArray(cellValue) ? cellValue.join(' ') : String(cellValue);
            break;
          default:
            stringValue = String(cellValue);
        }
        
        return stringValue.toLowerCase().includes(value.toLowerCase());
      });
    }) : data;

    setAntData(filteredData);
  };

  function TypeAttributes({ el = "default", content, options = {}, actions = [] }: TypeAttributesProps): JSX.Element {
    const type: { [key: string]: JSX.Element } = {
      default: <span></span>,
      string: <ColumnsType.StringType content={content} />,
      integer: <ColumnsType.IntegerType content={content} />,
      float: <ColumnsType.FloatType content={content} />,
      status: <ColumnsType.StatusType content={content} options={options} />,
      // uuid: <span>{content} <button>Copy</button></span>,
      boolean: <ColumnsType.BooleanType content={content} options={options} />,
      date: <ColumnsType.DateType content={content} options={options} />,
      phone: <ColumnsType.PhoneType content={content} />,
      link: <ColumnsType.LinkType content={content} options={options} />,
      list: <ColumnsType.ListType content={content} />,
      actions: (
        <>
          {actions.map((action: IActionType, index: number) => (
            console.log(action),
            <button key={`${action.actionName}${index}`} onClick={() => action.actionHandler(content)}>
              {action.actionIcon} {action.actionName}
            </button>
          ))}
        </>
      ),
    };
    return type[el] || type.default;
  }


  useEffect(() => {
    setAntData([...data])
    const formattedColumns = [...columns, {
      title: "Action",
      key: "action",
      dataIndex: "actions",
      type: 'actions',
      actions: actions
    }].map((col) => ({
      ...col,
      key: col.dataIndex,
      sortOrder: sortedInfo.columnKey === col.dataIndex ? sortedInfo.order : null,
      render: (content: any) => (
        <TypeAttributes
          el={col.type || "default"}
          content={content}
          options={col.options || {}}
          actions={col.actions || []}
        />
      ),
      sorter: ['string', 'integer', 'float', 'date', 'link'].includes(col.type || 'default') && col.sortable !== false ? 
        (a: any, b: any) => {
          const sorterFunc = getSorter(col.type || 'default');
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
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16, width: 'inherit' }}
          allowClear
        />
        <Button onClick={() => navigate("/form")} icon={<PlusOutlined />} type="default" size={'large'}>
          Add New
        </Button>
      </span>
      <Table 
        columns={antdColumn} 
        dataSource={antData} 
        onChange={(pagination, filters, sorter: any) => {
          onTableAction && onTableAction({pagination, filters, sorter});
          // console.log(`Pagination: ${JSON.stringify(pagination)}, Filters: ${JSON.stringify(filters)}, Sorter: ${JSON.stringify(sorter)}`);
          if (sorter) {
            console.log(sorter);
            setSortedInfo({
              columnKey: sorter.columnKey,
              order: sorter.order === 'ascend' ? 'ascend' : 'descend'
            });
            console.log('Sorted Column:', sorter.columnKey, 'Order:', sorter.order);
          }
        }}
        pagination={{ 
          pageSize: pagination.limit, 
          hideOnSinglePage: true, 
          total: pagination.total, 
          defaultCurrent: 1,
          onChange: (page, pageSize) => {
            onTableAction && onTableAction({ antPagination: { current: page, pageSize }});
          }
        }} 
      />
    </>
  );
}

export default DataTable;
