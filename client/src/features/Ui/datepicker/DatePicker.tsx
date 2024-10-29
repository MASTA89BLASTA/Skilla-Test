/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
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
  const [selectedRange, setSelectedRange] = useState<DateRange>({ startDate: null, endDate: null });
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
      const startDate = new Date(start.split('.').reverse().join('-'));
      const endDate = new Date(end.split('.').reverse().join('-'));
      
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
       <div>
        <h4>Выбранный диапазон:</h4>
        {selectedRange.startDate && selectedRange.endDate ? (
          <p>
            С {selectedRange.startDate.toLocaleDateString()} по {selectedRange.endDate.toLocaleDateString()}
          </p>
        ) : (
          <p>Выберите период или укажите даты</p>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button type="button" onClick={() => handleSliderChange("left")}>&lt;</button>
        <span role="button" onClick={() => setDropdownOpen(!isDropdownOpen)} style={{ margin: "0 10px" }}>
          {PRESET_RANGES[currentPresetIndex].label}
        </span>
        <button type="button" onClick={() => handleSliderChange("right")}>&gt;</button>
      </div>
      <div className="dropdown">
        {isDropdownOpen && (
          <ul>
           {PRESET_RANGES.map((range, index) => (
              <li
                key={range.label}
                role="button"
                tabIndex={0}
                onClick={() => setPresetRange(index)}
              >
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