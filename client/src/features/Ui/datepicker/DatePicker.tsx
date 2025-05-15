/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import "./DatePicker.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type DateRange from "./DateRange";

type DatePickerProps = {
  onDateChange: (startDate: string, endDate: string) => void;
};

const PRESET_RANGES = [
  { days: 3, label: "3 дня" },
  { days: 7, label: "Неделя" },
  { days: 30, label: "Месяц" },
  { days: 365, label: "Год" },
];

function DatePicker({ onDateChange }: DatePickerProps): JSX.Element {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [customRangeInput, setCustomRangeInput] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);

  const setPresetRange = (index: number): void => {
    const { days } = PRESET_RANGES[index];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    console.log("Выбранный диапазон:", startDate, endDate);

    setSelectedRange({ startDate, endDate });
    setCurrentPresetIndex(index);
    setCustomRangeInput("");
    onDateChange(startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]);
  };

  useEffect(() => {
    setPresetRange(0);
  }, []);

  const handleCustomRangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCustomRangeInput(value);

    const [start, end] = value.split(" - ");
    const isValidDate = (date: string): boolean => /^\d{2}\.\d{2}\.\d{4}$/.test(date);

    if (isValidDate(start) && isValidDate(end)) {
      const startDate = new Date(start.split(".").reverse().join("-"));
      const endDate = new Date(end.split(".").reverse().join("-"));

      setSelectedRange({ startDate, endDate });
      onDateChange(startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]);
    } else {
      setSelectedRange({ startDate: null, endDate: null });
    }
  };

  const handleSliderChange = (direction: "left" | "right"): void => {
    const newIndex =
      direction === "left"
        ? (currentPresetIndex - 1 + PRESET_RANGES.length) % PRESET_RANGES.length
        : (currentPresetIndex + 1) % PRESET_RANGES.length;
    setPresetRange(newIndex);
  };

  return (
    <div>
      <div style={{ display: "none" }}>
        {selectedRange.startDate && selectedRange.endDate ? (
          <p>
            С {selectedRange.startDate.toLocaleDateString()} по{" "}
            {selectedRange.endDate.toLocaleDateString()}
          </p>
        ) : (
          <p>Выберите период или укажите даты</p>
        )}
      </div>
      <div className="datepiker__slider" style={{ display: "flex", alignItems: "center" }}>
        <button
          className="datepiker__slider__arrow"
          type="button"
          onClick={() => handleSliderChange("left")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span
          className="datepiker__slider__calendar"
          tabIndex={0}
          role="button"
          onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <svg
            className="datepiker__slider__icon"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z" />
          </svg>
          <span className="datepiker__slider__label">
            {PRESET_RANGES[currentPresetIndex].label}
          </span>
        </span>
        <button
          className="datepiker__slider__arrow"
          type="button"
          onClick={() => handleSliderChange("right")}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="dropdown">
        {isDropdownOpen && (
          <ul>
            {PRESET_RANGES.map((range, index) => (
              <li
                key={range.label}
                role="button"
                tabIndex={0}
                onClick={() => setPresetRange(index)}>
                {range.label}
              </li>
            ))}
            <li>
              <label htmlFor="customRangeInput">
                Указать даты:
                <input
                  id="customRangeInput"
                  type="text"
                  value={customRangeInput}
                  placeholder="__.__.__ - __.__.__"
                  onChange={handleCustomRangeChange}
                />
              </label>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default DatePicker;
