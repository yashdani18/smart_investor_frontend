type TileProps = {
  key1: string;
  val1: string;
  key2: string;
  val2: string;
};

const Tile = ({ key1, val1, key2, val2 }: TileProps) => {
  return (
    <div className="tile flex-1 px-4 py-1 border-2 border-slate-700 m-2">
      <div className="row-key-val flex py-2">
        <h1 className="key-flex-1 text-left">
          <strong>{key1}</strong>
        </h1>
        <h1 className="val flex-1 text-right">{val1}</h1>
      </div>
      {key2.length > 0 && (
        <div className="row-key-val flex py-2">
          <h1 className="key-flex-1 text-left">
            <strong>{key2}</strong>
          </h1>
          <h1 className="val flex-1 text-right">{val2}</h1>
        </div>
      )}
    </div>
  );
};

export default Tile;
