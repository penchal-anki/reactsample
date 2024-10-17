"use client";
import { useEffect, useState } from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { PiPlus } from "react-icons/pi";
import "./styling.scss";
import { useAppContext } from "@/app/root-lib";
import { setContextApiData } from "@/utils/form-utils";

const getPeople = (): any => [
  { name: "Thomas" },
  { name: "Susie" },
  { name: "" },
];

const getColumns = (): Column[] => [{ columnId: "name", width: 384 }];

const headerRow: Row = {
  rowId: "header",
  height: 40,
  cells: [{ type: "header", text: "Name" }],
};

const getRows = (people: any): Row[] => [
  // headerRow,
  ...people?.map((person: { name: any; surname: any }, idx: any) => ({
    rowId: idx,
    height: 40,
    cells: [{ type: "text", text: person.name }],
  })),
];

const applyChangesToPeople = (changes: any, prevPeople: any): any => {
  changes.forEach((change: any) => {
    if (change.newCell.type === "text") {
      const personIndex = change.rowId;
      const fieldName = change.columnId;
      prevPeople[personIndex][fieldName] = change.newCell.text;
    }
  });

  console.log(">>>>>>prevPeople", prevPeople);
  return [...prevPeople];
};

const GettingStartedSample = ({ selectedRecord, listRows }: any) => {
  const { appContextData, setAppContextData }: any = useAppContext();
  console.log(">>>>>>>appContextData", appContextData);

  const [people, setPeople] = useState<any>(listRows || []);
  console.log(">>>>>>>selectedRecord", selectedRecord);
  const rows = getRows(people);
  const columns = getColumns();

  const handleChanges = (changes: any) => {
    setPeople((prevPeople: any) => {
      const totalPeople = applyChangesToPeople(changes, prevPeople);

      const updatedCategoryList = appContextData?.categoryListInfo?.map(
        (item: any) => {
          if (item.id === selectedRecord.id) {
            item.categoryListValues = totalPeople;
          }
          return item;
        }
      );

      console.log(">>>>>>>updatedCategoryList",updatedCategoryList)

        setContextApiData(setAppContextData, {
            categoryListInfo: updatedCategoryList,
        });

      return totalPeople;
    });
  };

  const addRow = () => {
    const newPeople = [...people];
    newPeople.push({ name: "", surname: "" });
    setPeople(newPeople);
  };

  return (
    <div id="reactgrid-primary">
      <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
      <div className="flex justify-start w-[120px] mt-4 items-center cursor-pointer">
        <PiPlus className="h-6 w-6 text-[#335015]" onClick={addRow} />
        <div onClick={addRow} className="text-[#335015] ml-2 font-medium">
          Add Item
        </div>
      </div>
    </div>
  );
};

export default GettingStartedSample;
