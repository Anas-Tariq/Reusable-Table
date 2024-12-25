import ColumnsCells from "../attoms/ColumnsCells";
import { CellRendererProps } from "../../types";
import {
  IStatusOptions,
  ILinkOptions,
  IDateOption,
  IBooleanOption,
} from "./../../types/index.d";

export default function ColumnsRenderer({
  el = "default",
  content,
  options = {},
  actions = [],
}: CellRendererProps): JSX.Element {
  const type: { [key: string]: JSX.Element } = {
    default: <span></span>,
    string: <ColumnsCells.StringCell content={content} />,
    integer: <ColumnsCells.IntegerCell content={content} />,
    float: <ColumnsCells.FloatCell content={content} />,
    status: (
      <ColumnsCells.StatusCell
        content={content}
        options={options as IStatusOptions}
      />
    ),
    // uuid: <span>{content} <button>Copy</button></span>,
    boolean: (
      <ColumnsCells.BooleanCell
        content={content}
        options={options as IBooleanOption}
      />
    ),
    date: (
      <ColumnsCells.DateCell
        content={content}
        options={options as IDateOption}
      />
    ),
    phone: <ColumnsCells.PhoneCell content={content} />,
    link: (
      <ColumnsCells.LinkCell
        content={content}
        options={options as ILinkOptions}
      />
    ),
    list: <ColumnsCells.ListCell content={content} />,
    actions: <ColumnsCells.ActionsCell content={content} actions={actions} />,
  };
  return type[el] || type.default;
}
