import { TableProps } from "antd";

export const columns: TableProps<string[]>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "60px",
    render: (text: any) => <a className="id">{text}</a>,
  },
  {
    title: "Text",
    dataIndex: "text",
    key: "text",
    render: (text: any) =>
      text.split(" ").map((item) => (
        <div style={{ marginRight: "5px", display: "flex" }}>
          {item.split("").map((value) => (
            <span>{value}</span>
          ))}
        </div>
      )),
  },
];
