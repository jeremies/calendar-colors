import { useState } from "react";
import "./App.css";
import { DayOfWeek } from "./DayOfWeek";
import { Day } from "./Day";

const today = new Date();

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function App() {
  const [month, setMonth] = useState(5);
  const monthNorm = (month % 12 + 12) % 12;
  const year = today.getFullYear();
  const currYear = year + Math.floor(month / 12);

  const firstDay = new Date(year, month, 1);
  let firstCornerDayOfWeek = -firstDay.getDay() + 2;
  if (firstCornerDayOfWeek < -5) {
    firstCornerDayOfWeek += 7;
  } else if (firstCornerDayOfWeek > 1) {
    firstCornerDayOfWeek -= 7;
  }
  const firstCornerDay = new Date(year, month, firstCornerDayOfWeek);

  const lastDay = new Date(year, month + 1, 0);
  const lastCornerDay = new Date(year, month + 1, (7 - lastDay.getDay()) % 7);

  const days = [];
  const currDay = new Date(firstCornerDay.getTime());
  while (currDay.getTime() <= lastCornerDay.getTime()) {
    days.push(new Date(currDay.getTime()));
    currDay.setDate(currDay.getDate() + 1);
  }

  return (
    <div className="calendar">
      <div className="header">
        <button className="arrow-buttons" onClick={() => setMonth((month) => month - 1)}>
          <i className="bx bxs-chevron-left"></i>
        </button>
        <button className="arrow-buttons" onClick={() => setMonth((month) => month + 1)}>
          <i className="bx bxs-chevron-right"></i>
        </button>
        <div className="month">{monthNames[monthNorm]} {currYear}</div>
      </div>
      <div className="wrapper">
        {daysOfWeek.map((day) => (
          <DayOfWeek key={day} day={day} />
        ))}
        {days.map((day) => (
          <Day key={day.getTime()} date={day} />
        ))}
      </div>
    </div>
  );
}

export default App;
