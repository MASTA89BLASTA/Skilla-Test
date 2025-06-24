import React, { useState } from "react";
import Arrow from "../arrows/Arrow";
import "./CallTypesIncOut.scss";

type CallTypesIncOutProps = {
  onTypeSelect: (type: string) => void;
};

function CallTypesIncOut({ onTypeSelect }: CallTypesIncOutProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleMenu = (): void => setShowMenu(!showMenu);
  const [selectedType, setSelectedType] = useState("Все типы");
  const handleMenuOptionClick = (option: string): void => {
    console.log(`Selected option: ${option}`);
    setSelectedType(option);
    onTypeSelect(option);
    setShowMenu(false);
  };

  const handleReset = (): void => {
    setSelectedType("Все типы");
    onTypeSelect("Все типы");
  };

  const isFiltered = selectedType === "Входящие" || selectedType === "Исходящие";
  return (
    <div className="call__types__inc__out">
      <span className="call__types__inc__out--title">
        {selectedType}
        <Arrow isOpen={showMenu} onClick={handleToggleMenu} />
      </span>
      {showMenu && (
        <div className="call__types__inc__out--menu">
          {["Все типы", "Входящие", "Исходящие"].map(option => (
            <div
              key={option}
              role="button"
              tabIndex={0}
              onClick={() => handleMenuOptionClick(option)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleMenuOptionClick(option);
              }}
              className="call__types__inc__out--option">
              {option}
            </div>
          ))}
        </div>
      )}
      {isFiltered && (
        <div
          className="call__types__inc__out--reset"
          role="button"
          tabIndex={0}
          onClick={handleReset}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") handleReset();
          }}>
          Сбросить фильтр
          <svg
            className="call__types__inc__out--reset-icon"
            viewBox="0 0 9 9"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.75 0.88125L7.86875 0L4.375 3.49375L0.88125 0L0 0.88125L3.49375 4.375L0 7.86875L0.88125 8.75L4.375 5.25625L7.86875 8.75L8.75 7.86875L5.25625 4.375L8.75 0.88125Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default CallTypesIncOut;
