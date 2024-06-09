import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DayOfWeek } from "./DayOfWeek";
import { Day } from "./Day";

function App() {
  const [month, setMonth] = useState(5);
  const [year, setYear] = useState(2015);

  debugger;

  const firstDay = new Date(year, month, 1);
  let firstCornerDayOfWeek = -firstDay.getDay() + 2;
  if (firstCornerDayOfWeek < -5) {
    firstCornerDayOfWeek += 7;
  } else if (firstCornerDayOfWeek > 1) {
    firstCornerDayOfWeek -= 7;
  }
  const firstCornerDay = new Date(year, month, firstCornerDayOfWeek);
  console.log(firstCornerDay);

  const lastDay = new Date(year, month + 1, 0);
  const lastCornerDay = new Date(year, month + 1, (7 - lastDay.getDay()) % 7);
  console.log(lastCornerDay);

  const days = [];
  const currDay = new Date(firstCornerDay.getTime());
  while (currDay.getTime() <= lastCornerDay.getTime()) {
    days.push(new Date(currDay.getTime()));
    currDay.setDate(currDay.getDate() + 1);
  }

  console.log(days);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div style={{ marginLeft: "200px" }}>
      <button onClick={() => setMonth((month) => month + 1)}>inc</button>
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
