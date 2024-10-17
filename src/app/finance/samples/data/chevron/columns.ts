import { Column } from "@silevis/reactgrid";

export const columns = (
  reorderable: boolean,
  resizable: boolean,
  monthsList:any
): Column[] => {
  const defaultMonths = [
    { columnId: "jan", reorderable, width: 125 },
    { columnId: "feb", reorderable, width: 125 },
    { columnId: "mar", reorderable, width: 125 },
    { columnId: "apr", reorderable, width: 125 },
    { columnId: "may", reorderable, width: 125 },
    { columnId: "jun", reorderable, width: 125 },
    { columnId: "jul", reorderable, width: 125 },
    { columnId: "aug", reorderable, width: 125 },
    { columnId: "sep", reorderable, width: 125 },
    { columnId: "oct", reorderable, width: 125 },
    { columnId: "nov", reorderable, width: 125 },
    { columnId: "dec", reorderable, width: 125 },
  ];

console.log(">>>useEffect>>monthsList> in gsgFASTas>>",monthsList)


  const monthsColumns =
    (monthsList.length > 0 &&
      monthsList.map((month: any) => {
        return { columnId: month, reorderable, resizable, width: 125 };
      })) ||
    defaultMonths;

    console.log(">>>useEffect>>monthsColumns> in gsgFASTas>>",monthsColumns)





  return [
    { columnId: "id", reorderable, resizable, width: 250 },
    { columnId: "Formula", reorderable, resizable, width: 250 },
    ...monthsColumns,
  ];
};
