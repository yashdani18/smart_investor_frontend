import NavbarComponent from "./NavbarComponent";
import USP from "./USP";
// import { useEffect } from "react";
// import axios from "axios";

// type Ticker = {
//   _id: string;
//   ticker: string;
// };

const LandingComponent = () => {
  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:4000/api/ticker")
  //     .then((response) => {
  //       console.log(response.data);
  //       const tickers = response.data;
  //       tickers.map((ticker: Ticker) => {
  //         console.log(ticker["_id"], ticker["ticker"]);
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
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
