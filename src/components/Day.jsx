import "./Day.css";

export const Day = ({ date, handleDayClick }) => {
  return (
    <div className="day" onClick={handleDayClick}>
      {date.getDate()}
    </div>
  );
};
