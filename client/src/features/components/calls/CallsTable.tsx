import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../../store";
import type Call from "../../redux/types/Call";
import * as api from "../../api/api";
import CallItem from "./CallItem";
import DatePicker from "../../Ui/datepicker/DatePicker";
import "./CallsTable.scss";
import CallTypesIncOut from "../../Ui/calltypes/CallTypesIncOut";
import Arrow from "../../Ui/arrows/Arrow";
import { setInOut } from "../../redux/types/ActionFilters";

import { filterCalls } from "../../utils/FilterCalls";

function CallsTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = "testtoken";
  const [dateStart, setDateStart] = useState<string | null>(null);
  const [dateEnd, setDateEnd] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  // const [callType, setCallType] = useState<string>("Все типы");
  const [displayMode, setDisplayMode] = useState("Время");
  const limit = 1000;
  const offset = 0;

  const callsList: Call[] = useSelector((state: RootState) => state.callsList.results);
  const inOut = useSelector((state: RootState) => state.filters.inOut);
  console.log("callsList из Redux:", callsList);
  useEffect(() => {
    if (!dateStart || !dateEnd) return;

    const params = {
      token,
      dateStart,
      dateEnd,
      inOut: inOut !== "" ? String(inOut) : undefined,
      limit,
      offset,
    };

    api
      .loadCalls(params)
      .then(({ results, total_rows }) => {
        dispatch({ type: "call/load", payload: { total_rows: parseInt(total_rows, 10), results } });
      })
      .catch(console.error);
  }, [dateStart, dateEnd, inOut, dispatch]);

  const handleDateChange = (startDate: string | null, endDate: string | null): void => {
    console.log("Новый диапазон дат:", startDate, endDate);
    setDateStart(startDate);
    setDateEnd(endDate);
  };

  const handleTypeSelect = (type: string): void => {
    if (type === "Входящие") {
      dispatch(setInOut(1));
    } else if (type === "Исходящие") {
      dispatch(setInOut(0));
    } else {
      dispatch(setInOut(""));
    }
  };

  const handleToggleMenu = (): void => setShowMenu(!showMenu);

  const handleMenuOptionClick = (option: string): void => {
    setDisplayMode(option);
    setShowMenu(false);
  };

  const fetchDownloadRecord = async (recordId: string, partnershipId: string): Promise<Blob> => {
    console.log("Вызов fetchDownloadRecord с аргументами:", recordId, partnershipId);
    try {
      const recordBlob = await api.loadCallRecord(token, recordId, partnershipId);
      const url = URL.createObjectURL(recordBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recordId}.mp3`;
      a.click();
      URL.revokeObjectURL(url);
      return recordBlob;
    } catch (error) {
      console.error("Ошибка при загрузке записи звонка:", error);
      throw error;
    }
  };

  const filteredCalls = filterCalls(callsList, dateStart, dateEnd, inOut);

  return (
    <div className="calls__table__header__wrapper">
      <div className="calls__table__header__types">
        <CallTypesIncOut onTypeSelect={handleTypeSelect} />
        <DatePicker onDateChange={handleDateChange} />
      </div>
      <div className="calls__table__wrapper">
        <div className="calls__table">
          {filteredCalls.length ? (
            <>
              <div className="calls__table__header">
                <span className="calls__table__header__item calls__table__header__item--type">
                  Тип
                </span>
                <span className="calls__table__header__item calls__table__header__item--time">
                  {displayMode}
                  <Arrow isOpen={showMenu} onClick={handleToggleMenu} />
                  {showMenu && (
                    <div className="calls__table__header__menu">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleMenuOptionClick("Время")}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleMenuOptionClick("Время");
                          }
                        }}>
                        Время
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleMenuOptionClick("Дата")}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleMenuOptionClick("Дата");
                          }
                        }}>
                        Дата
                      </div>
                    </div>
                  )}
                </span>
                <span className="calls__table__header__item calls__table__header__item--person">
                  Сотрудник
                </span>
                <span className="calls__table__header__item calls__table__header__item--call">
                  Звонок
                </span>
                <span className="calls__table__header__item calls__table__header__item--source">
                  Источник
                </span>
                <span className="calls__table__header__item calls__table__header__item--rating">
                  Оценка
                </span>
                <span className="calls__table__header__item calls__table__header__item--duration">
                  Длительность
                </span>
              </div>

              <div className="calls__table__group-title">
                {filteredCalls.map(call => (
                  <CallItem
                    key={call.id}
                    call={call}
                    displayMode={displayMode}
                    onDownloadRecord={fetchDownloadRecord}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="calls__table__empty">Звонков нет</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallsTable;
