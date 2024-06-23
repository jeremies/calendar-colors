import { colorScheme } from "../constants/colorScheme";
import "./Day.css";

const colorBlock = (colIndex, i) => {
  return (
    <div
      className="color-day"
      key={i}
      style={{ backgroundColor: colorScheme[colIndex] }}
    ></div>
  );
};
export const Day = ({ date, handleDayClick, colors }) => {
  return (
    <div className="day" onClick={(event) => handleDayClick(event, date)}>
      {date.getDate()}
      {colors && colors.map((colIndex, i) => colorBlock(colIndex, i))}
    </div>
  );
};
