import React, { useState } from "react";
import Arrow from "../arrows/Arrow";
import "./CallTypesIncOut.scss";

type CallTypesIncOutProps = {
  onTypeSelect: (type: string) => void;
}

function CallTypesIncOut({onTypeSelect}: CallTypesIncOutProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleMenu = (): void => setShowMenu(!showMenu);
  const [selectedType, setSelectedType] = useState("Все типы");
  const handleMenuOptionClick = (option: string): void => {
    console.log(`Selected option: ${option}`);
    setSelectedType(option);
    onTypeSelect(option);
    setShowMenu(false);
  };
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
                if (e.key === "Enter" || e.key === " ")
                  handleMenuOptionClick(option);
              }}
              className="call__types__inc__out--option"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CallTypesIncOut;
