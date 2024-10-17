"use client";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { columns as dataColumns } from "../../data/chevron/columns";
import { rows as dataRows } from "../../data/chevron/rows";
import {
  CellChange,
  Column,
  ChevronCell,
  ReactGrid,
  Row,
  Id,
  DropPosition,
  MenuOption,
} from "@silevis/reactgrid";
import "./styling.scss";
import { Button } from "@/components/ui/button";
import { PiPlus } from "react-icons/pi";
import { ChevronCellTemplate } from "./CustomChevron";
import { useAppContext } from "@/app/root-lib";
import { setContextApiData } from "@/utils/form-utils";

const ReactGridContainer = styled.div`
  overflow: auto;
`;

interface ChevronTestGridStateData {
  columns: Column[];
  rows: Row[];
}

const findParentRow = (rows: Row[], row: Row) =>
  rows.find((r) => {
    const foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
  });

const findChevronCell = (row: Row) =>
  row.cells.find((cell) => cell.type === "chevron") as ChevronCell | undefined;

const hasChildren = (rows: Row[], row: Row): boolean =>
  rows.some((r) => {
    const foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
  });

const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
  const parentRow = findParentRow(rows, row);
  if (parentRow) {
    const foundChevronCell = findChevronCell(parentRow);
    if (foundChevronCell && !foundChevronCell.isExpanded) return false;
    return isRowFullyExpanded(rows, parentRow);
  }
  return true;
};

const getExpandedRows = (rows: Row[]): Row[] =>
  rows?.filter((row) => {
    const areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
  });

const getDirectChildRows = (rows: Row[], parentRow: Row): Row[] =>
  rows.filter(
    (row) =>
      !!row.cells.find(
        (cell) => cell.type === "chevron" && cell.parentId === parentRow.rowId
      )
  );

const assignIndentAndHasChildren = (
  rows: Row[],
  parentRow: Row,
  indent: number = 0
) => {
  ++indent;
  getDirectChildRows(rows, parentRow).forEach((row) => {
    const foundChevronCell = findChevronCell(row);
    const hasRowChildrens = hasChildren(rows, row);
    if (foundChevronCell) {
      foundChevronCell.indent = indent;
      foundChevronCell.hasChildren = hasRowChildrens;
    }
    if (hasRowChildrens) assignIndentAndHasChildren(rows, row, indent);
  });
};

const buildTree = (rows: Row[]): Row[] =>
  rows.map((row) => {
    const foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
      const hasRowChildrens = hasChildren(rows, row);
      foundChevronCell.hasChildren = hasRowChildrens;
      if (hasRowChildrens) assignIndentAndHasChildren(rows, row);
    }
    return row;
  });

export const ChevronCellSample = ({
  modelId,
  selectedModelInfo,
  headerRow,
  monthsList,
  rowsGenerated,
}: any) => {
  console.log(">>>>>>>>>>>>>>>monthsList>", monthsList);

  const { appContextData, setAppContextData }: any = useAppContext();

  const [state, setState] = useState<ChevronTestGridStateData>(() => {
    const columns = [...dataColumns(true, false, monthsList)];
    return { columns, rows: buildTree([...dataRows(monthsList)]) };
  });

  const [rowsToRender, setRowsToRender] = useState<Row[]>([
    headerRow,
    ...getExpandedRows(state.rows),
  ]);

  useEffect(() => {
    const columnsInfo = [...dataColumns(true, false, monthsList)];
    console.log(">>>>>>>>useEffect>>>>>>>columns>", columnsInfo);
    const rowsInfo: any = [...dataRows(monthsList)];
    setState({
      columns: columnsInfo,
      rows: rowsInfo,
    });

    setRowsToRender([headerRow, ...getExpandedRows(rowsInfo)]);
  }, [monthsList]);

  const [isCellUpdating, setIsCellUpdating] = useState(false);

  console.log("setRowsToRender>>useEffect>>>>>>>", rowsToRender);

  console.log(">>>>>>>>useEffect>>>>>>state>", state);

  console.log(">>>>>>>>>>>>>>>rowsToRender>", rowsToRender);

  useEffect(() => {
    if (selectedModelInfo?.tableInfo && !isCellUpdating) {
      setState(selectedModelInfo?.tableInfo);
      setRowsToRender([headerRow, ...selectedModelInfo?.tableInfo?.rows]);
    }
  }, [selectedModelInfo?.tableInfo]);

  const handleChanges = (changes: CellChange[]) => {
    const newState = { ...state };
    changes.forEach((change) => {
      const changeRowIdx = newState.rows.findIndex(
        (el) => el.rowId === change.rowId
      );
      const changeColumnIdx = newState.columns.findIndex(
        (el) => el.columnId === change.columnId
      );
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    });

    const tableInfo = { ...state, rows: buildTree(newState.rows) };
    console.log("setState>>>>>>>>>", {
      ...state,
      rows: buildTree(newState.rows),
    });

    setState({ ...state, rows: buildTree(newState.rows) });
    setRowsToRender([headerRow, ...getExpandedRows(newState.rows)]);

    if (selectedModelInfo?.id) {
      const updatedModelListWithTable = appContextData?.modelsListInfo?.map(
        (model: any) => {
          if (model.id === modelId) {
            model.tableInfo = tableInfo;
          }
          return model;
        }
      );
      setIsCellUpdating(true);
      console.log(
        "updatedModelListWithTable>>>>>>>>>",
        updatedModelListWithTable
      );
      setContextApiData(setAppContextData, {
        modelsListInfo: updatedModelListWithTable,
      });
    }
  };

  const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements: T[] = arr.filter((_: T, idx: number) =>
      idxs.includes(idx)
    );
    to =
      Math.min(...idxs) < to
        ? (to += 1)
        : (to -= idxs.filter((idx) => idx < to).length);
    const leftSide: T[] = arr.filter(
      (_: T, idx: number) => idx < to && !idxs.includes(idx)
    );
    const rightSide: T[] = arr.filter(
      (_: T, idx: number) => idx >= to && !idxs.includes(idx)
    );
    return [...leftSide, ...movedElements, ...rightSide];
  };

  const handleRowsReorder = (
    targetRowId: Id,
    rowIds: Id[],
    dropPosition: DropPosition
  ) => {
    const newState = { ...state };
    let to = newState.rows.findIndex((row) => row.rowId === targetRowId);
    let rowIdxs = rowIds.map((id) =>
      state.rows.findIndex((r) => r.rowId === id)
    );

    if (rowIdxs.length === 1) {
      const row = newState.rows[rowIdxs[0]];
      rowIdxs = [row, ...new Set(getRowChildren(newState.rows, [], row))].map(
        (item) => newState.rows.findIndex((r) => r.rowId === item.rowId)
      );

      const onRow = newState.rows.find((row) => row.rowId === targetRowId);
      if (onRow) {
        const movingRowRoot = findChevronCell(row);
        if (movingRowRoot) {
          if (dropPosition === "on") {
            movingRowRoot.parentId = onRow.rowId;
            const onRowIndex = newState.rows.indexOf(onRow);
            const rowIndex = newState.rows.indexOf(row);
            if (rowIndex >= onRowIndex) {
              to += 1;
            }
          } else {
            const parentRow = findParentRow(newState.rows, onRow);
            if (dropPosition === "after") {
              movingRowRoot.parentId = onRow.rowId;
              console.log("after");
            }
            if (parentRow) {
              movingRowRoot.parentId = parentRow.rowId;
              console.log("parentRow");
              if (dropPosition === "after") {
                movingRowRoot.parentId = onRow.rowId;
              }
            } else {
              if (dropPosition === "before") {
                console.log("before");
                movingRowRoot.parentId = undefined;
                movingRowRoot.indent = undefined;
              }
            }
          }
        }
      }
    }

    const reorderedRows = reorderArray(newState.rows, rowIdxs, to);

    setState({ ...newState, rows: buildTree(reorderedRows) });
    setRowsToRender([headerRow, ...getExpandedRows(reorderedRows)]);
  };

  const getRowChildren = (rows: Row[], acc: Row[], row: Row) => {
    const rowsChildren = getDirectChildRows(rows, row);
    if (!rowsChildren) return [];

    rowsChildren.forEach((childRow) => {
      acc = [...acc, ...getRowChildren(rows, rowsChildren, childRow)];
    });
    return acc;
  };

  const handleCanReorderRows = (
    targetRowId: Id,
    rowIds: Id[],
    dropPosition: DropPosition
  ): boolean => {
    const newState = { ...state };
    let rowIdxs = rowIds.map((id) =>
      newState.rows.findIndex((row) => row.rowId === id)
    );
    if (rowIdxs.length === 1 && targetRowId !== headerRow.rowId) {
      const row = newState.rows[rowIdxs[0]];
      const rowChildren = [...new Set(getRowChildren(newState.rows, [], row))];
      if (rowChildren.some((item) => item.rowId === targetRowId)) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };

  const addRow = () => {
    const newState = { ...state };
    const newRow = {
      rowId: newState.rows.length + 1,
      height: 40,
      reorderable: true,
      cells: [
        { type: "chevron", text: ``, isExpanded: false, parentId: 6 },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
      ],
    };
    newState.rows = [...newState.rows, newRow];
    setState({ ...newState });
    setRowsToRender([headerRow, ...getExpandedRows(newState.rows)]);
  };

  const handleContextMenu = (
    selectedRowIds: Id[],
    selectedColIds: Id[],
    selectionMode: any,
    menuOptions: MenuOption[]
  ): MenuOption[] => {
    // Insert row
    // Insert child row
    // Delete row
    // Clear

    if (selectionMode === "row") {
      menuOptions = [
        ...menuOptions,
        {
          id: "insertRow",
          label: "Insert row",
          handler: () => {
            addRow();
          },
        },
      ];
    }

    if (selectionMode === "row") {
      menuOptions = [
        ...menuOptions,
        {
          id: "insertChildRow",
          label: "Insert child row",
          handler: () => {
            const newState = { ...state };
            const newRow = {
              rowId: newState.rows.length + 1,
              height: 40,
              reorderable: true,
              cells: [
                {
                  type: "chevron",
                  text: ``,
                  isExpanded: false,
                  parentId: selectedRowIds[0],
                },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "text", text: "" },
              ],
            };
            newState.rows = [...newState.rows, newRow];
            setState({ ...newState });
            setRowsToRender([headerRow, ...getExpandedRows(newState.rows)]);
          },
        },
      ];
    }

    if (selectionMode === "row") {
      menuOptions = [
        ...menuOptions,
        {
          id: "deleteRow",
          label: "Delete row",
          handler: () => {
            const rows = state?.rows?.filter(
              (row) => !selectedRowIds.includes(row.rowId)
            );
            setRowsToRender([headerRow, ...getExpandedRows(rows)]);
            setState({ ...state, rows });
          },
        },
      ];
    }

    if (selectionMode === "row") {
      menuOptions = [
        ...menuOptions,
        {
          id: "setDataType",
          label: "Set data type",
          handler: () => {
            addRow();
          },
        },
      ];
    }
    console.log("menuOptions>>>>>>>>>", menuOptions);

    return menuOptions;
  };

  return (
    <div>
      <ReactGridContainer id="chevron-cell-sample">
        <ReactGrid
          rows={rowsToRender}
          columns={state.columns}
          onCellsChanged={handleChanges}
          onRowsReordered={handleRowsReorder}
          canReorderRows={handleCanReorderRows}
          stickyLeftColumns={2}
          stickyTopRows={1}
          customCellTemplates={{
            chevron: new ChevronCellTemplate(),
          }}
          enableRowSelection
          enableColumnSelection
          enableFillHandle
          enableRangeSelection
          onContextMenu={handleContextMenu}
        />
      </ReactGridContainer>
      {/* <div className='flex justify-start w-[120px] mt-8 items-center cursor-pointer'>
                <PiPlus className='h-6 w-6 text-[#335015]' onClick={addRow} />
                <div
                    onClick={addRow}
                    className="text-[#335015] ml-2 font-medium"
                >Add Row</div>
            </div> */}
    </div>
  );
};
