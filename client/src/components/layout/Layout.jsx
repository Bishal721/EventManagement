import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="md:min-w-[100px] min-h-[80vh] my-0 mx-auto md:container  ">
        {children}
      </div>
    </>
  );
};

export default Layout;
