type FSCProps = {
  score: string;
  reason: string;
  caution: string;
};

const FinancialScoreComponent = ({ score, reason, caution }: FSCProps) => {
  return (
    <>
      <div className="header flex m-4">
        <div className="basis-3/4">
          <div>
            <h1 className="text-center text-lg">Summary</h1>
            <h1 className="flex-1 text-md my-2 flex items-center">{reason}</h1>
          </div>
          <h1 className="flex-1 text-sm my-2 flex items-center text-red-500">{"Caution: " + caution}</h1>
          <h1 className="text-sm">
            <em>
              Scale (1-10) denotes strength of performance outlook based on fundamental ratios and financial results
            </em>
          </h1>
          <h1 className="text-sm mt-1">
            <em>Powered by gpt-4-turbo</em>
          </h1>
        </div>
        <div className="basis-1/4 flex justify-center items-center">
          <div className="flex justify-center">
            <button className="border-2 border-slate-700 score w-32 h-32 text-6xl" style={{ borderRadius: "50%" }}>
              {score}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialScoreComponent;
