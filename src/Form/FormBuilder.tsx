import DataForm from "./DataForm";

const inputs = [
    {
      name: "roles",
      id: "roles",
      type: "SELECT",
      placeholder: "Select Roles",
      label: "Roles",
      rules: [{ required: true, message: "Roles are required" }],
      inputAttrs: {
        options: [
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ],
      },
    },
    {
      name: "email",
      id: "email",
      type: "EMAIL",
      placeholder: "",
      label: "Email",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "title",
      id: "title",
      type: "TEXT",
      placeholder: "Enter your name",
      label: "Username",
      rules: [{ required: false, message: "title is required" }],
    },
    {
      name: "password",
      id: "password",
      type: "PASSWORD",
      placeholder: "",
      label: "Password",
      rules: [{ required: true, message: "title is required" }],
    },
    {
      name: "editor",
      id: "editor",
      type: "CHECKBOX",
      placeholder: "",
      label: "Editor",
      rules: [{ required: true, message: "filed is required" }],
      inputAttrs: {
        options: [
          {
            value: "1",
            label: "VSCode",
          },
          {
            value: "2",
            label: "Windsurf",
          },
          {
            value: "3",
            label: "Intellij",
          },
        ],
      },
    },
]

export default function FormBuilder() {
    return <div>
      {/* layout prop to indicate the input layout */}
        <DataForm inputs={inputs} layout="vertical" />
    </div>;
}