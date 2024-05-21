import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UsersTickers from "./UsersTickers";

type Ticker = {
  _id: string;
  ticker: string;
};

type User = {
  _id: string;
  watchlist: Ticker[];
};

type Detail = {
  ticker: string;
  company_name: string;
  price: number;
  change: number;
  mcap: number;
  current_price: number;
  high: number;
  low: number;
  stock_pe: number;
  book_value: number;
  dividend_yield: number;
  roce: number;
  roe: number;
  fv: number;
  quarterlyData: Object;
  annualData: Object;
};

const HomeComponent = () => {
  const initialUser = {
    _id: "",
    watchlist: [],
  };

  const rootURL =
    import.meta.env.VITE_APP_ENV === "development"
      ? import.meta.env.VITE_APP_LOCAL_ROOT_URL
      : import.meta.env.VITE_APP_SERVER_ROOT_URL;

  const [user, setUser] = useState<User>(initialUser);
  const [detail, setDetail] = useState<Detail>();
  const [usersTickers, setUsersTickers] = useState<Ticker[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser() {
      try {
        const response = await axios.get(`${rootURL}/api/auth`, { headers: { "x-auth-token": token } });
        console.log(response.data.object);
        setUser(response.data.object);
        setUsersTickers(response.data.object.watchlist);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }
    fetchUser();
  }, []);

  const onManageTickers = () => {
    navigate("/profile");
  };

  const onTickerRemove = (id: string) => {
    console.log(id);
  };
  const onSave = () => {
    console.log(user);
  };
  const clearAll = () => {};
  const onTickerClick = async (ticker: string) => {
    try {
      const response = await axios.get("http://localhost:5000/api/detail/" + ticker);
      console.log(response.data);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComponent brand="Smart Investor" menu="Logout" />
      <div className="flex justify-center">
        <div className="home-content w-11/12 mt-20">
          <div className="heading-title-option flex">
            <div className="flex items-center">
              <h1 className="flex-1 text-lg">Your Tickers</h1>
            </div>
            <div className="flex-1 flex">
              <button
                onClick={onManageTickers}
                className="text-lg ml-auto bg-slate-700 text-slate-300 px-4 py-2 h-full"
              >
                Manage Tickers
              </button>
            </div>
          </div>
          <UsersTickers
            editable={false}
            usersTickers={usersTickers}
            onTickerRemove={onTickerRemove}
            onSave={onSave}
            clearAll={clearAll}
            onTickerClick={onTickerClick}
          />
          <div className="detail-content">{detail?.company_name}</div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
