export interface TypeAttributesProps {
    el?: TypesName['type'];
    content: any;
    options?: IColumnsOptions;
    actions?: IActionType[];
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