import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../../store";
import type Call from "../../redux/types/Call";
import * as api from "../../api/api";
import CallItem from "./CallItem";
import DatePicker from "../../Ui/datepicker/DatePicker";
import "./CallsTable.scss";

function CallsTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = "testtoken";
  const [dateStart, setDateStart] = useState<string | null>(null);
  const [dateEnd, setDateEnd] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [displayMode, setDisplayMode] = useState("Время");
  const limit = 1000;
  const offset = 0;

  const callsList: Call[] = useSelector(
    (state: RootState) => state.callsList.callsList.results
  );

  useEffect(() => {
    if (dateStart && dateEnd) {
      console.log("Вызов API с параметрами:", dateStart, dateEnd);
      api
        .loadCalls(token, dateStart, dateEnd, "", limit, offset)
        .then(({ results, total_rows }) => {
          console.log("Звонки:", results);
          dispatch({ type: "call/load", payload: { results, total_rows } });
        })
        .catch(error => {
          console.error("Ошибка при загрузке звонков:", error);
        });
    }
  }, [dateStart, dateEnd, dispatch]);

  const handleDateChange = (
    startDate: string | null,
    endDate: string | null
  ): void => {
    console.log("Новый диапазон дат:", startDate, endDate);
    setDateStart(startDate);
    setDateEnd(endDate);
  };

  const handleToggleMenu = (): void => setShowMenu(!showMenu);

  const handleMenuOptionClick = (option: string): void => {
    setDisplayMode(option);
    setShowMenu(false);
  };

  return (
    <div>
      <DatePicker onDateChange={handleDateChange} />
      <div className="calls__table">
        {callsList.length ? (
          <>
            <div className="calls__table__header">
              <span className="calls__table__header__item calls__table__header__item--type">
                Тип
              </span>
              <span className="calls__table__header__item calls__table__header__item--time">
                {displayMode}
                <button type="button" onClick={handleToggleMenu}>
                  <FontAwesomeIcon
                    className="calls__table__header__time--icon"
                    icon={faChevronDown}
                  />
                </button>
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
              <CallItem key={call.id} call={call} displayMode={displayMode} />
            ))}
          </>
        ) : (
          <p>Звонков нет</p>
        )}
      </div>
    </div>
  );
}

export default CallsTable;
