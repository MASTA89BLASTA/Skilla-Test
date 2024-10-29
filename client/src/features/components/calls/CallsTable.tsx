import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../../store";
import type Call from "../../redux/types/Call";
import * as api from "../../api/api";
import CallItem from "./CallItem";
import DatePicker from "../../Ui/datepicker/DatePicker";

function CallsTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = "testtoken";
  const [dateStart, setDateStart] = useState<string | null>(null);
  const [dateEnd, setDateEnd] = useState<string | null>(null);
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

  return (
    <div>
      <DatePicker onDateChange={handleDateChange} />
      <div className="calls-table">
        {callsList.length > 0 ? (
          callsList.map(call => <CallItem key={call.id} call={call} />)
        ) : (
          <p>звонков нет</p>
        )}
      </div>
    </div>
  );
}

export default CallsTable;
