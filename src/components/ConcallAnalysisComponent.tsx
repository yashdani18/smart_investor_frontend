import Criteria from "./Criteria";

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

type CAProps = {
  analysis: ConcallAnalysis;
};

const ConcallAnalysisComponent = ({ analysis }: CAProps) => {
  return (
    <div className="border-2 border-slate-700">
      <div className="box-heading-score flex px-4 pt-4">
        <div className="header flex-1">
          <h1 className="title text-2xl">Most recent conference call analysis</h1>
          <h1 className="subtitle text-lg">
            <em>Using gpt-4-turbo</em>
          </h1>
        </div>
        <div className="score flex-1 text-right">
          <button className="score-circle border-2 border-slate-700 w-16 h-16 text-4xl" style={{ borderRadius: "50%" }}>
            {analysis["score"]["value"]}
          </button>
          <div className="text-xs mr-2">Out of 10.</div>
        </div>
      </div>
      <div className="box-criteria">
        <Criteria title={analysis["criteria"][0]["title"]} text={analysis["criteria"][0]["text"]} />
        <Criteria title={analysis["criteria"][1]["title"]} text={analysis["criteria"][1]["text"]} />
        <Criteria title={analysis["criteria"][2]["title"]} text={analysis["criteria"][2]["text"]} />
      </div>
      <div className="box-caution">
        <h1 className="text-md text-red-500 m-4">{"Caution: " + analysis["caution"]}</h1>
      </div>
    </div>
  );
};

export default ConcallAnalysisComponent;
