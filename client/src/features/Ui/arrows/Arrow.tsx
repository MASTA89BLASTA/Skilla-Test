import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Arrow.scss";

type ArrowProps = {
  isOpen: boolean;
  onClick: () => void;
}

function Arrow({isOpen, onClick}: ArrowProps): JSX.Element {
  
  return (
    <button type="button" onClick={onClick}>
      <FontAwesomeIcon
        className={`calls__table__header__time--icon ${isOpen ? "rotated" : ""}`}
        icon={faChevronDown}
      />
    </button>
  );
}

export default Arrow;
