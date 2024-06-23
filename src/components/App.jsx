import { useEffect, useState } from "react";
import "./App.css";
import { DayOfWeek } from "./DayOfWeek";
import { Day } from "./Day";
import { Chooser } from "./Chooser";
import PWABadge from "./PWABadge.jsx";
import { SyncDB } from "./SyncDB.jsx";
import { COLORS_BY_DATE } from "../constants/constants.js";

const today = new Date();

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function App() {
  const [month, setMonth] = useState(5);
  const [isChooserShowing, setIsChooserShowing] = useState(false);
  const [chooserPosition, setChooserPosition] = useState({
    x: 0,
    y: 0,
  });
  const [currDate, setCurrDate] = useState(null);
  const [colorsByDate, setColorsByDate] = useState({});

  useEffect(() => {
    if (localStorage.getItem(COLORS_BY_DATE)) {
      setColorsByDate(JSON.parse(localStorage.getItem(COLORS_BY_DATE)));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(colorsByDate).length !== 0) {
      localStorage.setItem(COLORS_BY_DATE, JSON.stringify(colorsByDate));
    }
  }, [colorsByDate]);

  const monthNorm = ((month % 12) + 12) % 12;
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

  const handleDayClick = (event, date) => {
    const day = event.target;

    const targetRect = day.getBoundingClientRect();

    let x = targetRect.right - targetRect.width / 2;
    const y = window.scrollY + targetRect.top + targetRect.height / 2;

    // TODO fix this magic 124 constant
    if (x + 124 > window.innerWidth) {
      x = window.innerWidth - 124;
    }

    setChooserPosition({
      x,
      y,
    });
    setIsChooserShowing(true);
    setCurrDate(date);
  };

  const addColor = (color) => {
    if (!colorsByDate[currDate.getTime()]) {
      setColorsByDate((colorsByDate) => ({
        ...colorsByDate,
        [currDate.getTime()]: [color],
      }));
    } else {
      setColorsByDate((colorsByDate) => ({
        ...colorsByDate,
        [currDate.getTime()]: [...colorsByDate[currDate.getTime()], color],
      }));
    }

    console.log(colorsByDate);

    setIsChooserShowing(false);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button
          className="arrow-buttons"
          onClick={() => setMonth((month) => month - 1)}
        >
          <i className="bx bxs-chevron-left"></i>
        </button>
        <button
          className="arrow-buttons"
          onClick={() => setMonth((month) => month + 1)}
        >
          <i className="bx bxs-chevron-right"></i>
        </button>
        <div className="month">
          {monthNames[monthNorm]} {currYear}
        </div>
      </div>
      <div className="wrapper">
        {daysOfWeek.map((day) => (
          <DayOfWeek key={day} day={day} />
        ))}
        {days.map((day) => (
          <Day
            key={day.getTime()}
            date={day}
            colors={colorsByDate[day.getTime()]}
            handleDayClick={handleDayClick}
          />
        ))}
      </div>
      {isChooserShowing && (
        <Chooser addColor={addColor} position={chooserPosition} />
      )}
      <SyncDB />
      <PWABadge />
    </div>
  );
}

export default App;
