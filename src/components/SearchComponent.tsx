import axios from "axios";
import { top_10_it_companies } from "../helper/constants";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import ResultsComponent from "./ResultsComponent";
import RatiosComponent from "./RatiosComponent";
import ConcallAnalysisComponent from "./ConcallAnalysisComponent";
import FinancialScoreComponent from "./FinancialScoreComponent";

/**
 * Type definitions mapping to content in database
 */
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

  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const [isError, setIsError] = useState<boolean>(false);

  const [ratios, setRatios] = useState<Ratios>();
  const [allRatios, setAllRatios] = useState<Ratios[]>([]);

  const [results, setResults] = useState<Results>();
  const [allResults, setAllResults] = useState<Results[]>([]);

  const [concallAnalysis, setConcallAnalysis] = useState<ConcallAnalysis>();
  const [allConcallAnalysis, setAllConcallAnalysis] = useState<ConcallAnalysis[]>([]);

  const [financialScore, setFinancialScore] = useState<FinancialScore>();
  const [allFinancialScores, setAllFinancialScores] = useState<FinancialScore[]>([]);

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  /**
   *
   * @param delay - Positive number denoting time in ms
   * @returns a promise that would resolve in 'delay' ms
   */
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  /**
   * Fetches summary score for a given stock ticker
   *
   * @param ticker - Stock ticker for fetching data
   * @param index - positive number indicating position in list
   */
  const onTickerSelect = async (ticker: string, index: number) => {
    setCurrentTicker(ticker);
    setCurrentIndex(index);

    setRatios(undefined);
    setResults(undefined);
    setConcallAnalysis(undefined);

    // Show cached results if data is already fetched
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
      setFetchingData(true);
      setFinancialScore(undefined);
      axios
        .get(`${rootURL}/api/ticker/score/` + ticker)
        .then(async (response) => {
          await timeout(1000);
          setFetchingData(false);
          setFinancialScore(response.data);
          let newAllScores = [...allFinancialScores];
          newAllScores[index] = response.data;
          setAllFinancialScores(newAllScores);
        })
        .catch(() => console.log("error"));
    } else {
      setFinancialScore(allFinancialScores[index]);
    }
  };

  /**
   * Fetches fundamental ratios for the currently selected ticker
   * @returns void
   */
  const onFetchRatios = async () => {
    if (currentTicker === "") {
      setIsError(true);
      await timeout(3000);
      setIsError(false);
      return;
    }
    if (allRatios[currentIndex] === undefined) {
      setFetchingData(true);
      setRatios(undefined);
      axios
        .get(`${rootURL}/api/ticker/ratios/` + currentTicker)
        .then(async (response) => {
          await timeout(1000);
          setFetchingData(false);
          setRatios(response.data);

          let newAllRatios = [...allRatios];
          newAllRatios[currentIndex] = response.data;
          setAllRatios(newAllRatios);
        })
        .catch(() => console.log("Error"));
    } else {
      setRatios(allRatios[currentIndex]);
      // setResults(allResults[index]);
    }
  };

  /**
   * Fetches financial results for the currently selected ticker
   * @returns void
   */
  const onFetchResults = async () => {
    if (currentTicker === "") {
      setIsError(true);
      await timeout(3000);
      setIsError(false);
      return;
    }
    if (allResults[currentIndex] === undefined) {
      setFetchingData(true);
      setResults(undefined);
      axios
        .get(`${rootURL}/api/ticker/results/` + currentTicker)
        .then(async (response) => {
          await timeout(1000);
          setFetchingData(false);

          setResults(response.data);

          let newAllResults = [...allResults];
          newAllResults[currentIndex] = response.data;
          setAllResults(newAllResults);
        })
        .catch(() => console.log("error"));
    } else {
      setResults(allResults[currentIndex]);
    }
  };

  /**
   * Fetches conference call analysis for the currently selected ticker
   * @returns void
   */
  const onFetchConcallAnalysis = async () => {
    if (currentTicker === "") {
      setIsError(true);
      await timeout(3000);
      setIsError(false);
      return;
    }
    if (allConcallAnalysis[currentIndex] === undefined) {
      setFetchingData(true);
      setConcallAnalysis(undefined);
      axios
        .get(`${rootURL}/api/ticker/analysis/` + currentTicker)
        .then(async (response) => {
          await timeout(1000);
          setFetchingData(false);

          setConcallAnalysis(response.data);

          let newAllConcallAnalysis = [...allConcallAnalysis];
          newAllConcallAnalysis[currentIndex] = response.data;
          setAllConcallAnalysis(newAllConcallAnalysis);
        })
        .catch(() => console.log("error"));
    } else {
      setConcallAnalysis(allConcallAnalysis[currentIndex]);
    }
  };

  /**
   * Initializes arrays to hold data for already fulfilled requests
   */
  useEffect(() => {
    setAllRatios(new Array(top_10_it_companies.length));
    setAllResults(new Array(top_10_it_companies.length));
    setAllConcallAnalysis(new Array(top_10_it_companies.length));
    setAllFinancialScores(new Array(top_10_it_companies.length));
  }, []);

  return (
    <div className="container">
      <div>
        {/* Section to display the top 10 tickers in IT industry */}
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
        {/* Section to display progress bar for data fetching */}
        {fetchingData && (
          <div className="flex justify-center">
            <MoonLoader color="#36d7b7" loading={fetchingData} speedMultiplier={0.5} />
          </div>
        )}
        {/* Section to display financial score for selected ticker */}
        {financialScore && (
          <div className="section-ratios m-4 border-2 border-slate-700">
            <FinancialScoreComponent
              score={financialScore["score"]["value"]}
              reason={financialScore["score"]["reason"]}
              caution={financialScore["caution"]}
            />
          </div>
        )}
        {/* Section to display fundamental ratios for selected ticker */}
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
        {/* Section to display financial results for selected ticker */}
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
        {/* Section to display concall analysis for selected ticker */}
        {!concallAnalysis && (
          <div className="bg-slate-700 text-white p-2 m-4 text-center">
            <button onClick={onFetchConcallAnalysis}>Fetch Concall Analysis</button>
          </div>
        )}
        {concallAnalysis && (
          <div className="section-ratios m-4">
            <ConcallAnalysisComponent analysis={concallAnalysis} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
