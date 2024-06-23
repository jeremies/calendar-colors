import { colorScheme } from "../constants/colorScheme";
import "./Day.css";

const colorBlock = (colIndex) => {
  return (
    <div
      className="color-day"
      style={{ backgroundColor: colorScheme[colIndex] }}
    ></div>
  );
};
export const Day = ({ date, handleDayClick, colors }) => {
  return (
    <div className="day" onClick={(event) => handleDayClick(event, date)}>
      {date.getDate()}
      {colors && colors.map((colIndex) => colorBlock(colIndex))}
    </div>
  );
};
