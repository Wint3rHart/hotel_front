import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { delay, motion, stagger } from "framer-motion";
import { useEffect, useMemo, useReducer } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useData from "./useData";
import NavBar from "./NavBar";
import useGeneralStore from "./useGeneralStore";
import useSignStore from "./useSignStore";
import { Blurhash } from "react-blurhash";

const blur_fnx = (state, action) => {
  return { ...state, [action.src]: true };
};

function App() {
  const nav = useNavigate();
  const type = useGeneralStore((x) => x.data);
  let [blur, setBlur] = useReducer(blur_fnx, {});

  let variants = {
    initial: { x: "-100px" },
    animate: { x: 0, transition: { duration: 0.2, delayChildren: 0.2 } },
    exit: { x: "150px", opacity: 0, transition: { duration: 0.2, delayChildren: 0.2 } },
  };

  let childvariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0 },
  };

  console.log("appjs rendered");

  const { data, isLoading } = useData(type.type, "hotels", type.type == "custom" && type.search);
  let status = useSignStore((x) => x.fields);

  useEffect(() => {
    console.log(blur, data && blur[data[0]?.urls?.url]);
  }, [blur, data]);

  useEffect(() => {
    data&&console.log(data);
    
    data &&
      data.forEach((x) => {
        const image = new Image();
        image.src = x.urls.url;
        image.onload = () => {
          setBlur({ src: x.urls.url });
        };
      });
  }, [data]);

  let memo = useMemo(() => {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-gray-800"
      >
        {isLoading ? (
          <h1 className="text-3xl font-bold text-center">LOADING...</h1>
        ) : (
          data &&
          data.map((x, i) => (
            <motion.div
              variants={childvariants}
              key={i}
              className="flex flex-col relative border-2 border-purple-500 hover:border-gray-300 rounded-lg overflow-hidden shadow-md transition-all duration-300 group w-full h-[400px]"
            >
              <span onClick={()=>{nav(`/reviews/${encodeURIComponent(x._id)}`)}} className="absolute   text-gray-200 hover:text-purple-600 cursor-pointer hover:scale-98 text-2xl  translate-x-36 scale-y-0 group-hover:scale-y-100 z-5 origin-top transition-all  font-black  ">Reviews</span>
              {blur[x.urls.url] ? (
                <img
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" 
                  className="w-[400px] h-[250px] object-fit group-hover:brightness-80 transition-transform duration-300 group-hover:scale-105"
                  src={x.urls.url}
                  alt={x.hotelName}
                 
                />
              ) : (
                <Blurhash
                  hash={x.urls.blur}
                  width="100%"
                  height="100%"
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                />
              )}
              <h2 className="text-2xl font-extrabold mt-7 sm:mt-6 text-center text-white group-hover:text-purple-500 transition-colors duration-300">
                {x.hotelName}
              </h2>
              <div className="flex justify-center space-x-6 mt-4">
                <button
                  className="text-lg sm:text-xl font-black text-purple-600 group-hover:text-gray-300 cursor-pointer hover:text-purple-500 transition"
                  onClick={() => nav(`/details?id=${x._id}`)}
                >
                  Details
                </button>
                <button
                  className="text-lg sm:text-xl font-black text-purple-600 group-hover:text-gray-300 cursor-pointer hover:text-purple-500 transition"
                  onClick={() =>
                    nav(`/book/${encodeURIComponent(x._id)}`, { state: { types: x.rooms[0].category } })
                  }
                >
                  Book
                </button>
              </div>
              <div className="border-t-2 border-purple-500 w-2/3 sm:w-0 transition-all duration-500 sm:group-hover:w-2/3 mx-auto mt-4"></div>
            </motion.div>
          ))
        )}
      </motion.div>
    );
  }, [data, isLoading, blur]);

  return memo;
}

export default App;
