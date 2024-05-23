import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsersTickers from "./UsersTickers";

interface Ticker {
  _id: string;
  ticker: string;
}

interface User {
  _id: string;
  watchlist: Ticker[];
}

const ProfileComponent: React.FC = () => {
  //   const allTickers = [
  //     { ticker: "GPIL", selected: false },
  //     { ticker: "CAMS", selected: false },
  //     { ticker: "TCS", selected: false },
  //     { ticker: "VTL", selected: false },
  //     { ticker: "DMART", selected: false },
  //     { ticker: "RUPA", selected: false },
  //     { ticker: "DOLLAR", selected: false },
  //     { ticker: "MRF", selected: false },
  //     { ticker: "HGS", selected: false },
  //     { ticker: "INFY", selected: false },
  //   ];

  const initialUser = {
    _id: "",
    username: "",
    password: "",
    date: "",
    watchlist: [],
  };

  const rootURL =
    import.meta.env.VITE_APP_ENV === "development"
      ? import.meta.env.VITE_APP_LOCAL_ROOT_URL
      : import.meta.env.VITE_APP_SERVER_ROOT_URL;

  const [usersTickers, setUsersTickers] = useState<Ticker[]>([]);
  const [availableTickers, setAvailableTickers] = useState<Ticker[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [user, setUser] = useState<User>(initialUser);

  const navigate = useNavigate();

  const onAvailableTickerClick = (index: number) => {
    console.log(index);

    if (selected[index]) {
      console.log("disabled");
      return;
    }

    let newSelected = [...selected];
    newSelected[index] = true;
    setSelected(newSelected);

    let newUsersTickers = [...usersTickers];
    newUsersTickers.push(availableTickers[index]);
    setUsersTickers(newUsersTickers);
  };

  const onTickerRemove = (id: string): void => {
    let newUsersTickers = [...usersTickers];
    newUsersTickers = newUsersTickers.filter((ticker) => ticker["_id"] !== id);
    console.log(newUsersTickers);
    setUsersTickers(newUsersTickers);

    let newSelected = [...selected];
    availableTickers.forEach((ticker, index) => {
      if (ticker["_id"] == id) {
        newSelected[index] = false;
        setSelected(newSelected);
        return;
      }
    });
  };

  const clearAll = () => {
    setUsersTickers([]);
    const len = selected.length;
    setSelected(Array(len).fill(false));
  };

  const onSave = () => {
    let newUser = { ...user };
    newUser.watchlist = usersTickers;
    axios
      .put(`${rootURL}/api/profile`, newUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setUser(newUser);
  };

  function printState() {
    console.log(usersTickers);
    console.log(availableTickers);
    console.log(selected);
    console.log(user);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser() {
      try {
        const response = await axios.get(`${rootURL}/api/auth`, { headers: { "x-auth-token": token } });
        console.log(response.data.object);
        setUser(response.data.object);
        setUsersTickers(response.data.object.watchlist);
        let watchList = response.data.object.watchlist;

        const tickers = await axios.get(`${rootURL}/api/ticker`);
        console.log(tickers.data);
        setAvailableTickers(tickers.data);
        let allTickers = tickers.data;
        let tempArray = Array(tickers.data.length).fill(false);

        watchList.forEach((source: Ticker) => {
          allTickers.forEach((dest: Ticker, index: number) => {
            if (source.ticker == dest.ticker) {
              tempArray[index] = true;
              return;
            }
          });
        });
        console.log(tempArray);
        setSelected(tempArray);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }
    fetchUser();
  }, []);

  const onTickerClick = (ticker: string) => {
    console.log(ticker);
  };

  return (
    <div className="mx-4">
      <h1 className="text-2xl">Welcome, user!</h1>
      <UsersTickers
        editable={true}
        usersTickers={usersTickers}
        onTickerRemove={onTickerRemove}
        onSave={onSave}
        clearAll={clearAll}
        onTickerClick={onTickerClick}
      />
      {/* <div className="usersTickers border-2 border-slate-700 py-4 my-2">
        <div className="section-navbar flex">
          <div className="flex-1">
            <h1 className="text-lg px-2 py-1">Your Tickers</h1>
          </div>
          <div className="flex-1 flex px-2">
            <div className="ml-auto">
              <button className="text-lg px-2 py-1 text-white bg-slate-700 mx-4" onClick={onSave}>
                Save
              </button>
              <button className="text-lg px-2 py-1 text-white bg-slate-700" onClick={clearAll}>
                Clear All
              </button>
            </div>
          </div>
        </div>
        <div className="tickers flex flex-wrap">
          {usersTickers.map((ticker, index) => (
            <div key={ticker["_id"]} className="border-2 border-slate-700 m-2">
              <h1 className="ticker py-2 px-8 ">{ticker["ticker"]}</h1>
              <div className="flex p-1">
                <button onClick={() => onTickerRemove(ticker["_id"])} className="m-auto">
                  <DeleteOutlineIcon />
                </button>{" "}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="availableTickers border-2 border-slate-700 px-2 py-4">
        <h1 className="text-lg">Available Tickers</h1>
        <div className="tickers flex flex-wrap">
          {availableTickers.map((ticker, index) => (
            <div key={ticker["_id"]} className="border-2 border-slate-700 m-2">
              <button
                key={index}
                onClick={() => onAvailableTickerClick(index)}
                className={
                  "ticker py-2 px-8 " + (selected[index] ? "text-gray-300 disabled disable-ticker" : "text-black")
                }
              >
                {ticker["ticker"]}
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={printState}>Print State</button>
    </div>
  );
};

export default ProfileComponent;
