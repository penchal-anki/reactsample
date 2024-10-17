"use client";

import React, { use, useEffect, useState } from "react";
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  ChevronCell,
  CellTemplates,
} from "@silevis/reactgrid";
import "./financeStyles.css";
import {
  PiArrowLeft,
  PiBrowser,
  PiChatCircleText,
  PiChatDots,
  PiChatsCircleBold,
  PiChatsCircleFill,
  PiChatsDuotone,
  PiClockCounterClockwise,
  PiClockDuotone,
  PiClockLight,
  PiCopy,
  PiDownload,
  PiLink,
  PiMagnifyingGlass,
  PiPresentationChart,
  PiPresentationChartLight,
  PiShareFat,
  PiSquareHalfFill,
  PiTable,
  PiTableFill,
} from "react-icons/pi";
import DateFiled from "@/components/controlled-table/date-field";
import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { ChevronCellSample } from "./samples/samples";
import { Input, Tooltip } from "rizzui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SimpleLineChart from "../shared/chart-widgets/simple-line-chart";
import CustomizedDotLineChart from "../shared/chart-widgets/customized-dot-line-chart";
import SimpleBarChart from "../shared/chart-widgets/simple-bar-chart";
import MixBarChart from "../shared/chart-widgets/mix-bar-chart";
import rightIcon from "@public/manage/rightArrow.png";
import homeIcon from "@public/manage/homeIcon.png";
import cloclIcon from "@public/manage/clock.png";
import Image from "next/image";
import SimpleAreaChart from "../shared/chart-widgets/simple-area-chart";
import { useAppContext } from "../root-lib";

// export * from './stickySample/StickySample';
// export * from './resizeColumnSample/ResizeColumnSample';
// export * from './columnReorderSample/ColumnReorderSample';
// export * from './cryptocurrencyMarketSample/CryptocurrencyMarketSample';
// export * from './chevronCellSample/ChevronCellSample';
// export * from './contextMenuSample/ContextMenuSample';
// export * from './gettingStartedSample/GettingStartedSample';
// export * from './newCellTemplateSample/FlagCellTemplateSample';
// export * from './customStyling/CustomStylingSample';
// export * from './highlightsSample/HighlightsSample';
// export * from './advancedContextMenuHandling/AdvancedContextMenuHandlingSample';
// export * from './simpleContextMenuHandling/SimpleContextMenuHandlingSample';
// export * from './stickyPanesSample/StickyPanesSample';
// export * from './columnsAndRowsReorder/ColumnsAndRowsReorderSample';
// export * from './columnResizing/ColumnResizingSample';
// export * from './handlingChangesSample/HandlingChangesSample';
// export * from './limitedHeightByParentSample/LimitedHeightByParentSample';
// export * from './notLimitedHeightByParentSample/NotLimitedHeightByParentSample';
// export * from './groupIdSample/GroupIdSample';

// Custom Flag Cell Template
const FlagCellTemplate = {
  getCompatibleCell(cell: any) {
    return { ...cell, type: "flag" };
  },
  render(cell: any) {
    const flag = cell.text === "US" ? "🇺🇸" : cell.text === "UK" ? "🇬🇧" : "🏳️";
    return <div className="flag-cell">{flag}</div>;
  },
  isFocusable: true,
};

// Custom Dropdown Number Cell Template
const DropdownNumberCellTemplate = {
  getCompatibleCell(cell: any) {
    return {
      ...cell,
      type: "dropdownNumber",
      text: cell.text || "Select a number",
    };
  },
  render(cell: any, onChange: any) {
    return (
      <select
        value={cell.text}
        onChange={(e) => onChange({ ...cell, text: e.target.value })}
        className="dropdown-cell"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    );
  },
  isFocusable: true,
};

const getPeople = () => [
  {
    name: "Thomas",
    surname: "Goldman",
    jan: "-",
    feb: "-",
    mar: "-",
    apr: "-",
    may: "-",
    jun: "-",
    jul: "-",
    aug: "-",
    sep: "-",
    oct: "-",
    nov: "-",
    dec: "-",
    expanded: true,
    children: [
      {
        name: "Child1",
        surname: "Goldman",
        jan: "-",
        feb: "-",
        mar: "-",
        apr: "-",
        may: "-",
        jun: "-",
        jul: "-",
        aug: "-",
        sep: "-",
        oct: "-",
        nov: "-",
        dec: "-",
      },
      //   { name: "Child2", surname: "Goldman", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-" }
    ],
  },
  //   { name: "Susie", surname: "Quattro", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-", expanded: false, children: [] },
  //   { name: "", surname: "", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-", expanded: false, children: [] }
];

const getColumns = () => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
  { columnId: "oct", width: 100 },
  { columnId: "nov", width: 100 },
  { columnId: "dec", width: 100 },
  { columnId: "jan", width: 100 },
  { columnId: "feb", width: 100 },
  { columnId: "mar", width: 100 },
  { columnId: "apr", width: 100 },
  { columnId: "may", width: 100 },
  { columnId: "jun", width: 100 },
  { columnId: "jul", width: 100 },
  { columnId: "aug", width: 100 },
  { columnId: "sep", width: 100 },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
    { type: "header", text: "Oct" },
    { type: "header", text: "Nov" },
    { type: "header", text: "Dec" },
    { type: "header", text: "Jan" },
    { type: "header", text: "Feb" },
    { type: "header", text: "Mar" },
    { type: "header", text: "Apr" },
    { type: "header", text: "May" },
    { type: "header", text: "Jun" },
    { type: "header", text: "Jul" },
    { type: "header", text: "Aug" },
    { type: "header", text: "Sep" },
  ],
};

const getRows = (people: any) => {
  const rows: any = [headerRow];
  people.forEach((person: any, idx: any) => {
    rows.push({
      rowId: idx,
      cells: [
        { type: "text", text: person.name, isExpanded: person.expanded },
        { type: "text", text: person.surname },
        { type: "text", text: person.jan },
        { type: "text", text: person.feb },
        { type: "text", text: person.mar },
        { type: "text", text: person.apr },
        { type: "text", text: person.may },
        { type: "text", text: person.jun },
        { type: "text", text: person.jul },
        { type: "text", text: person.aug },
        { type: "text", text: person.sep },
        { type: "text", text: person.oct },
        { type: "text", text: person.nov },
        { type: "text", text: person.dec },
      ],
    });
    if (person.expanded && person.children.length > 0) {
      person.children.forEach((child: any, childIdx: any) => {
        rows.push({
          rowId: `${idx}-${childIdx}`,
          cells: [
            { type: "text", text: child.name },
            { type: "text", text: child.surname },
            { type: "text", text: child.jan },
            { type: "text", text: child.feb },
            { type: "text", text: child.mar },
            { type: "text", text: child.apr },
            { type: "text", text: child.may },
            { type: "text", text: child.jun },
            { type: "text", text: child.jul },
            { type: "text", text: child.aug },
            { type: "text", text: child.sep },
            { type: "text", text: child.oct },
            { type: "text", text: child.nov },
            { type: "text", text: child.dec },
          ],
        });
      });
    }
  });
  return rows;
};

const applyChangesToPeople = (changes: any, prevPeople: any) => {
  changes.forEach((change: any) => {
    if (change.newCell.type === "text") {
      const [personIndex, childIndex] = change.rowId
        .toString()
        .split("-")
        .map(Number);
      if (childIndex !== undefined) {
        prevPeople[personIndex].children[childIndex][change.columnId] =
          change.newCell.text;
      } else {
        prevPeople[personIndex][change.columnId] = change.newCell.text;
      }
    }
  });
  return [...prevPeople];
};

const height = 40;

// >>>>>>>>>

export const rowsList = (monthsList: any) => {
  const monthsCount = monthsList?.length || 12;

  const cellsByMonth = Array.from({ length: monthsCount }).map(() => {
    return { type: "text", text: "-" };
  });

  const seventyFiveRows = Array.from({ length: 75 }).map((i: any, index) => {
    const rowString = index + 1;
    return {
      rowId: Number(rowString),
      height,
      reorderable: true,
      cells: [{ type: "chevron", text: "", isExpanded: true }, ...cellsByMonth],
    };
  });
  return seventyFiveRows;
};

const generateHeaderColumns = (monthsList: any) => {
  const defaultMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthInfo = monthsList.length > 0 ? monthsList : defaultMonths;

  const headerCellByMonth = monthInfo.map((month: any) => {
    return { type: "header", text: month };
  });

  const headerCell = {
    rowId: "header",
    reorderable: false,
    height,
    cells: [
      { type: "header", text: `Labels` },
      { type: "header", text: `Formula` },
      ...headerCellByMonth,
    ],
  };
  return headerCell;
};

// >>>>>>>>>>

const FinancePlan = ({ searchParams }: any) => {
  const { appContextData, setAppContextData }: any = useAppContext();
  const [modelName, setModelName] = useState("");

  const [people, setPeople] = React.useState(getPeople());
  const [columns] = React.useState(getColumns());
  const [selectedModelInfo, setSelectedModelInfo] = useState<any>({});
  const { modelId } = searchParams;
  const [monthsList, setMonthsList] = useState<any>([]);

  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  useEffect(() => {
    const modelsListInfo = appContextData.modelsListInfo;
    if (modelsListInfo?.length > 0) {
      const model = modelsListInfo.find((model: any) => model.id === modelId);
      setModelName(model.modelName);
      setSelectedModelInfo(model);
    }
  }, [searchParams]);

  const rows: any = getRows(people);

  const handleChanges = (changes: any) => {
    console.log(">>>>>>>>>>>>>>>", changes);
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  const handleContextMenu = (
    selectedRowIds: any,
    selectedColIds: any,
    selectionMode: any,
    menuOptions: any
  ) => {
    if (selectionMode === "row") {
      menuOptions = [
        ...menuOptions,
        {
          id: "removePerson",
          label: "Remove person",
          handler: () => {
            setPeople((prevPeople) => {
              return [
                ...prevPeople.filter(
                  (person, idx) => !selectedRowIds.includes(idx)
                ),
              ];
            });
          },
        },
      ];
    }
    return menuOptions;
  };

  const handleDataRange = ({ fromDate, toDate }: any) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const months = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    while (start <= end) {
      const month = monthNames[start.getMonth()];
      const year = start.getFullYear().toString().slice(-2);
      months.push(`${month} '${year}`);
      start.setMonth(start.getMonth() + 1);
    }
    setMonthsList(months);
    return months;
  };

  const [isSpreadsheet, setIsSpreadsheet] = React.useState(true);
  const headerRowGenerated = generateHeaderColumns(monthsList);
  const rowsGenerated = rowsList(monthsList);

  return (
    <div className="px-2">
      <div className="flex items-center h-[72px]">
        {/* <div className='flex cursor-pointer mr-4'
                    onClick={() => window.history.back()}
                >
                    <PiArrowLeft className='h-6 w-6 text-primary' />
                </div> */}
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <Image src={homeIcon} alt="logo" className="w-4 h-4" />
            <Image src={rightIcon} alt="logo" className="w-[8px] mx-4" />
            <Link href="/models">
              <div className="text-md font-medium text-gray-400 hover:text-[#669F2A]">
                Models
              </div>
            </Link>
            <Image src={rightIcon} alt="logo" className="w-[8px] mx-4" />
            <div className="text-md font-medium mr-12 text-[#669F2A]">
              {modelName}
            </div>
            {/* <div className='flex items-center text-gray-400'>
                            <PiClockLight className='h-6 w-6 text-gray-400' />
                            <div className='text-md font-medium ml-2'>Monthly,</div>
                            <div className='text-md font-medium ml-2'>Jan '24 - Dec '24 </div>
                        </div> */}
            {/* <Link href='/models' className='flex items-center ml-12'>
                            <PiLink className='h-6 w-6 text-gray-400' />
                            <div className='text-gray-400 font-medium'>Models</div>
                        </Link> */}
          </div>
          {/* 
                    <div className='flex items-center -ml-64'>
                        <div
                            className={`py-0.5 px-2 flex items-center rounded-md text-white cursor-pointer ${isSpreadsheet ? 'bg-[#669F2A]' : 'bg-gray-300'}`}
                            onClick={() => setIsSpreadsheet(true)}
                        >
                            <PiTable className='h-6 w-6 text-white mr-2' />
                            Spreadsheet</div>
                        <div
                            className={`py-0.5 px-2 ml-4 flex items-center rounded-md text-white cursor-pointer ${isSpreadsheet ? 'bg-gray-300' : 'bg-[#669F2A]'}`}
                            onClick={() => setIsSpreadsheet(false)}
                        >
                            <PiBrowser className='h-6 w-6 text-white mr-2' />
                            Dashboard</div>
                    </div> */}
          <div className="flex items-center">
            <div className="flex items-center text-gray-400">
              <Image
                src={cloclIcon}
                className="h-4 w-4 text-gray-400"
                alt="clock"
              />
              <div className="text-md font-medium mx-2">Monthly,</div>
              <DateFiled
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                className={`w-[128px] ring-gray-0  h-[30px] z-[50] !border-0 outline-none !ring-0 text-md font-medium !px-0 cursor-pointer hover:text-primary`}
                onChange={(date: any) => {
                  console.log("date>>>>>>>>>>>>>", date);
                  setStartDate(date[0]);
                  setEndDate(date[1]);
                  if (date[0] && date[1]) {
                    handleDataRange({ fromDate: date[0], toDate: date[1] });
                  }
                }}
                placeholderText="Date range"
                inputProps={{
                  inputClassName:
                    "h-[32px] ring-gray-0 z-[50] !border-0 !ring-0 !px-0 cursor-pointer",
                }}
                maxDate={new Date()}
                calendarClassName="z-50"
                showYearDropdown
                scrollableYearDropdown
              />{" "}
            </div>
            {/* <PiSquareHalfFill className='h-6 w-6 text-gray-400 mr-4' /> */}
            <div className="border-r-2 h-[26px] ml-4"></div>
            <Tooltip
              size="sm"
              content={"Export"}
              placement="left-start"
              color="invert"
              className="bg-white cursor-pointer z-[50]"
              showArrow={false}
            >
              <button>
                <PiDownload className="h-6 w-6 text-gray-400 ml-4 cursor-pointer" />
              </button>
            </Tooltip>
            <Tooltip
              size="sm"
              content={"Comments"}
              placement="left-start"
              color="invert"
              className="bg-white cursor-pointer z-[50]"
              showArrow={false}
            >
              <button>
                <PiChatCircleText className="h-6 w-6 text-gray-400 ml-4" />
              </button>
            </Tooltip>
            <Tooltip
              size="sm"
              content={"Clone"}
              placement="left-start"
              color="invert"
              className="bg-white cursor-pointer z-[50]"
              showArrow={false}
            >
              <button>
                <PiCopy className="h-6 w-6 text-gray-400 ml-4" />
              </button>
            </Tooltip>

            {/* <PiClockCounterClockwise  className='h-6 w-6 text-gray-400 ml-4' /> */}
            {/* <PiCopy className='h-6 w-6 text-gray-400 ml-4' /> */}
            <div className="border-r-2 h-[26px] mx-4"></div>

            <div className="flex items-center">
              <Tooltip
                size="sm"
                content={"Table"}
                placement="left-start"
                color="invert"
                className="bg-white cursor-pointer z-[50]"
                showArrow={false}
              >
                <button>
                  <PiTable
                    className={`h-6 w-6 mr-2 ${
                      isSpreadsheet ? "text-[#669F2A]" : "text-gray-400"
                    }`}
                    onClick={() => setIsSpreadsheet(true)}
                  />
                </button>
              </Tooltip>
              <Tooltip
                size="sm"
                content={"Dashboard"}
                placement="left-start"
                color="invert"
                className="bg-white cursor-pointer z-[50]"
                showArrow={false}
              >
                <button>
                  <PiPresentationChart
                    className={`h-6 w-6 ${
                      isSpreadsheet ? "text-gray-400" : "text-[#669F2A]"
                    }`}
                    onClick={() => setIsSpreadsheet(false)}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex items-center border-t-2'>
            
            </div> */}
      {/* <div className='flex'>
                <ReactGrid
                    rows={rows}
                    columns={columns}
                    onCellsChanged={handleChanges}
                    onContextMenu={handleContextMenu}
                    selectionMode="cell"
                    enableRowSelection
                    enableColumnSelection
                    enableRangeSelection
                    onCellClick={(cell: any, rowId: any) => {
                        if (cell.type === 'chevron') {
                            toggleExpand(rowId);
                        }
                    }}
                    customCellTemplates={{ flag: FlagCellTemplate, dropdownNumber: DropdownNumberCellTemplate }}
                />
            </div> */}

      {/* <button onClick={addRow}>Add Row</button> */}

      {/* <StickySample /> */}
      {/* <ResizeColumnSample /> */}
      {/* <ColumnReorderSample /> */}
      {/* <CryptocurrencyMarketSample /> */}

      {isSpreadsheet ? (
        modelId && (
          <ChevronCellSample
            modelId={modelId}
            selectedModelInfo={selectedModelInfo}
            headerRow={headerRowGenerated}
            rowsGenerated={rowsGenerated}
            monthsList={monthsList}
          />
        )
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8 p-6">
          <SimpleAreaChart />
          <SimpleBarChart />
        </div>
      )}

      {/* <ContextMenuSample /> */}
      {/* <GettingStartedSample />
            <FlagCellTemplateSample />
            <CustomStylingSample />
            <HighlightsSample />
            <AdvancedContextMenuHandlingSample />
            <SimpleContextMenuHandlingSample />
            <StickyPanesSample />
            <ColumnsAndRowsReorderSample />
            <ColumnResizingSample />
            <HandlingChangesSample /> */}
      {/* <LimitedHeightByParentSample />
            <NotLimitedHeightByParentSample /> */}
      {/* <GroupIdSample /> */}
    </div>
  );
};

export default FinancePlan;
