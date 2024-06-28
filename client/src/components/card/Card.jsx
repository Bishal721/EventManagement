const Card = ({ children }) => {
  return (
    <div className="relative flex max-w-[24rem] flex-col rounded bg-white bg-clip-border text-gray-700 shadow-md">
      {children}
    </div>
  );
};

export default Card;
