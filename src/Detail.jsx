import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useData from './useData';

function Detail() {


let [searchParam,setSearch]=useSearchParams();
let nav=useNavigate()

let {data,isLoading,error}=useData(searchParam.get('id'),'details');


useEffect(()=>{ console.log(data);
   },[data])

  return (

    
    <div className='z-0  flex mt-10  flex-col items-center sm:flex-row sm:items-start  justify-evenly relative   text-center'>

<div>
      <span className='absolute text-white top-0 cursor-pointer left-1/2' onClick={()=>{nav('/cards')}}>Back</span>
      <img className='h-80 sm:h-120 w-4xl p-2 sm:p-5'  src={data?.[0].imageUrl?data[0].imageUrl:''}/>
      <div className='border-3   h-20'></div>
      </div>     
      
      <div className="flex flex-col mt-10 w-1/2 space-y-6">
  {data ? (
    data.map((x, i) => (
      <div key={i} className="p-4  h-full rounded-lg shadow-md ">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">{x.hotelName}</h1>
          <h3 className="text-lg font-medium text-gray-600">Rating: <span className='text-lg font-medium text-blue-500'> {x.rating} </span>  </h3>
          <p className="text-base text-gray-700">{x.detail}</p>
          <h4 className="text-base font-semibold text-gray-500">Location: <span className='text-lg font-medium text-blue-500'> {x.location} </span></h4>
        </div>
        <div className="flex flex-wrap justify-center   h-1/2 gap-4 mt-4">
          {x.rooms.map((y, j) => (
            <div key={j} className="p-10 border rounded-md bg-white shadow-sm w-60">
              <h2 className="text-lg font-semibold text-gray-700">{y.category}</h2>
              <h3 className="text-base font-semibold text-blue-500">${y.perNight} per night</h3>
              <ul className="text-sm text-gray-600  font-semibold list-disc pl-4">
                Facilities:
                {y.facilities.map((z, k) => (
                  <li className='font-medium' key={k}>{z}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    ))
  ) : (
    <h1 className="text-center text-xl font-semibold text-gray-700">LOADING...</h1>
  )}
</div>
    </div>
    
  )
}

export default Detail;