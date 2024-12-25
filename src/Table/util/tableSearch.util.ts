import dayjs from "dayjs";
import { ColumnType, DataType } from "../types";

 // Function to handle search across all columns
export default function tableSearch (value: string, columns: ColumnType[], data: DataType[]) {
    
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

    return filteredData;
  };