import axios from "axios";
import { top_10_it_companies } from "../helper/constants";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import ResultsComponent from "./ResultsComponent";
import RatiosComponent from "./RatiosComponent";

type Ratios = {
  ticker: string;
  price: number;
  stockPE: number;
  industryPE: number;
  intrinsicValue: number;
  grahamNumber: number;
  cfo: number;
  pat: number;
  roe: number;
  roce: number;
  high: number;
  low: number;
};

type RangeTableRow = {
  key: string;
  value: string;
};

type RangeTable = {
  title: string;
  data: RangeTableRow[];
};

type QuarterlyData = {
  quarters: [];
  q_sales: [];
  q_sales_percent: [];
  q_expenses: [];
  q_expenses_percent: [];
  q_pat: [];
  q_pat_percent: [];
};

type AnnualData = {
  years: [];
  a_sales: [];
  a_sales_percent: [];
  a_expenses: [];
  a_expenses_percent: [];
  a_pat: [];
  a_pat_percent: [];
};

type Results = {
  ticker: string;
  range_tables: RangeTable[];
  quarterlyData: QuarterlyData;
  annualData: AnnualData;
  latest_concall_transcript: string;
};

const SearchComponent = () => {
  const rootURL =
    import.meta.env.VITE_APP_ENV === "development"
      ? import.meta.env.VITE_APP_LOCAL_ROOT_URL
      : import.meta.env.VITE_APP_SERVER_ROOT_URL;

  console.log(rootURL);

  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  // const [matchingTickers, setMatchingTickers] = useState<string[]>([]);
  // const [errorMessage, setErrorMessage] = useState<string>("");
  // const [data, setData] = useState<Ratios>();
  const [ratios, setRatios] = useState<Ratios>();
  const [allRatios, setAllRatios] = useState<Ratios[]>([]);

  const [results, setResults] = useState<Results>();
  const [allResults, setAllResults] = useState<Results[]>([]);

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // const handleSubmit = async (ticker: string) => {
  //   console.log(ticker);
  //   if (tickerIsValid(ticker)) {
  //     setFetchingData(true);
  //     axios
  //       .get("http://127.0.0.1:4000/api/ticker/results/" + ticker)
  //       .then(async (response) => {
  //         await timeout(1000);
  //         console.log(response.data);
  //         setFetchingData(false);
  //       })
  //       .catch((error) => console.log(error));
  //   }
  //   //  else {
  //   //   setErrorMessage("Invalid Ticker");
  //   //   await timeout(2000);
  //   //   setErrorMessage("");
  //   // }
  // };

  const tickerIsValid = (ticker: string) => {
    return top_10_it_companies.includes(ticker);
  };

  // const handleInputTickerChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setInputTicker(event.target.value);
  // };

  const onTickerSelect = async (ticker: string, index: number) => {
    console.log(ticker);
    setCurrentTicker(ticker);
    setCurrentIndex(index);

    setRatios(undefined);
    setResults(undefined);

    console.log(allRatios[index]);

    if (allRatios[index] === undefined) {
      console.log("Making request...");
      if (tickerIsValid(ticker)) {
        setFetchingData(true);
        setRatios(undefined);
        axios
          .get(`${rootURL}/api/ticker/ratios/` + ticker)
          .then(async (response) => {
            await timeout(1000);
            console.log(response.data);
            setFetchingData(false);

            setRatios(response.data);

            let newAllRatios = [...allRatios];
            newAllRatios[index] = response.data;
            setAllRatios(newAllRatios);
          })
          .catch((error) => console.log(error));
      }
    } else {
      console.log("Fetching from cache");
      setRatios(allRatios[index]);
      setResults(allResults[index]);
    }
  };

  const onFetchResults = async () => {
    if (allResults[currentIndex] === undefined) {
      console.log("Making request...");
      if (tickerIsValid(currentTicker)) {
        setFetchingData(true);
        setResults(undefined);
        axios
          .get(`${rootURL}/api/ticker/results/` + currentTicker)
          .then(async (response) => {
            await timeout(1000);
            console.log(response.data);
            setFetchingData(false);

            setResults(response.data);

            let newAllResults = [...allResults];
            newAllResults[currentIndex] = response.data;
            setAllResults(newAllResults);
          })
          .catch((error) => console.log(error));
      }
    }
  };

  useEffect(() => {
    setAllRatios(new Array(top_10_it_companies.length));
    setAllResults(new Array(top_10_it_companies.length));
  }, []);

  // useEffect(() => {
  //   console.log("Input Ticker:", inputTicker);
  //   if (inputTicker.length >= 3) {
  //     const matches = symbols.filter((symbol) => symbol.startsWith(inputTicker));
  //     setMatchingTickers(matches);
  //     console.log(matches);
  //   } else {
  //     setMatchingTickers([]);
  //     setData("");
  //   }
  // }, [inputTicker]);

  const onPrintState = () => {
    console.log(allRatios);
  };

  return (
    <div className="container">
      <div className="">
        {/* <div className="section-search mt-8 text-lg">
          <div className="flex flex-row">
            <div className="searchbox basis-3/4 mr-2">
              <input
                type="text"
                placeholder="Enter ticker"
                className="border-b-2 border-slate-700 w-full p-4"
                value={inputTicker}
                onChange={handleInputTickerChange}
              />
            </div>
            <div className="submit-button basis-1/4 ml-2">
              <button className="w-full p-4 bg-slate-700 text-white" onClick={handleSubmit}>
                Search
              </button>
            </div>
          </div>
        </div>
        {errorMessage.length > 0 && <h1 className="error-message text-center mt-2 text-red-500">{errorMessage}</h1>}
        <div className="section-matches mt-2 p-2">
          <h1 className="text-lg mb-2">Available Tickers</h1>
          <div className="matching-tickers flex space-x-2">
            {matchingTickers.length > 0 &&
              matchingTickers.map((ticker) => (
                <button key={ticker} onClick={() => onTickerSelect(ticker)} className="border-2 border-slate-700 p-2">
                  {ticker}
                </button>
              ))}
          </div>
        </div> */}
        <div className="section-tickers flex justify-center border-2 border-slate-700 px-4 pt-2 pb-4 m-4">
          <div className="section-content">
            <h1 className="text-xl mb-2 ml-2">Available Tickers</h1>
            <div className="flex flex-row flex-wrap">
              {top_10_it_companies.map((ticker, index) => (
                <button
                  key={ticker}
                  onClick={() => onTickerSelect(ticker, index)}
                  className="border-2 border-slate-700 px-4 py-2 m-2"
                >
                  {ticker}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="section-ratios m-4">
          {fetchingData && (
            <div className="flex justify-center">
              <MoonLoader color="#36d7b7" loading={fetchingData} speedMultiplier={0.5} />
            </div>
          )}
          {ratios && <RatiosComponent ratios={ratios} />}
        </div>
        {ratios && !results && (
          <div className="bg-slate-700 text-white p-2 m-4 text-center">
            <button onClick={onFetchResults}>Fetch Results</button>
          </div>
        )}
        {results && (
          <div className="section-results m-4 border-2 border-slate-700">
            {fetchingData && (
              <div className="flex justify-center">
                <MoonLoader color="#36d7b7" loading={fetchingData} speedMultiplier={0.5} />
              </div>
            )}
            <ResultsComponent detail={results} />
          </div>
        )}
      </div>
      <button onClick={onPrintState}>Print State</button>
    </div>
  );
};

export default SearchComponent;
