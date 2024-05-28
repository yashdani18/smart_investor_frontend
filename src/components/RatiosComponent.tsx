import Tile from "./Tile";

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

type RatiosProps = {
  ratios: Ratios;
};

const RatiosComponent = ({ ratios }: RatiosProps) => {
  return (
    <>
      <div className="content-ratios pb-4 border-2 border-slate-700">
        {/* <h1 className="text-xl text-center mt-4">{ratios["ticker"]}</h1> */}
        {/* <div className="ss-deviation-box flex justify-center px-4">
    <div className="ss-deviation-content w-96">
      <h1 className="text-lg text-center m-2">Deviation from 52-week high</h1>
      <div className="ss-deviation-line h-2 bg-slate-700 mt-4 mb-2 relative">
        <div className="absolute top-4 -left-4">{ratios["low"]}</div>
        <div className="absolute top-4 -right-4">{ratios["high"]}</div>
      </div>
      <div className="text-center m-2">{ratios["price"]}</div>
    </div>
  </div> */}
        <div className="ss-valuation">
          <h1 className="text-lg text-center m-2 mt-4">Valuation Ratios</h1>
          <div className="tiles-valuation flex flex-col lg:flex-row m-2">
            <Tile
              key1="Price"
              val1={ratios["price"] + ""}
              key2="From 52-wk high"
              val2={(((ratios["high"] - ratios["price"]) / ratios["high"]) * 100).toFixed(2) + "%"}
            />
            <Tile key1="P/E ratio" val1={ratios["stockPE"] + ""} key2="Industry PE" val2={ratios["industryPE"] + ""} />
            <Tile
              key1="Intrinsic Value"
              val1={ratios["intrinsicValue"] + ""}
              key2="Graham Number"
              val2={ratios["grahamNumber"] + ""}
            />
          </div>
        </div>
        <div className="ss-efficiency">
          <h1 className="text-lg text-center m-2">Efficiency Ratios</h1>
          <div className="tiles-valuation flex flex-col lg:flex-row m-2">
            <Tile key1="ROE" val1={ratios["roe"] + ""} key2="" val2="" />
            <Tile key1="ROCE" val1={ratios["roce"] + ""} key2="" val2={""} />
            <Tile key1="CFO/PAT" val1={(ratios["cfo"] / ratios["pat"]).toFixed(2) + ""} key2="" val2={""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RatiosComponent;
