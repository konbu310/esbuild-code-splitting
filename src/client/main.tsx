import React, { FC, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { read, utils } from "xlsx";

interface President {
  Name: string;
  Index: number;
}

const App: FC<{}> = ({}) => {
  const [pres, setPres] = useState<President[]>([]);

  useEffect(() => {
    (async () => {
      const f = await (
        await fetch("https://sheetjs.com/pres.xlsx")
      ).arrayBuffer();
      const wb = read(f);
      const sheetName = wb.SheetNames[0];
      if (!sheetName) throw new Error("Sheet name not found");
      const ws = wb.Sheets[sheetName];
      if (!ws) throw new Error("Worksheet not found");
      const data: President[] = utils.sheet_to_json<President>(ws); // generate objects
      setPres(data);
    })();
  }, []);

  return <div>{JSON.stringify(pres)}</div>;
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
