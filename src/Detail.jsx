import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useData from './useData';
import { motion } from 'framer-motion';
import { Blurhash } from 'react-blurhash';


function Detail() {
  let variants={initial:{x:'-100px'},animate:{x:0,transition:{duration:.2,delayChildren:.3}},exit:{x:'-150px',opacity:0,transition:{duration:.2,delayChildren:.2,staggerChildren:.3}}};
  let childvariants={initial:{opacity:0},animate:{opacity:1,transition:{duration:.2}},exit:{opacity:0}}
  

let [searchParam,setSearch]=useSearchParams();
let nav=useNavigate()


let {data,isLoading,error}=useData(searchParam.get('id'),'details');
let [display,setDisplay]=useState(null );
let [blur,setBlur]=useReducer((state,action)=>{ return {...state,[action.url]:true}},{})



let memo=useMemo(()=>data ? (
  data.map((x, i) => (
    <motion.div variants={childvariants}   key={i} className="p-4 h-full  rounded-lg shadow-md bg-gray-900/20 ">
      <motion.div variants={childvariants} className="space-y-2 mt-2">
        <h1 className="text-4xl font-bold text-purple-400">{x.hotelName}</h1>
        <h3 className="text-lg font-medium text-purple-500">
          Rating: <span className="text-lg font-medium text-gray-200">{x.rating}</span>
        </h3>
        <p className="text-base text-gray-300">{x.detail}</p>
        <h4 className="text-base font-semibold text-purple-500">
          Location: <span className="text-lg font-medium text-gray-200">{x.location}</span>
        </h4>
      </motion.div>
      <motion.div variants={childvariants} className="flex flex-wrap justify-center h-1/2 gap-4 mt-4">
        {x.rooms.map((y, j) => (
          <div
            key={j}
            className="p-10 border rounded-md bg-gray-800/20 border-purple-500 shadow-sm w-60 transition-all duration-300 hover:bg-gray-700/30"
          >
            <h2 className="text-lg font-semibold text-gray-300">{y.category}</h2>
            <h3 className="text-base font-semibold text-purple-400">${y.perNight} per night</h3>
            <ul className="text-sm text-gray-300 font-semibold list-disc pl-4">
              Facilities:
              {y.facilities.map((z, k) => (
                <li className="font-medium text-gray-200 mt-2" key={k}>
                  {z}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </motion.div>
  ))
) : (
  <h1 className="text-center text-xl font-semibold text-gray-300">LOADING...</h1>
),[data,isLoading])

let cards=useMemo(()=>data &&
data[0].detPics.map((x) => (
 blur[x.url]? <img
    onClick={(e) => {
      setDisplay((x) => (x = e.target.src));
    }}
    className="p-2 h-[100px] sm:w-[200px] cursor-pointer  hover:border-purple-500 transition-all duration-300 rounded-md"
    src={x.url} loading='lazy'
  />:<Blurhash
  hash={x.blur}
  width="100%"
  height="100%"
  resolutionX={32}
  resolutionY={32}
  punch={1}
/>
)),[data,isLoading,blur])

useEffect(()=>{ console.log(data);data?.[0].detPics&&setDisplay(x=> x=data[0].detPics[3].url);

 data?.[0].detPics&&data[0].detPics.forEach((x)=>{  const img=new Image();img.src=x.url;img.onload=()=>{setBlur({url:x.url})}   })



   },[data])

useEffect(()=>{console.log(blur);
},[blur])

  return (

    // data?.[0].imageUrl?data[0].imageUrl:''
    <motion.div variants={variants}  initial='initial' animate='animate' exit='exit' className="z-0 flex mt-10 flex-col justify-center items-center sm:flex-row sm:items-start justify-evenly relative text-center">
    
    <span
        className="absolute text-gray-300 top-0 cursor-pointer left-1/2 border  inline-block  border-purple-500 hover:border-gray-300 -translate-y-10 py-2 px-3 bg-gray-400/25 rounded-lg transition-all duration-300 hover:text-gray-200"
        onClick={() => {
          nav('/cards');
        }}
      >
        Back
      </span>

      <div className='z-0 flex mt-5 flex-col items-center border border-purple-400 rounded-xl hover:border-gray-300 transition-all duration-300 h-full w-[90%] sm:flex-row sm:items-start justify-evenly relative text-center'>
    <div>
      
  
      <img className="h-80 sm:h-120 w-4xl p-2 sm:p-5 shadow-md rounded-lg" src={display}  />
  
      <div className="flex  flex-wrap sm:flex-nowrap justify-center h-20">
        {cards}
      </div>
    </div>
  
    <div className="flex flex-col mt-40 sm:mt-0  h-full sm:w-1/2 space-y-6">
      {memo}
    </div></div>
  </motion.div>
  
    
  )
}

export default Detail;