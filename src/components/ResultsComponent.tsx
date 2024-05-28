/**
 * Type definitions mapping to content in database
 */
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

type CustomProps = {
  detail: Results;
};

const ResultsComponent = ({ detail }: CustomProps) => {
  return (
    <>
      <div className="detail-results px-4 pb-2">
        <div className="detail-result-q">
          <h1 className="text-lg text-center m-2">Quarterly results</h1>
          <table className="table-auto w-full text-center">
            <thead>
              <tr className="sm:overflow-auto">
                <th className="border-2 border-slate-700">Quarters</th>
                {detail.quarterlyData.quarters.map((quarter) => (
                  <th key={quarter} className="border-2 border-slate-700">
                    {quarter}
                  </th>
                ))}
              </tr>
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
                {detail.quarterlyData.q_pat.map((profit, index) => (
                  <td key={index} className="cell pt-12">
                    {profit}
                  </td>
                ))}
              </tr>
              {/* <tr className="border-b-2 border-slate-700"> */}
              <tr>
                <td className=""></td>
                {detail.quarterlyData.q_pat_percent.map((percent, index) => (
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
          <h1 className="text-lg text-center m-2">Annual results</h1>
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="border-2 border-slate-700">Years</th>
                {detail.annualData.years.map((year) => (
                  <th key={year} className="border-2 border-slate-700">
                    {year}
                  </th>
                ))}
              </tr>
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
                {detail.annualData.a_pat.map((profit, index) => (
                  <td key={index} className="cell pt-12">
                    {profit}
                  </td>
                ))}
              </tr>
              {/* <tr className="border-b-2 border-slate-700"> */}
              <tr>
                <td className=""></td>
                {detail.annualData.a_pat_percent.map((percent, index) => (
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
        <h1 className="text-sm mt-12">
          <em>
            Powered by{" "}
            <a href="https://www.screener.in/" target="blank">
              Screener
            </a>
          </em>
        </h1>
      </div>
    </>
  );
};

export default ResultsComponent;
