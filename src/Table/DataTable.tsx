import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Tag, Modal, Input, Button } from "antd";

interface ColumnType {
  title: string;
  dataIndex: string;
  type?: 'string' | 'integer' | 'float' | 'date' | 'phone' | 'link' | 'list' | 'actions' | 'default';
  sortable?: boolean;
  options?: {
    format?: string;
    url?: string;
  };
  actions?: string[];
}

interface DataType {
  id: string | number;
  [key: string]: any;
}

interface TypeAttributesProps {
  el?: 'string' | 'integer' | 'float' | 'date' | 'phone' | 'link' | 'list' | 'actions' | 'default';
  content: any;
  options?: {
    format?: string;
    url?: string;
  };
  actions?: string[];
}

interface DataTableProps {
  tableTitle?: string;
  columns: ColumnType[];
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

function DataTable({ tableTitle = "Title", columns = [], data = [] }: DataTableProps) {
  const [antData, setAntData] = useState<DataType[]>([]);
  const [antdColumn, setAntdColumn] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
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
      string: <span>{content}</span>,
      integer: <span>{Number(content)}</span>,
      float: <span>{parseFloat(String(content)).toFixed(2)}</span>,
      date: <span>{dayjs(content).format(options.format || "DD.MM.YYYY")}</span>,
      phone: <span dir="ltr">+{content}</span>,
      link: <a href={options.url}>{content}</a>,
      list: Array.isArray(content) ? (
        <>{content.map((tag: string) => (
          <Tag color={"purple"} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        ))}</>
      ) : <span>{content}</span>,
      actions: (<>
        {actions.includes("delete") && <button onClick={() => handleDelete(content.id)} style={{color: 'red'}}><DeleteOutlined /></button>}
        {actions.includes("edit") && <button style={{color: 'blue'}}><EditOutlined /></button>}
        {actions.includes("view") && <button><EyeOutlined /></button>}
      </>),
    };
    return type[el] || type.default;
  }

  const handleDelete = (id: string | number) => {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setAntData(prevData => prevData.filter(row => row.id !== id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    setAntData([...data])
    const formattedColumns = columns.map((col) => ({
      ...col,
      render: (content: any) => (
        <TypeAttributes
          el={col.type || "default"}
          content={content}
          options={col.options || {}}
          actions={col.actions || []}
        />
      ),
      sorter: ['string', 'integer', 'float', 'date', 'link'].includes(col.type || 'default') && col.sortable !== false ? 
        (a: any, b: any) => getSorter(col.type || 'default')(a[col.dataIndex], b[col.dataIndex]) : 
        undefined
    }));
    setAntdColumn(formattedColumns);
  }, [columns, data]);

  console.log(antdColumn);
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
      <Table columns={antdColumn} dataSource={antData} />
    </>
  );
}

export default DataTable;
