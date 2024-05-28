const Criteria = ({ title, text }: { title: string; text: string }) => {
  return (
    <>
      <div className="criteria border-2 border-slate-700 m-4">
        <div className="title mx-4 mt-4 mb-2 text-lg">{title}</div>
        <div className="text mx-4 mb-4 text-sm">{text}</div>
      </div>
    </>
  );
};

export default Criteria;
