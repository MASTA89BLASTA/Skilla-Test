import React from "react";
import "./Grades.scss";
import { getRandomItems } from "../../utils/getRandomItems";

const Grades = (): JSX.Element => {
  const randomGrades = React.useMemo(() => {
    const grades = ["Отлично", "Хорошо", "Плохо"];
    return getRandomItems(grades, 1);
  }, []);

  const getGradeClass = (grade: string): string => {
    switch (grade) {
      case "Плохо":
        return "grade--bad";
      case "Хорошо":
        return "grade--good";
      case "Отлично":
        return "grade--excellent";
      default:
        return "";
    }
  };
  return (
    <>
      {randomGrades.map(grade => (
        <li className="call__item call__item--status" key={grade}>
          <span className={`call__item call__item--grade ${getGradeClass(grade)}`}>{grade}</span>
        </li>
      ))}
    </>
  );
};

export default Grades;
