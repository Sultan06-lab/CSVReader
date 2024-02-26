export const onSaveClick = (array: string[][] | string[]) => {
    const blobContent = array.map((item) => item.join("|")).join("\n");
    const blob = new Blob([blobContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NewFile.csv";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };
