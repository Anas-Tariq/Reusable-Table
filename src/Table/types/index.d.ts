type CellType =
  | "default"
  | "string"
  | "integer"
  | "float"
  | "status"
  | "boolean"
  | "date"
  | "phone"
  | "link"
  | "list"
  | "actions";

export interface IStatusObject {
  value: string;
  color: string;
  label: string;
}
export interface IStatusOptions {
  statusValues: IStatusObject[];
}
export interface ILinkOptions {
  url: string;
  isInternal?: boolean;
}
export interface IActionOptions {
  actionName: string;
  actionIcon: React.ReactNode;
  actionHandler: (id: string | number) => void;
}
export interface IDateOption {
  format?: string;
}
export interface IBooleanOption {
  trueValue?: string;
  falseValue?: string;
}
type OptionsMap = {
  string: undefined;
  integer: undefined;
  float: undefined;
  status: IStatusOptions;
  boolean: IBooleanOption;
  date: IDateOption;
  phone: undefined;
  link: ILinkOptions;
  list: undefined;
  actions: IActionOptions;
};
type CellRendererProps<T extends CellType = CellType> = {
  el?: T;
  content: any;
  options?: OptionsMap[T];
  actions?: TableAction[];
};
export interface IColumnsOptions {
  format?: string;
  url?: string;
  isInternal?: boolean;
  statusValues?: IStatusValues[];
  trueValue?: string;
  falseValue?: string;
}
export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ColumnType {
  title: string;
  dataIndex?: string;
  key: string;
  type?: TypesName["type"];
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
  useClientSideSorting?: boolean;
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
