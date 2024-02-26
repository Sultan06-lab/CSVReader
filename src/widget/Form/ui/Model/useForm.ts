import { UploadFile } from "antd";
import Papa from "papaparse";
import { useState } from "react";


export const useForm = () => {
    const [data, setData] = useState<string[][]>();
    const [emptyArray, setEmptyArray] = useState<string[][]>([[]]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);



    const transformData = (data: any) => {
    return data.map((item: string[], index: number) => (
        item.map(el => ({id: index+1, text: el}))[0]
    ))
    };
    const normFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
  
    const parsing = (file: any) => {
      Papa.parse(file, {
        delimiter: "\\n",
        complete: function (results) {
          setData(transformData(results.data));
          setEmptyArray(Array.from({ length: results.data.length }, () => []));
        },
      });
    };
  
    const onSaveClick = () => {
      const blobContent = emptyArray.map((item) => item.join("|")).join("\n");
      const blob = new Blob([blobContent], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "NewFile.csv";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    };

    const clearData = ()=> {
        setData([]);
        setEmptyArray([]);
        setFileList([]);
    }
     
    return {
        data,
        normFile,
        transformData,
        onSaveClick,
        parsing,
        emptyArray,
        setEmptyArray, 
        clearData,
        fileList,
        setFileList,
    }
}