import AdvancedDataTable from "./components/template/AdvancedDataTable";

const BASE_URL = "import.meta.env.VITE_SEARCH_URL";
const columns = [
    {
      title: "Organization Name",
      dataIndex: "organizationName",
      key: "organizationName",
      type: "string",          
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      type: "boolean",
    },
    {
      title: "Tenant ID",
      dataIndex: "tenantId",
      key: "tenantId",
      type: "string",
    },
    {
      title: "Default MFA",
      key: "defaultMfa",
      dataIndex: "defaultMfa",
      type: "text",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      type: "date",
      options: {
        format: "DD/MM/YYYY",}
    },     
  ];

export default function AdvancedTable() {
   
    return <AdvancedDataTable columns={columns} endpoint={BASE_URL} />;
}