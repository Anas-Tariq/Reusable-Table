import { Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { ReactElement } from "react";

interface InputOption {
  value: string;
  label: string;
}

interface InputAttributes {
  options?: InputOption[];
}

interface FormInput {
  name: string;
  id: string;
  type: "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "SELECT" | "RADIO" | "CHECKBOX" | "DATE";
  placeholder?: string;
  label: string;
  rules?: any[];
  inputAttrs?: InputAttributes;
}

interface DataFormProps {
  inputs: FormInput[];
  layout?: "vertical" | "horizontal" | "inline";
}

export default function DataForm({ inputs = [], layout = 'vertical' }: DataFormProps): ReactElement {

  function TypeAttributes({ el = "default", input }: { el: string; input: FormInput }): ReactElement {
    const type: Record<string, ReactElement> = {
      default: <></>,
      text: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Input type="text" placeholder={input.placeholder} />
      </Form.Item>,
      number: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Input type="number" placeholder={input.placeholder} />
      </Form.Item>,
      email: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Input type="email" placeholder={input.placeholder} />
      </Form.Item>,
      password: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Input.Password placeholder={input.placeholder} />
      </Form.Item>,
      select: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Select
          placeholder={input.placeholder}
          optionFilterProp="label"      
          options={input.inputAttrs?.options}
        />
      </Form.Item>,
      radio: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Radio.Group onChange={(e) => console.log(e.target.value)} value={""}>
          {input.inputAttrs?.options?.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>,
      checkbox: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <Checkbox.Group options={input.inputAttrs?.options} onChange={e => console.log(e)} />
      </Form.Item>,
      date: <Form.Item
        key={input.id}
        label={input.label}
        name={input.name}
        rules={input.rules}
      >
        <DatePicker onChange={(date, dateString) => console.log(date, dateString)} />
      </Form.Item>,
    };

    return type[el.toLowerCase()] || type.default;
  }

  return (
    <div>
      <h2>User Form</h2>
      <Form
        layout={layout}
      >
      {
        inputs.map((input) => (
          <TypeAttributes 
            key={input.id} 
            el={input.type} 
            input={input} 
          />
        ))}
      </Form>
    </div>
  );
}