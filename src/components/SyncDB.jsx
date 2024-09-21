import { useEffect, useState } from "react";
import "./SyncDB.css";
import { COLORS_BY_DATE, TOKEN } from "../constants/constants";

const GIST_ID = "dbd336c784768f3f8d0fbb3cbbe060c7";
const GIST_FILENAME = "calendar-colors-db.json";
export const SyncDB = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN));

  const getToken = async () => {
    if (!confirm("do you really want to get token?")) return;

    await navigator.permissions.query({
      name: "clipboard-read",
    });
    await navigator.clipboard.readText().then((text) => {
      setToken(text);
      localStorage.setItem(TOKEN, text);
    });
  };

  const pullFromDB = async () => {
    if (token && !confirm("do you really want to pull from DB?")) return;

    const req = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    const gist = await req.json();
    localStorage.setItem(COLORS_BY_DATE, gist.files[GIST_FILENAME].content);
    window.location.reload();
    if (token) alert("local DB updated successfully");
  };

  const pushToDB = async (data) => {
    if (!confirm("do you really want to push to DB?")) return;

    const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: localStorage.getItem(COLORS_BY_DATE),
          },
        },
      }),
    });

    alert("DB updated successfully");
  };

  useEffect(() => {
    const executeOncePerDay = () => {
      const lastExecution = localStorage.getItem("lastExecution");

      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (!lastExecution || now - lastExecution > oneDay) {
        !token && pullFromDB();

        localStorage.setItem("lastExecution", now);
      }
    };

    executeOncePerDay();
  }, []);

  return (
    <div>
      <div className="sync-db">
        {token && (
          <>
            <button onClick={pushToDB}>
              <i className="bx bx-up-arrow-alt"></i>
              Push to DB
            </button>
            <button onClick={pullFromDB}>
              <i className="bx bx-down-arrow-alt"></i>
              Pull from DB
            </button>
          </>
        )}
      </div>
      <div className="sync-db">
        <button onClick={getToken}>Get token from clipboard</button>
      </div>
    </div>
  );
};
