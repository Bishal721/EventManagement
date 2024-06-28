import React from "react";
import heroImage from "../../assets/heroImage.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const styles = {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <>
      <section className="relative h-screen" style={styles}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full w-full flex flex-col justify-center md:px-10 lg:px-20 xl:px-32">
          <h3 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mt-20 capitalize">
            Transforming Ideas into Events
          </h3>
          <button
            className="w-28 md:w-36 p-2 mt-6 text-white font-medium rounded-sm bg-orange-400 hover:bg-orange-300"
            onClick={() => navigate("/events")}
          >
            View Events
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
