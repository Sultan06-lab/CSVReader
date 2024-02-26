import { Table as AntdTable } from "antd";
import { Dispatch, SetStateAction } from "react";
import { columns } from "../config/TableConfig";

interface TableFuntionProps {
  emptyArray: string[][];
  data: string[][];
  setEmptyArray: Dispatch<SetStateAction<string[][]>>;
}

export const Table = (props: TableFuntionProps) => {
  const { emptyArray, data, setEmptyArray } = props;

  function onClickWord(e: any, index: number) {
    console.log(e.target.parentNode.children);
    if (e.target.parentNode.parentNode.tagName !== "TD") {
      return;
    }

    const word = e.target.parentNode.innerText.replace(/[\n,\!\?:'"\s]/g, "");
    const newArray = emptyArray;
    const childrens = Array.from(e.target.parentNode.children);
    childrens.forEach((element) => {
      if (!".,?!".includes((element as HTMLSpanElement).innerText)) {
        (element as HTMLSpanElement).classList.toggle("redWord");
      }
    });
    const filteredChildrens = childrens.filter(
      (item) => !".,?!".includes((item as HTMLSpanElement).innerText)
    );

    (filteredChildrens[0] as HTMLElement).style.borderTopLeftRadius = "7px";
    (filteredChildrens[0] as HTMLElement).style.borderBottomLeftRadius = "7px";
    (
      filteredChildrens[filteredChildrens.length - 1] as HTMLElement
    ).style.borderTopRightRadius = "7px";

    (
      filteredChildrens[filteredChildrens.length - 1] as HTMLElement
    ).style.borderBottomRightRadius = "7px";

    newArray[index].includes(word)
      ? (newArray[index] = newArray[index].filter((item) => item !== word))
      : newArray[index].push(word);
    setEmptyArray([...newArray]);
  }

  return (
    <AntdTable
      onRow={(_, index) => {
        return {
          onClick: (event) => onClickWord(event, index),
        };
      }}
      style={{ width: "600px" }}
      columns={columns}
      dataSource={data}
      size={"middle"}
    />
  );
};
