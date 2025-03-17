import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGeneralStore from './useGeneralStore'
import useSignStore from './useSignStore'
import useData from './useData'
import usePost from './usePost'
import { animate } from 'framer-motion'
import { motion } from 'framer-motion'

function NavBar() {

  let variants={initial:{opacity:0},animate:{opacity:1,transition:{duration:0.2, delayChildren: .3,staggerChildren:.5}},exit:{opacity:0,transition:{duration:.3}}};

let childvariants={initial:{opacity:0},animate:{opacity:1,transition:{duration:.5}},exit:{opacity:0,transition:{duration:.3}}}

let type_fnx=useGeneralStore(x=>x.fnx.setType)
  let nav = useNavigate()
  let [search, setsearch] = useState('');
let user=useSignStore(state=>state.fields);
let type=useGeneralStore(x=> x.data.type);
let search_fnx=useGeneralStore(state=> state.fnx.set_Search);
let {mutate,data,isSuccess}=usePost("signOut");
let signout=useSignStore(x=> x.fnx.set_signOut)
console.log('navjs rendered');

useEffect(()=>{ if (search.length>0) {
type!="custom"&&type_fnx("custom");
search_fnx(search);

} 
else{type_fnx('All')}


},[search])
  useEffect(()=>{console.log(data);
  },[data])
const signOut_fnx=async ()=>{await mutate()  }

  return (
    <motion.div variants={variants} initial='initial' animate='animate' className='w-full flex justify-evenly items-center top-0  border-b-1 border-t-1  sm:border-t-2 sm:border-b-2 bg-purple-900/25 border-purple-600 mt-5 fixed z-1 h-20 border-black  '>



      <motion.span variants={childvariants}  className='font-black    text-white hover:text-purple-400 hover:scale-99 transition-all  sm:text-2xl text-lg cursor-pointer' onClick={() => { nav('/register') }}>SignUp</motion.span>
      <motion.span variants={childvariants} className='font-black text-white hover:text-purple-400 hover:scale-99 transition-all sm:text-2xl text-lg cursor-pointer'  onClick={() => { nav('/') }}>Home</motion.span>
      <motion.ul variants={childvariants} className='font-black relative  group text-white hover:text-purple-400 hover:scale-99 transition-all sm:text-2xl text-lg cursor-pointer h-full mt-12  '  >{user.sign_status?user.name.toUpperCase():'not signed in'}
<motion.div variants={childvariants} className='absolute hover:border-gray-300 -translate-y-15 scale-0 group-hover:scale-100 transition-all duration-400 group-hover:translate-y-7 left-2 px-2 border-1 border-purple-500 text-center text-purple-200 rounded-lg bg-purple-500/50'>
<li className='text-lg p-2 hover:scale-99' onClick={() => { nav( user.sign_status&&`/user/${encodeURIComponent(user.user_id)}`)}}>View Profle</li>
<li className='text-lg p-2 hover:scale-99' onClick={()=>{signOut_fnx()}}>SignOut</li>
</motion.div>
      </motion.ul>
    <motion.input variants={childvariants} type='search' value={search} onChange={(e)=>{ setsearch(x=> x=e.target.value) }} className='border-2  rounded-lg text-white'/>
      <motion.select  variants={childvariants} className='border-2 transition-all duration-300 border-purple-400  rounded-full p-2 text-white bg-black hover:border-white'  onChange={(e)=>{type_fnx(e.target.value)}}>
        <option>All</option>
      <option>5-star</option>
      <option>4-star</option>
      <option>3-star</option>
      </motion.select>

    </motion.div>
  )
}

export default React.memo(NavBar)