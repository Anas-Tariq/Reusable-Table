export interface TypeAttributesProps {
    el?: TypesName['type'];
    content: any;
    options?: IColumnsOptions;
    actions?: IActionType[];
}
export interface IPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface IStatusValues {
    value: string;
    color: string;
    label: string;
}
export interface IColumnsOptions {
    format?: string;
    url?: string;
    isInternal?: boolean
    statusValues?: IStatusValues[]
    trueValue?: string;
    falseValue?: string;
}
export interface IActionType {
    actionName: string;
    actionIcon: React.ReactNode;
    actionHandler: (id: string | number) => void;
}

export interface ColumnType {
    title: string;
    dataIndex?: string;
    type?: TypesName['type'];
    key: string;
    sortable?: boolean;
    options?: IColumnsOptions;
    actions?: IActionType[];
}

export interface DataType {
    id: string | number;
    [key: string]: any;
}

export interface DataTableProps {
    tableTitle?: string;
    columns: ColumnType[];
    loading?: boolean;
    pagination?: any;
    actions?: IActionType[];
    onTableAction?: Function;
    data: DataType[];
}

export interface TableColumnProps {
    title: string;
    dataIndex?: string;
    key: string;
    type?: string;
    sortable?: boolean;
    options?: IColumnsOptions;
    actions?: IActionType[];
}