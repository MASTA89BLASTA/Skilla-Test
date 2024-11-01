import React, { useState } from "react";
import type Call from "../../redux/types/Call";
import AudioPlayer from "../../Ui/audioplayer/AudioPlayer";
import "./CallItem.scss";
import CallsIcons from "../../Ui/callIcons/CallIcons";

type CallPropsType = {
  call: Call;
  displayMode: string;
  onDownloadRecord: (recordId: string, partnershipId: string) => Promise<Blob>;
};

function CallItem({
  call,
  displayMode,
  onDownloadRecord,
}: CallPropsType): JSX.Element {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleDownloadRecord = async (): Promise<void> => {
    if (call.record && call.partner_data?.id) {
      const blob = await onDownloadRecord(call.record, call.partner_data.id); 
      const fileUrl = URL.createObjectURL(blob); 
      console.log("Audio file URL:", fileUrl);
      setAudioUrl(fileUrl); 
    }
  };
  const [datePart, timePart] = call.date.split(" ");
  const formattedDate = datePart.split("-").reverse().join(".");
  const formattedTime = timePart.slice(0, 5);

  const minutes = Math.floor(call.time / 60);
  const seconds = call.time % 60;
  const formattedCallTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <ul key={call.id} className="call__item__list">
      <li className="call__item call__item--in__out">
        <CallsIcons in_out={call.in_out} status={call.status} />
      </li>
      {displayMode === "Дата" ? (
        <li className="call__item call__item--date">{formattedDate}</li>
      ) : (
        <li className="call__item call__item--time">{formattedTime}</li>
      )}
      {call.person_avatar && (
        <li className="call__item call__item--avatar">
          <img src={call.person_avatar} alt={`${call.person_name}`} />
        </li>
      )}
      <li className="call__item call__item--person">
        {/* {call.partner_data?.name || call.partner_data?.phone} */}
        {call.partner_data?.phone}
      </li>
      {/* <div>From: {call.from_number}</div> */}
      <li className="call__item call__item--to">To: {call.source}</li>
      <li className="call__item call__item--status">Оценка</li>
      {call.record ? (
        <li className="call__item call__item--record">
        <AudioPlayer 
          audioUrl={audioUrl || ""} 
          onDownloadRecord={handleDownloadRecord} 
          formattedCallTime={formattedCallTime}
        />
      </li>
      ) : (
        <li className="call__item call__item--time__record">
          {formattedCallTime}
        </li>
      )}
    </ul>
  );
}

export default CallItem;
