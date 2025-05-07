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

function CallsTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = "testtoken";
  const [dateStart, setDateStart] = useState<string | null>(null);
  const [dateEnd, setDateEnd] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [callType, setCallType] = useState(""); 
  const [displayMode, setDisplayMode] = useState("Время");
  const limit = 1000;
  const offset = 0;

  const callsList: Call[] = useSelector(
    (state: RootState) => state.callsList.results
  );
  

  useEffect(() => {
    if (dateStart && dateEnd) {
      console.log("Вызов API с параметрами:", dateStart, dateEnd);
      const inOutValue = (() => {
        switch (callType) {
          case "Входящие":
            return "1";
          case "Исходящие":
            return "0";
          default:
            return "";
        }
      })();
      api
        .loadCalls(token, dateStart, dateEnd, inOutValue, limit, offset)
        .then(({ results, total_rows }) => {
          console.log("Звонки:", results);
          dispatch({ type: "call/load", payload: { total_rows: parseInt(total_rows, 10), results } });
        })
        .catch(error => {
          console.error("Ошибка при загрузке звонков:", error);
        });
    }
  }, [dateStart, dateEnd, callType]);

  

  const handleDateChange = (
    startDate: string | null,
    endDate: string | null
  ): void => {
    console.log("Новый диапазон дат:", startDate, endDate);
    setDateStart(startDate);
    setDateEnd(endDate);
  };

  const handleTypeSelect = (type: string): void => {
    setCallType(type);
  };

  const handleToggleMenu = (): void => setShowMenu(!showMenu);

  const handleMenuOptionClick = (option: string): void => {
    setDisplayMode(option);
    setShowMenu(false);
  };

  const fetchDownloadRecord = async (
    recordId: string,
    partnershipId: string
  ): Promise<Blob> => {
    console.log(
      "Вызов fetchDownloadRecord с аргументами:",
      recordId,
      partnershipId
    );
    try {
      const recordBlob = await api.loadCallRecord(
        token,
        recordId,
        partnershipId
      );
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

  return (
    <div className="calls__table__header__wrapper">
      <div className="calls__table__header__types">
        <CallTypesIncOut onTypeSelect={handleTypeSelect} />
        <DatePicker onDateChange={handleDateChange} />
      </div>
      <div className="calls__table__wrapper">
        <div className="calls__table">
          {callsList.length ? (
            <>
              <div className="calls__table__header">
                <span className="calls__table__header__item calls__table__header__item--type">
                  Тип
                </span>
                <span className="calls__table__header__item calls__table__header__item--time">
                  {displayMode}
                  <Arrow isOpen={showMenu} onClick={handleToggleMenu}/>
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
                        }}
                      >
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
                        }}
                      >
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

              {callsList.map(call => (
                <CallItem
                  key={call.id}
                  call={call}
                  displayMode={displayMode}
                  onDownloadRecord={fetchDownloadRecord}
                />
              ))}
            </>
          ) : (
            <p>Звонков нет</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallsTable;
