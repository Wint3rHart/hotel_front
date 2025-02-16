import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useData from "./useData";
import NavBar from "./NavBar";
import useGeneralStore from "./useGeneralStore";

function App() {
  const nav = useNavigate();
  const type = useGeneralStore(x => x.data.type);
  const { data, isLoading } = useData(type, 'hotels');

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="grid grid-cols-1 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-100 text-gray-800">
      {isLoading ? (
        <h1 className="text-3xl font-bold text-center">LOADING...</h1>
      ) : (
        data.map((x, i) => (
          <div key={i} className="flex flex-col  border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group w-full h-[350px]">
            <img className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105" src={x.imageUrl} alt={x.hotelName} />
            <h2 className="text-2xl font-extrabold mt-3 text-center group-hover:text-blue-500 transition-colors duration-300">
              {x.hotelName}
            </h2>
            <div className="flex   justify-center space-x-6 mt-4">
              <button className="text-base font-bold text-gray-700 cursor-pointer hover:text-blue-500 transition"
                onClick={() => nav(`/details?id=${x._id}`)}>Details</button>
              <button className="text-base font-bold text-gray-700 cursor-pointer hover:text-blue-500 transition"
                onClick={() => nav(`/book/${encodeURIComponent(x._id)}`, { state: { types: x.rooms[0].category }})}>Book</button>
            </div>
            <div className="border-t-2 border-blue-500 w-0 transition-all duration-500 group-hover:w-2/3 mx-auto mt-4"></div>
          </div>
        ))
      )}
      <Outlet />
    </div>
  );
}

export default App;
