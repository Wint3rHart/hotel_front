import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGeneralStore from './useGeneralStore'

function NavBar() {

let type_fnx=useGeneralStore(x=>x.fnx.setType)
  let nav = useNavigate()
  let [rate, setRate] = useState(3)
useEffect(()=>{console.log(rate);
},[rate])
  return (
    <div className='w-full flex justify-evenly items-center top-0 bg-blue-900 mt-5 fixed z-1 h-20 border-black border-2 '>



      <span className='font-black text-white hover:text-teal-300 text-4xl text-black cursor-pointer' onClick={() => { nav('/register') }}>SignUp</span>
      <span className='font-black text-white hover:text-teal-300 text-4xl text-black cursor-pointer' onClick={() => { nav('/') }}>Home</span>
      
      <input type='range' min='3' max='5' onChange={(e)=>{console.log(e.target.value);
      }} className='bg-white'/>
      <select onChange={(e)=>{type_fnx(e.target.value)}}>
        <option>All</option>
      <option>5-star</option>
      <option>4-star</option>
      <option>3-star</option>
      </select>

    </div>
  )
}

export default NavBar