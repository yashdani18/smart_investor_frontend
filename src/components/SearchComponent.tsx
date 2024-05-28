import axios from "axios";
import { top_10_it_companies } from "../helper/constants";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import ResultsComponent from "./ResultsComponent";
import RatiosComponent from "./RatiosComponent";
import ConcallAnalysisComponent from "./ConcallAnalysisComponent";

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

type Critera = {
  title: string;
  text: string;
};

type Score = {
  value: string;
  reason: string;
};

type ConcallAnalysis = {
  criteria: Critera[];
  caution: string;
  score: Score;
};

type FinancialScore = {
  caution: string;
  score: Score;
};

const SearchComponent = () => {
  const rootURL =
    import.meta.env.VITE_APP_ENV === "development"
      ? import.meta.env.VITE_APP_LOCAL_ROOT_URL
      : import.meta.env.VITE_APP_SERVER_ROOT_URL;

  console.log("SearchComponent");
  // console.log(import.meta.env.VITE_APP_ENV);
  // console.log(import.meta.env.VITE_APP_LOCAL_ROOT_URL);
  // console.log(import.meta.env.VITE_APP_SERVER_ROOT_URL);
  // console.log(rootURL);

  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  // const [matchingTickers, setMatchingTickers] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  // const [data, setData] = useState<Ratios>();
  const [ratios, setRatios] = useState<Ratios>();
  const [allRatios, setAllRatios] = useState<Ratios[]>([]);

  const [results, setResults] = useState<Results>();
  const [allResults, setAllResults] = useState<Results[]>([]);

  const [concallAnalysis, setConcallAnalysis] = useState<ConcallAnalysis>();
  const [allConcallAnalysis, setAllConcallAnalysis] = useState<ConcallAnalysis[]>([]);

  const [financialScore, setFinancialScore] = useState<FinancialScore>();
  const [allFinancialScores, setAllFinancialScores] = useState<FinancialScore[]>([]);

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
    setConcallAnalysis(undefined);

    if (allRatios[index] !== undefined) {
      setRatios(allRatios[index]);
    }

    if (allResults[index] !== undefined) {
      setResults(allResults[index]);
    }

    if (allConcallAnalysis[index] !== undefined) {
      setConcallAnalysis(allConcallAnalysis[index]);
    }

    if (allFinancialScores[index] !== undefined) {
      setFinancialScore(allFinancialScores[index]);
    }

    if (allFinancialScores[index] === undefined) {
      console.log("Making request...");
      if (tickerIsValid(ticker)) {
        setFetchingData(true);
        setFinancialScore(undefined);
        axios
          .get(`${rootURL}/api/ticker/score/` + ticker)
          .then(async (response) => {
            await timeout(1000);
            console.log(response.data);
            setFetchingData(false);

            setFinancialScore(response.data);

            let newAllScores = [...allFinancialScores];
            newAllScores[index] = response.data;
            setAllFinancialScores(newAllScores);
          })
          .catch((error) => console.log(error));
      }
    } else {
      console.log("Fetching from cache");
      setFinancialScore(allFinancialScores[index]);
      // setResults(allResults[index]);
    }

    // console.log(allRatios[index]);

    // if (allRatios[index] === undefined) {
    //   console.log("Making request...");
    //   if (tickerIsValid(ticker)) {
    //     setFetchingData(true);
    //     setRatios(undefined);
    //     axios
    //       .get(`${rootURL}/api/ticker/ratios/` + ticker)
    //       .then(async (response) => {
    //         await timeout(1000);
    //         console.log(response.data);
    //         setFetchingData(false);

    //         setRatios(response.data);

    //         let newAllRatios = [...allRatios];
    //         newAllRatios[index] = response.data;
    //         setAllRatios(newAllRatios);
    //       })
    //       .catch((error) => console.log(error));
    //   }
    // } else {
    //   console.log("Fetching from cache");
    //   setRatios(allRatios[index]);
    //   // setResults(allResults[index]);
    // }
  };

  const onFetchRatios = async () => {
    if (currentTicker === "") {
      setIsError(true);
      await timeout(3000);
      setIsError(false);
      return;
    }
    if (allRatios[currentIndex] === undefined) {
      console.log("Making request...");
      if (tickerIsValid(currentTicker)) {
        setFetchingData(true);
        setRatios(undefined);
        axios
          .get(`${rootURL}/api/ticker/ratios/` + currentTicker)
          .then(async (response) => {
            await timeout(1000);
            console.log(response.data);
            setFetchingData(false);

            setRatios(response.data);

            let newAllRatios = [...allRatios];
            newAllRatios[currentIndex] = response.data;
            setAllRatios(newAllRatios);
          })
          .catch((error) => console.log(error));
      }
    } else {
      console.log("Fetching from cache");
      setRatios(allRatios[currentIndex]);
      // setResults(allResults[index]);
    }
  };

  const onFetchResults = async () => {
    if (currentTicker === "") {
      setIsError(true);
      await timeout(3000);
      setIsError(false);
      return;
    }
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
    } else {
      setResults(allResults[currentIndex]);
    }
  };

  const onFetchConcallAnalysis = async () => {
    if (currentTicker === "") {
      setIsError(true);
      await timeout(3000);
      setIsError(false);
      return;
    }
    if (allConcallAnalysis[currentIndex] === undefined) {
      console.log("Making request...");
      if (tickerIsValid(currentTicker)) {
        setFetchingData(true);
        setConcallAnalysis(undefined);
        axios
          .get(`${rootURL}/api/ticker/analysis/` + currentTicker)
          .then(async (response) => {
            await timeout(1000);
            console.log(response.data);
            setFetchingData(false);

            setConcallAnalysis(response.data);

            let newAllConcallAnalysis = [...allConcallAnalysis];
            newAllConcallAnalysis[currentIndex] = response.data;
            setAllConcallAnalysis(newAllConcallAnalysis);
          })
          .catch((error) => console.log(error));
      }
    } else {
      setConcallAnalysis(allConcallAnalysis[currentIndex]);
    }
  };

  useEffect(() => {
    setAllRatios(new Array(top_10_it_companies.length));
    setAllResults(new Array(top_10_it_companies.length));
    setAllConcallAnalysis(new Array(top_10_it_companies.length));
    setAllFinancialScores(new Array(top_10_it_companies.length));
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
            <h1 className="text-xl mb-2 ml-2">
              Available Tickers{" "}
              {isError ? <span className="text-sm text-red-500">(Please select a ticker to proceed)</span> : <></>}
            </h1>
            <div className="flex flex-row flex-wrap">
              {top_10_it_companies.map((ticker, index) => (
                <button
                  key={ticker}
                  onClick={() => onTickerSelect(ticker, index)}
                  className={
                    "border-2 border-slate-700 px-4 py-2 m-2 " +
                    (currentTicker === ticker ? "bg-slate-700 text-white" : "bg-white text-black")
                  }
                >
                  {ticker}
                </button>
              ))}
            </div>
          </div>
        </div>
        {fetchingData && (
          <div className="flex justify-center">
            <MoonLoader color="#36d7b7" loading={fetchingData} speedMultiplier={0.5} />
          </div>
        )}
        {financialScore && (
          <div className="section-ratios m-4 border-2 border-slate-700">
            <div className="header flex m-4">
              <div className="basis-3/4">
                <div>
                  <h1 className="text-center text-lg">Summary</h1>
                  <h1 className="flex-1 text-md my-2 flex items-center">{financialScore["score"]["reason"]}</h1>
                </div>
                <h1 className="flex-1 text-sm my-2 flex items-center text-red-500">
                  {"Caution: " + financialScore["caution"]}
                </h1>
                <h1 className="text-sm">
                  <em>Based on fundamental ratios and financial results. Score out of 10.</em>
                </h1>
              </div>
              <div className="basis-1/4 flex justify-center items-center">
                <div className="flex justify-center">
                  <button
                    className="border-2 border-slate-700 score w-32 h-32 text-6xl"
                    style={{ borderRadius: "50%" }}
                  >
                    {financialScore["score"]["value"]}
                  </button>
                  {/* <h1 className="text-xs text-center">Based on ratios and results</h1> */}
                </div>
              </div>
            </div>
          </div>
        )}
        {!ratios && (
          <div className="bg-slate-700 text-white p-2 m-4 text-center">
            <button onClick={onFetchRatios}>Fetch Ratios</button>
          </div>
        )}
        {ratios && (
          <div className="section-ratios m-4">
            <RatiosComponent ratios={ratios} />
          </div>
        )}
        {!results && (
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
        {!concallAnalysis && (
          <div className="bg-slate-700 text-white p-2 m-4 text-center">
            <button onClick={onFetchConcallAnalysis}>Fetch Concall Analysis</button>
          </div>
        )}
        {concallAnalysis && (
          <div className="section-ratios m-4">
            {/* <RatiosComponent ratios={ratios} /> */}
            <ConcallAnalysisComponent analysis={concallAnalysis} />
          </div>
        )}
      </div>
      <button onClick={onPrintState}>Print State</button>
    </div>
  );
};

export default SearchComponent;
