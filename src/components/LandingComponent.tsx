import NavbarComponent from "./NavbarComponent";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import USP from "./USP";

const LandingComponent = () => {
  return (
    <div className="relative bg-slate-100">
      <NavbarComponent brand="Smart Investor" menu="Login" />
      <div className="position-center flex justify-center items-center md:h-screen">
        <div className="content-center w-3/4 h-1/2 flex justify-center items-center mt-12 border-2 border-slate-100">
          <div className="content p-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center my-8">Smart Investor</h1>
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
              {/* <li className="usp px-4 py-2 text-lg">
                <p>
                  <span></span>Visualize Growth Stats
                </p>
              </li>
              <li className="usp px-4 py-2 text-lg">
                <p>
                  <span></span>Track Equities
                </p>
              </li>
              <li className="usp px-4 py-2 text-lg">
                <p>
                  <span></span>Compare Industry Peers
                </p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingComponent;
