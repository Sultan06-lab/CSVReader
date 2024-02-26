import { Button, Form as FormAntd, Space, Upload } from "antd";
import { Table } from "../../Table/ui/Table";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "./Model/useForm";
import { onSaveClick } from "../../../shared/lib/saveFile";

export const Form = () => {
  const {
    data,
    emptyArray,
    fileList,
    setEmptyArray,
    normFile,
    parsing,
    clearData,
    setFileList,
  } = useForm();
  console.log(emptyArray);
  return (
    <div>
      <FormAntd
        layout="inline"
        className="form"
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "616px",
          marginBottom: "10px",
        }}
      >
        <FormAntd.Item
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{}}
        >
          <Space></Space>
          <Upload
            accept=".csv"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            beforeUpload={(file) => {
              parsing(file);
              setFileList([file]);
            }}
            onRemove={clearData}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>load</Button>
          </Upload>
        </FormAntd.Item>
        <FormAntd.Item>
          <Button
            onClick={() => onSaveClick(emptyArray)}
            type="primary"
            color="red"
            disabled={emptyArray.filter((item) => item.length > 0).length < 1}
          >
            Save
          </Button>
        </FormAntd.Item>
      </FormAntd>
      <Table
        data={data}
        emptyArray={emptyArray}
        setEmptyArray={setEmptyArray}
      />
    </div>
  );
};
