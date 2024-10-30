import React from "react";
import type Call from "../../redux/types/Call";
import "./CallItem.scss";

type CallPropsType = {
  call: Call;
  displayMode: string;
};

function CallItem({ call, displayMode }: CallPropsType): JSX.Element {
  const [datePart, timePart] = call.date.split(" ");
  const formattedDate = datePart.split("-").reverse().join(".");
  const formattedTime = timePart.slice(0, 5);

  const minutes = Math.floor(call.time / 60);
  const seconds = call.time % 60;
  const formattedCallTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <ul key={call.id} className="call__item__list">
      <li className="call__item call__item--in__out">{call.in_out === 1 ? "Inc" : "Out"}</li>
      {displayMode === "Дата" ? (
        <li className="call__item call__item--date">{formattedDate}</li>
      ) : (
        <li className="call__item call__item--time">{formattedTime}</li>
      )}
      {call.person_avatar && (
        <li className="call__item call__item--avatar">
          <img src={call.person_avatar} alt={`${call.person_name}`}/>
        </li>   
      )}
      <li className="call__item call__item--person">{call.partner_data?.name || call.partner_data?.phone}</li>
      {/* <div>From: {call.from_number}</div> */}
      <li className="call__item call__item--to">To: {call.to_number}</li>
      <li className="call__item call__item--status">Оценка</li>
      {call.record ? (
        <li className="call__item call__item--record">{call.record}</li>
      ) : (
        <li className="call__item call__item--time__record">{formattedCallTime}</li>
      )}
    </ul>
  );
}

export default CallItem;
