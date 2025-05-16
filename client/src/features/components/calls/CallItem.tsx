import React, { useState } from "react";
import type Call from "../../redux/types/Call";
import AudioPlayer from "../../Ui/audioplayer/AudioPlayer";
import "./CallItem.scss";
import CallsIcons from "../../Ui/callIcons/CallIcons";
import Avatars from "../../Ui/avatars/Avatars";
import Grades from "../../Ui/grades/Grades";
import Telephone from "../../Ui/telephone/Telephone";

type CallPropsType = {
  call: Call;
  displayMode: string;
  onGetAudioBlob: (recordId: string, partnershipId: string) => Promise<Blob>;
  onDownloadRecord: (recordId: string, partnershipId: string) => Promise<Blob>;
};

function CallItem({
  call,
  displayMode,
  onGetAudioBlob,
  onDownloadRecord,
}: CallPropsType): JSX.Element {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  const handlePlayInit = async (): Promise<void> => {
    if (!audioUrl && call.record && call.partner_data?.id) {
      try {
        const blob = await onGetAudioBlob(call.record, call.partner_data.id);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error("Ошибка при загрузке аудио:", error);
      }
    }
  };

  const handleDownload = async (): Promise<void> => {
    if (call.record && call.partner_data?.id) {
      try {
        await onDownloadRecord(call.record, call.partner_data.id);
      } catch (error) {
        console.error("Ошибка при скачивании:", error);
      }
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
      <Avatars call={call} />
      <Telephone call={call} />
      <li className="call__item call__item--to">To: {call.source}</li>
      <Grades />
      {call.record ? (
        <li className="call__item call__item--record">
          {isPlayerVisible ? (
            <AudioPlayer
              audioUrl={audioUrl || ""}
              onPlayInit={handlePlayInit}
              onDownloadRecord={handleDownload}
              formattedCallTime={formattedCallTime}
              onHidePlayer={() => setIsPlayerVisible(false)}
            />
          ) : (
            <span
              className="call__item call__item--time__record"
              onClick={() => setIsPlayerVisible(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsPlayerVisible(true);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer", color: "#555" }}
            >
              {formattedCallTime}
            </span>
          )}
        </li>
      ) : (
        <li className="call__item call__item--time__record">{formattedCallTime}</li>
      )}
    </ul>
  );
}

export default CallItem;
