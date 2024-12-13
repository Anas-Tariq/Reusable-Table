
import { Tag } from "antd";
import { IStatusValues, TypeAttributesProps } from "../../types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function StringType({ content }: TypeAttributesProps) {
    return <span>{content ? content : "-"}</span>;
}

function IntegerType({ content }: TypeAttributesProps) {
    return <span>{Number(content)}</span>;
}

function FloatType({ content }: TypeAttributesProps) {
    return <span>{parseFloat(String(content)).toFixed(2)}</span>;
}

function StatusType({ content, options = {} }: TypeAttributesProps) {
    const currentValue = options.statusValues?.find((status: IStatusValues) => status.value === content)
    console.log(currentValue);
    return <Tag color={currentValue?.color}>{currentValue?.label}</Tag>
}

function BooleanType({ content, options = {} }: TypeAttributesProps) {
    return <span>{content ? (options.trueValue || "Active") : (options.falseValue || "Inactive")}</span>;
}

function DateType({ content, options = {} }: TypeAttributesProps) {
    return <span>{dayjs(content).format(options.format || "DD.MM.YYYY")}</span>;
}

function PhoneType({ content }: TypeAttributesProps) {
    return <span dir="ltr">{content}</span>;
}

function LinkType({ content, options = {} }: TypeAttributesProps) {
    return <>{options.isInternal ? <Link to={options.url as string}>{content}</Link> : <a href={options.url}>{content}</a>}</>;
}

function ListType({ content }: TypeAttributesProps) {
    return Array.isArray(content) ? (
        <>
          {content.map((tag: string) => (
            <Tag color={"purple"} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
    ) : <span>{content}</span>
}




export default {
   StringType,
   IntegerType,
   FloatType,
   StatusType,
   LinkType,
   PhoneType,
   BooleanType,
   DateType,
   ListType
   


}