import { Dropdown, Space, Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { IActionOptions, IStatusObject, CellRendererProps } from "../../types";
import { formatNumber } from "../../util/numberFormatter";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import hasPermission from "../../util/permissionUtil";
import { userPermissions } from "./../../util/permissionUtil";

function StringCell({ content }: CellRendererProps<"string">) {
  return <span>{content ? content : "-"}</span>;
}

function IntegerCell({ content }: CellRendererProps<"integer">) {
  return (
    <span>
      {isNaN(Number(formatNumber(content)))
        ? "N/A"
        : Number(formatNumber(content))}
    </span>
  );
}

function FloatCell({ content }: CellRendererProps<"float">) {
  return <span>{parseFloat(formatNumber(content)).toFixed(2)}</span>;
}

function StatusCell({ content, options }: CellRendererProps<"status">) {
  if (options.statusValues.length < 0)
    throw new Error("StatusCells must have and array of statusValues");
  const currentValue = options.statusValues?.find(
    (status: IStatusObject) => status.value === content
  );
  return <Tag color={currentValue?.color}>{currentValue?.label}</Tag>;
}

function BooleanCell({ content, options }: CellRendererProps<"boolean">) {
  return content ? (
    <Tag color="green">{options.trueValue || "Active"} </Tag>
  ) : (
    <Tag color="red">{options.falseValue || "Inactive"} </Tag>
  );
}

function DateCell({ content, options }: CellRendererProps<"date">) {
  return <span>{dayjs(content).format(options.format || "DD.MM.YYYY")}</span>;
}

function PhoneCell({ content }: CellRendererProps<"phone">) {
  return <span dir="ltr">{content}</span>;
}

function LinkCell({ content, options }: CellRendererProps<"link">) {
  return (
    <>
      {options.isInternal ? (
        <Link to={options.url as string}>{content}</Link>
      ) : (
        <a href={options.url}>{content}</a>
      )}
    </>
  );
}

function ListCell({ content }: CellRendererProps<"list">) {
  if (!Array.isArray(content)) throw new Error("List must be an array");

  return (
    <>
      {content.map((tag: string) => (
        <Tag color={"purple"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ))}
    </>
  );
}

function ActionsCell({ content, actions = [] }: CellRendererProps<"actions">) {
  const items = actions.map((action: IActionOptions, index: number) => ({
    label: (
      <button
        key={`${action.actionName}${index}`}
        onClick={() => action.actionHandler(content)}
        disabled={!hasPermission(action.permission)}
      >
        {action.actionIcon} {action.actionName}
      </button>
    ),
    key: `${action.actionName}${index}`,
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default {
  StringCell,
  IntegerCell,
  FloatCell,
  StatusCell,
  LinkCell,
  PhoneCell,
  BooleanCell,
  DateCell,
  ListCell,
  ActionsCell,
};
