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

type QuarterlyData = {
  quarters: [];
  q_sales: [];
  q_sales_percent: [];
  q_expenses: [];
  q_expenses_percent: [];
  q_net_profit: [];
  q_net_profit_percent: [];
};

type AnnualData = {
  years: [];
  a_sales: [];
  a_sales_percent: [];
  a_expenses: [];
  a_expenses_percent: [];
  a_net_profit: [];
  a_net_profit_percent: [];
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
  quarterlyData: QuarterlyData;
  annualData: AnnualData;
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
  const [selectedTicker, setSelectedTicker] = useState<string>("");

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
      const response = await axios.get(`${rootURL}/api/detail/` + ticker);
      console.log(response.data);
      setDetail(response.data);
      setSelectedTicker(ticker);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComponent brand="Smart Investor" menu="Logout" />
      <div className="flex justify-center text-black">
        <div className="home-content w-11/12 mt-20">
          <div className="heading-title-option flex">
            <div className="flex items-center">
              <h1 className="flex-1 text-lg"></h1>
            </div>
            <div className="flex-1 flex">
              <button
                onClick={onManageTickers}
                className="text-lg ml-auto bg-slate-700 text-slate-100 px-4 py-2 h-full"
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
            selectedTicker={selectedTicker}
          />
          {detail && (
            <div className="detail-content border-2 border-slate-700 px-2 pt-2 pb-12">
              {/* <h1 className="detail-title text-xl">Stock details</h1> */}
              <div className="detail-basic-info flex">
                <div className="flex-1 key-value">
                  <h1 className="text-xl">Company</h1>
                  <h1 className="text-lg">
                    {detail.company_name} {"(" + detail.ticker + ")"}
                  </h1>
                </div>
                <div className="flex-1 key-value text-right">
                  <h1 className="text-xl">Price</h1>
                  <h1 className="text-lg">
                    <span>&#8377;</span>
                    {" " + detail.price}
                  </h1>
                </div>
                <div className="flex-1 key-value text-right">
                  <h1 className="text-xl">Price Change</h1>
                  <h1 className="text-lg">{detail.change + "%"}</h1>
                </div>
              </div>
              <div className="detail-results">
                <div className="detail-result-q">
                  <h1 className="text-lg text-center m-2">
                    <strong>Quarterly results</strong>
                  </h1>
                  <table className="table-auto w-full text-center">
                    <thead>
                      <th className="border-2 border-slate-700">Quarters</th>
                      {detail.quarterlyData.quarters.map((quarter) => (
                        <th key={quarter} className="border-2 border-slate-700">
                          {quarter}
                        </th>
                      ))}
                    </thead>
                    <tbody>
                      {/* Sales */}
                      <tr className="">
                        <td className="">Sales</td>
                        {detail.quarterlyData.q_sales.map((sales, index) => (
                          <td key={index} className="cell pt-2">
                            {sales}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className=""></td>
                        {detail.quarterlyData.q_sales_percent.map((percent, index) => (
                          <td key={index} className="text-right relative ">
                            <span className={"absolute -right-4 " + (percent > 0 ? "text-green-500" : "text-red-500")}>
                              {percent}
                            </span>
                          </td>
                        ))}
                        <td></td>
                      </tr>
                      {/* Expenses */}
                      <tr className="" style={{ margin: "4rem", padding: "10rem" }}>
                        <td className="pt-12">Expenses</td>
                        {detail.quarterlyData.q_expenses.map((expenses, index) => (
                          <td key={index} className="cell pt-12">
                            {expenses}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className=""></td>
                        {detail.quarterlyData.q_expenses_percent.map((percent, index) => (
                          <td key={index} className="text-right relative">
                            <span className={"absolute -right-4 " + (percent > 0 ? "text-green-500" : "text-red-500")}>
                              {percent}
                            </span>
                          </td>
                        ))}
                        <td></td>
                      </tr>
                      {/* Profit */}
                      <tr className="mt-4" style={{ margin: "4rem", padding: "10rem" }}>
                        <td className="pt-12">Profit</td>
                        {detail.quarterlyData.q_net_profit.map((profit, index) => (
                          <td key={index} className="cell pt-12">
                            {profit}
                          </td>
                        ))}
                      </tr>
                      {/* <tr className="border-b-2 border-slate-700"> */}
                      <tr>
                        <td className=""></td>
                        {detail.quarterlyData.q_net_profit_percent.map((percent, index) => (
                          <td key={index} className="text-right relative">
                            <span className={"absolute -right-4 " + (percent > 0 ? "text-green-500" : "text-red-500")}>
                              {percent}
                            </span>
                          </td>
                        ))}
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Annual Data */}
                <div className="detail-result-q pt-12">
                  <h1 className="text-lg text-center m-2">
                    <strong>Annual results</strong>
                  </h1>
                  <table className="table-auto w-full text-center">
                    <thead>
                      <th className="border-2 border-slate-700">Years</th>
                      {detail.annualData.years.map((year) => (
                        <th key={year} className="border-2 border-slate-700">
                          {year}
                        </th>
                      ))}
                    </thead>
                    <tbody>
                      {/* Sales */}
                      <tr className="">
                        <td className="">Sales</td>
                        {detail.annualData.a_sales.map((sales, index) => (
                          <td key={index} className="cell pt-2">
                            {sales}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className=""></td>
                        {detail.annualData.a_sales_percent.map((percent, index) => (
                          <td key={index} className="text-right relative ">
                            <span className={"absolute -right-4 " + (percent > 0 ? "text-green-500" : "text-red-500")}>
                              {percent}
                            </span>
                          </td>
                        ))}
                        <td></td>
                      </tr>
                      {/* Expenses */}
                      <tr className="" style={{ margin: "4rem", padding: "10rem" }}>
                        <td className="pt-12">Expenses</td>
                        {detail.annualData.a_expenses.map((expenses, index) => (
                          <td key={index} className="cell pt-12">
                            {expenses}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className=""></td>
                        {detail.annualData.a_expenses_percent.map((percent, index) => (
                          <td key={index} className="text-right relative">
                            <span className={"absolute -right-4 " + (percent > 0 ? "text-green-500" : "text-red-500")}>
                              {percent}
                            </span>
                          </td>
                        ))}
                        <td></td>
                      </tr>
                      {/* Profit */}
                      <tr className="mt-4" style={{ margin: "4rem", padding: "10rem" }}>
                        <td className="pt-12">Profit</td>
                        {detail.annualData.a_net_profit.map((profit, index) => (
                          <td key={index} className="cell pt-12">
                            {profit}
                          </td>
                        ))}
                      </tr>
                      {/* <tr className="border-b-2 border-slate-700"> */}
                      <tr>
                        <td className=""></td>
                        {detail.annualData.a_net_profit_percent.map((percent, index) => (
                          <td key={index} className="text-right relative">
                            <span className={"absolute -right-4 " + (percent > 0 ? "text-green-500" : "text-red-500")}>
                              {percent}
                            </span>
                          </td>
                        ))}
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
