/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import "./DatePicker.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [customRangeInput, setCustomRangeInput] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);

  const setPresetRange = (index: number): void => {
    const { days } = PRESET_RANGES[index];
    const newEndDate = new Date();
    const newStartDate = new Date();
    newStartDate.setDate(newEndDate.getDate() - days);
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    console.log("Выбранный диапазон:", startDate, endDate);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setCurrentPresetIndex(index);
    setCustomRangeInput("");
    onDateChange(newStartDate.toISOString().split("T")[0], newEndDate.toISOString().split("T")[0]);
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
      const parsedStart = new Date(start.split(".").reverse().join("-"));
      const parsedEnd = new Date(end.split(".").reverse().join("-"));

      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      onDateChange(parsedStart.toISOString().split("T")[0], parsedEnd.toISOString().split("T")[0]);
    } else {
      setStartDate(null);
      setEndDate(null);
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
    <div className="datepiker__container">
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

      {isDropdownOpen && (
        <div className="dropdown">
          <ul>
            {PRESET_RANGES.map((range, index) => (
              <li
                key={range.label}
                className={`dropdown__item ${index === currentPresetIndex ? "dropdown__item--active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setPresetRange(index)}>
                {range.label}
              </li>
            ))}
            <li className="dropdown__item--custom">
              <label className="dropdown__item__label" htmlFor="customRangeInput">
                Указать даты:
                <input
                  id="customRangeInput"
                  className="dropdown__item__input"
                  type="text"
                  value={customRangeInput}
                  placeholder="__.__.__ - __.__.__"
                  onChange={handleCustomRangeChange}
                />
                <span className="dropdown__item__icon">
                  <svg
                    className="datepiker__slider__icon"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z" />
                  </svg>
                </span>
              </label>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
