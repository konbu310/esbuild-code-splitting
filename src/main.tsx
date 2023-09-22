import React, { FC, useState } from "react";
import { createRoot } from "react-dom/client";

interface President {
  Name: string;
  Index: number;
}

const App: FC<{}> = ({}) => {
  const [pres, setPres] = useState<President[]>([]);

  const readBufferAsExcel = async (buf: ArrayBuffer) => {
    const { read, utils } = await import("./SheetJSWrapper");
    const wb = read(buf);
    const sheetName = wb.SheetNames[0];
    if (!sheetName) throw new Error("Sheet name not found");
    const ws = wb.Sheets[sheetName];
    if (!ws) throw new Error("Worksheet not found");
    const data: President[] = utils.sheet_to_json<President>(ws); // generate objects
    setPres(data);
  };

  const handleClick = async () => {
    const res = await fetch("https://sheetjs.com/pres.xlsx");
    const buf = await res.arrayBuffer();
    await readBufferAsExcel(buf);
  };

  return (
    <div>
      <button onClick={handleClick}>load</button>
      <div>
        {pres.length <= 0 ? "Press load button!" : JSON.stringify(pres)}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
