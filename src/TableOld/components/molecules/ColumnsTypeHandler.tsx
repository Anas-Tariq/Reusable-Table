import  ColumnsType  from "../attoms/ColumnsType";
import { TypeAttributesProps } from "../../types";

export default function ColumnsTypeHandler({ el = "default", content, options = {}, actions = [] }: TypeAttributesProps): JSX.Element {
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
        actions: <ColumnsType.ActionsType content={content} actions={actions} />,
      };
      return type[el] || type.default;
}