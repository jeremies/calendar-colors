import "./Day.css"

export const Day = ({ date }) => {
  return <div className="day">{date.getDate()}</div>;
};
