import QueryStatsIcon from "@mui/icons-material/QueryStats";
import InsightsIcon from "@mui/icons-material/Insights";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const USP = ({ title, text, icon }: { title: string; text: string; icon: string }) => {
  return (
    <div className="flex-1 border-2 border-slate-700 rounded-lg">
      <div className="heading text-md md:text-lg  text-center p-2 bg-slate-700 text-slate-300">
        <div className="icon mb-1">
          {icon === "visualize" && <QueryStatsIcon />}
          {icon === "track" && <InsightsIcon />}
          {icon === "compare" && <CompareArrowsIcon />}
        </div>
        <h1 className="">{title}</h1>
      </div>
      <p className="text-md text-center p-4">{text}</p>
    </div>
  );
};

export default USP;
