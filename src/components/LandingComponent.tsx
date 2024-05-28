import NavbarComponent from "./NavbarComponent";
import USP from "./USP";
import { useNavigate } from "react-router-dom";

const LandingComponent = () => {
  const navigate = useNavigate();
  const onSearch = () => {
    navigate("/search");
  };
  return (
    <div className="relative bg-slate-100">
      <NavbarComponent brand="Smart Investor" menu="Login" />
      <div className="position-center flex justify-center items-center md:h-screen">
        <div className="content-center w-3/4 h-1/2 flex justify-center items-center mt-12 border-2 border-slate-100">
          <div className="content p-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center my-8">Welcome to Smart Investor</h1>
            <h1 className="text-lg md:text-xl lg:text-2xl text-center mt-2 mb-8">What would you like to do today?</h1>
            <ul className="usps flex flex-col md:flex-row gap-8">
              <USP
                title="Visualize Growth Numbers"
                text="Effortlessly track and analyze your investment growth with dynamic and interactive charts"
                icon="visualize"
              />
              <USP
                title="Track Equities"
                text="Stay informed with real-time updates and comprehensive insights on your equity investments"
                icon="track"
              />
              <USP
                title="Compare Industry Peers"
                text="Evaluate your investments against industry peers with detailed comparative analysis"
                icon="compare"
              />
            </ul>
            <div className="flex justify-center">
              <button
                className="mt-16 bg-slate-700 text-white px-24 py-2 text-lg flex justify-center shadow-2xl transform transition duration-400 hover:scale-110"
                onClick={onSearch}
              >
                Click here to begin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingComponent;
