import React from "react";
import type Call from "../../redux/types/Call";

type CallPropsType = {
  call: Call;
};

function CallItem({ call }: CallPropsType): JSX.Element {
  return (
    <div key={call.id} className="call-item">
      <div>{call.in_out === 1 ? "Incoming" : "Outgoing"}</div>
      <div>Date: {call.date}</div>
      <div>Time: {call.time} seconds</div>
      <div>Person: {call.partner_data?.name || call.partner_data?.phone}</div>
      <div>From: {call.from_number}</div>
      <div>To: {call.to_number}</div>
      <div>Status: {call.status}</div>
      {call.record && <div>Record ID: {call.record}</div>}
      {call.line_name && <div>Line Name: {call.line_name}</div>}
      {call.person_avatar && (
        <img src={call.person_avatar} alt={`${call.person_name}`} />
      )}
    </div>
  );
}

export default CallItem;
