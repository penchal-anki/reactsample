"use client";

import { Badge, Text, Button } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Popover, Transition } from "@headlessui/react";
import { PiCaretDownBold, PiXBold, PiCheckBold } from "react-icons/pi";
import { Fragment, useState } from "react";
import { useMedia } from "@/hooks/use-media";
import DateFiled from "@/components/controlled-table/date-field";
import { getDateRangeStateValues } from "@/utils/get-formatted-date";
import { formatDateToYYYYMMDD } from "@/utils/format-date";
import StatusField from "@/components/controlled-table/status-field";
import { renderOptionDisplayValue } from "@/components/ui/status-badge";
import { capitalize } from "@/utils/commonFuncations";

const severityOptions = [
  {
    value: "critical",
    label: "Critical",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

const statusOptions = [
  {
    value: "running",
    label: "Running",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

const SelectedBadge = ({ info, updateFilter }: any) => {
  return (
    <div>
      <Badge
        rounded="md"
        color="info"
        className="bg-primary-50 text-primary-700 h-[30px] p-0"
      >
        <div className="pl-2">
          <PiCheckBold className="h-4 w-4" />
        </div>
        <span className="mr-2 capitalize pl-2">{info}</span>
        <div
          className="h-full flex items-center hover:bg-primary-200 rounded-r-md pl-1 pr-2 cursor-pointer"
          onClick={updateFilter}
        >
          <PiXBold className="h-4 w-4" />
        </div>
      </Badge>
    </div>
  );
};

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
  searchTerm?: any;
  handleSearch?: any;
  onFocusInput?: any;
  policyList?: any;
  onBlur?: any;
  setShouldCallBlur?: any;
  handleFilters?: any;
  updatePoliciesList?: any;
  setTableParams?: any;
  useTableParams?: any;
  policyConfigData?: any;
  children?: any;
  modelsInfoList?: any;
  updateDataList?: any;
  modelId?: any;
};
export default function FilterElement({
  updateFilter,
  handleReset,
  filters,
  handleSearch,
  onFocusInput,
  onBlur,
  handleFilters,
  setTableParams,
  useTableParams,
  children,
  modelsInfoList,
  updateDataList,
  modelId,
}: FilterElementProps) {
  const isMediumScreen = useMedia("(max-width: 1860px)", false);
  const [userInput, setUserInput] = useState("");
  const [userTimeoutId, setUserTimeoutId] = useState<number | null>(null);
  const TIME_LIMIT = 500;
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // handleFilters({ key: 'modelName', value: inputValue, isNotAPICall: true })
    setUserInput(inputValue);
    if (userTimeoutId) {
      window.clearTimeout(userTimeoutId);
    }
    // when user types, for every 500ms we are calling the api and updating the results
    setUserTimeoutId(
      window.setTimeout(() => {
        handleSearch(inputValue);
      }, TIME_LIMIT)
    );
  };
  const onFocus = () => {
    onFocusInput?.(userInput);
  };

  const handleOnBlur = () => {
    setUserInput("");
    onBlur();
  };

  const isShowClearButton =
    useTableParams?.name ||
    useTableParams?.status ||
    useTableParams.startDate ||
    useTableParams.endDate ||
    useTableParams?.searchText;

  return (
    <div className="px-6 mt-6 flex gap-3 @[22rem]:flex-row justify-between">
      <div className="flex gap-3">
        {/* we are checking if no model id only show the model search */}
        {!modelId && (
          <>
            {useTableParams?.searchText ? (
              <SelectedBadge
                info={useTableParams?.searchText}
                updateFilter={() => {
                  handleOnBlur();
                  handleFilters({ key: "page", value: 1, isNotAPICall: true });
                  handleFilters({ key: "searchText", value: "" });
                  updateFilter("user", "");
                }}
              />
            ) : (
              <Popover className="relative">
                {/* <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-md h-[30px] px-3 leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"> */}
                <Popover.Button className="flex items-center peer hover:border-primary w-full transition duration-200 ring-gray-300  ring-[0.6px] hover:ring-primary focus:border-primary focus:ring-[0.8px] focus:ring-primary border border-muted ring-muted bg-transparent px-3 py-2 text-sm rounded-md pe-2.5 h-9 min-w-[120px] !h-[30px] !min-w-[120px]">
                  <span className="block w-full truncate text-left rtl:text-right text-muted-foreground pe-2.5">
                    Search by template name
                  </span>
                  <PiCaretDownBold className="h-4 w-4" aria-hidden="true" />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-[160px] z-10 mt-2 flex w-[340px] -translate-x-1/2">
                    <div className="w-[320px] shrink rounded-md bg-white pt-1 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                      <div className="rizzui-input-root flex flex-col w-full border-none !border-0 !ring-0  px-4">
                        <label className="block">
                          <span className="rizzui-input-container flex items-center peer w-full transition duration-200 [&amp;.is-focus]:ring-[0] ring-[0] [&amp;_input::placeholder]:opacity-60 py-2 text-sm h-10 rounded-md border-0 ring-muted bg-transparent">
                            <span className="rizzui-input-prefix whitespace-nowrap leading-normal">
                              <PiMagnifyingGlassBold className="h-4 w-4 text-gray-600" />
                            </span>
                            <input
                              placeholder="Search for interviews..."
                              className="text-sm font-normal text-gray-600 w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 [&amp;::-ms-clear]:hidden [&amp;::-ms-reveal]:hidden [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:m-0 [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;:placeholder-shown~.input-clear-btn]:opacity-0 [&amp;:placeholder-shown~.input-clear-btn]:invisible [&amp;:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&amp;:not(:placeholder-shown)~.input-clear-btn]:visible ps-2.5"
                              type="search"
                              onChange={handleOnInputChange}
                              onFocus={onFocus}
                              autoFocus={true}
                              value={userInput}
                            />
                          </span>
                        </label>
                      </div>

                      {(modelsInfoList.length > 0 &&
                        modelsInfoList?.map((model: any, index: any) => {
                          return (
                            <div
                              onClick={() => {
                                handleFilters({
                                  key: "searchText",
                                  value: model.name,
                                  isNotAPICall: true,
                                });
                                handleFilters({ key: "skip", value: 0 });
                                updateFilter("name", model.name);
                              }}
                              className="flex items-center mb-2 hover:bg-gray-50 px-4 py-1 cursor-pointer"
                              key={index}
                            >
                              <div className="flex flex-col ml-2">
                                <Text className="text-gray-600">
                                  {model.name}
                                </Text>
                              </div>
                            </div>
                          );
                        })) || (
                        <Text className="flex items-center justify-center text-gray-600 py-2">
                          No data found
                        </Text>
                      )}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )}
          </>
        )}

        {useTableParams?.status ? (
          <SelectedBadge
            info={useTableParams.status}
            updateFilter={() => {
              handleFilters({ key: "status", value: "" });
              updateFilter("status", "");
            }}
          />
        ) : (
          <StatusField
            dropdownClassName="!z-10 bg-white"
            optionClassName="hover:bg-gray-50"
            className="rounded-md !w-auto flex items-center"
            selectClassName="!h-[30px] rounded-md min-w-[120px] ring-gray-300"
            options={statusOptions}
            placeholder="Status"
            value={filters["status"]}
            onChange={(value: string) => {
              handleFilters({
                key: "status",
                value: capitalize(value),
                isNotAPICall: true,
              });
              handleFilters({ key: "page", value: 1 });
              updateFilter("status", value);
            }}
            getOptionValue={(option: { value: any }) => option.value}
            getOptionDisplayValue={(option: { label: any }) =>
              renderOptionDisplayValue(option.label as string)
            }
            displayValue={(selected: string) =>
              renderOptionDisplayValue(selected)
            }
          />
        )}

        {useTableParams?.startDate && useTableParams.endDate ? (
          <SelectedBadge
            info={`${useTableParams?.startDate} ${` to `}  ${
              useTableParams.endDate
            }`}
            updateFilter={() => {
              handleFilters({ key: "startDate", value: "" });
              handleFilters({ key: "endDate", value: "" });
              updateFilter("date", "");
            }}
          />
        ) : (
          <DateFiled
            selected={getDateRangeStateValues(filters?.["date"]?.[0])}
            startDate={getDateRangeStateValues(filters?.["date"]?.[0])}
            endDate={getDateRangeStateValues(filters?.["date"]?.[1])}
            className={`w-[120px] ring-gray-300  h-[30px] ${
              (filters?.["date"]?.[0] && "w-[328px]") || ""
            }`}
            onChange={(date: any) => {
              updateFilter("date", date);
              if (date[1]) {
                handleFilters({
                  key: "startDate",
                  value: formatDateToYYYYMMDD(date[0]),
                  isNotAPICall: true,
                });
                handleFilters({
                  key: "endDate",
                  value: formatDateToYYYYMMDD(date[1]),
                  isNotAPICall: true,
                });
                handleFilters({ key: "page", value: 1 });
              }
            }}
            placeholderText="Date range"
            inputProps={{
              inputClassName: "h-[30px] ring-gray-300",
            }}
            maxDate={new Date()}
          />
        )}

        {isShowClearButton ? (
          <Button
            size="sm"
            rounded="pill"
            onClick={() => {
              const initialState = {
                ...useTableParams,
                searchText: "",
                startDate: "",
                endDate: "",
                status: "",
                sortBy: "createdAt",
                sortOrder: "desc",
              };
              updateDataList(initialState);
              setTableParams(initialState);
              handleReset();
            }}
            className="h-[28px] bg-white"
            variant="flat"
          >
            Clear
          </Button>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
