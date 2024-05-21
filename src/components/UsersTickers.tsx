import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Ticker {
  _id: string;
  ticker: string;
}

interface UsersTickerProps {
  editable: boolean;
  usersTickers: Ticker[];
  onTickerRemove: (id: string) => void;
  onSave: () => void;
  clearAll: () => void;
  onTickerClick: (id: string) => void;
}

// const UsersTickers = ({ editable, usersTickers }: { editable: boolean; usersTickers: Ticker[] }) => {
const UsersTickers = ({
  editable,
  usersTickers,
  onTickerRemove,
  onSave,
  clearAll,
  onTickerClick,
}: UsersTickerProps) => {
  const handleOnSave = () => {
    onSave();
  };

  const handleClearAll = () => {
    clearAll();
  };

  const handleTickerClick = (id: string) => {
    onTickerClick(id);
  };

  const handleOnTickerRemove = (id: string) => {
    onTickerRemove(id);
  };

  return (
    <>
      <div className="usersTickers border-2 border-slate-700 py-4 my-2">
        <div className="section-navbar flex">
          <div className="flex-1">
            <h1 className="text-lg px-2 py-1">Your Tickers</h1>
          </div>
          {editable && (
            <div className="flex-1 flex px-2">
              <div className="ml-auto">
                <button className="text-lg px-2 py-1 text-white bg-slate-700 mx-4" onClick={handleOnSave}>
                  Save
                </button>
                <button className="text-lg px-2 py-1 text-white bg-slate-700" onClick={handleClearAll}>
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="tickers flex flex-wrap">
          {usersTickers.map((ticker) => (
            <div key={ticker["_id"]} className="border-2 border-slate-700 m-2">
              <button className="ticker py-2 px-8" onClick={() => handleTickerClick(ticker["ticker"])}>
                {ticker["ticker"]}
              </button>
              {editable && (
                <div className="flex p-1">
                  <button onClick={() => handleOnTickerRemove(ticker["_id"])} className="m-auto">
                    <DeleteOutlineIcon />
                  </button>{" "}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersTickers;
