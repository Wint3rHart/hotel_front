import React, { lazy, Suspense, useEffect, useState,useRef } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import useRefresh from './useRefresh';
import useSignStore from './useSignStore';
import { AnimatePresence } from 'framer-motion';


let Home=lazy(()=>{return import('./Home.jsx')});
let Cards=lazy(()=>{return import('./App.jsx')})
let Register=lazy(()=>{return import('./Sign.jsx')});
let Detail=lazy(()=>{return import('./Detail.jsx')});
let Book_Menu=lazy(()=>{return import('./Book_Menu.jsx')})
let User_panel=lazy(()=>{return import('./User_panel.jsx')});
let Reviews=lazy(()=>{return import('./Reviews.jsx')})


function MainRoutes() {
 

//states


let ref=useRef(null);
let loc=useLocation();

//hooks
let {mutate,error,data,isPending,isSuccess}=useRefresh()
let sign_status=useSignStore(x=> x.fields.sign_status);
let login_fnx=useSignStore(x=> x.fnx.set_Login);

//useeffects
useEffect(()=>{
 error&&ref.current?ref.current.innerText='Login Failed,Try Again':!sign_status&&data&&login_fnx(data)

 if( sign_status&&ref.current)ref.current.innerText='Logged In'
let x= setTimeout(() => {
 isSuccess||error&&ref?.current?ref.current.style.scale=0:null
}, 1500);

 
 
  
  return ()=> clearTimeout(x)
  },[data,error,sign_status])

useEffect(()=>{!sign_status&&mutate();ref?.current?ref.current.style.scale=1:null },[])



console.log('parent rendered');


  return (

<div>
     {/* <NavBar/> */}
    <div  className='text-gray-800 flex border-5 border-purple-900/25 rounded-xl  overflow-hidden justify-center  mt-30  '>
       
<div ref={ref} className={` flex justify-center  scale-0 items-center text-white font-black text-xl transition-all duration-300  absolute left-0 border-1 rounded-lg  border-white z-1 bg-purple-600/25  sm:h-30 sm:w-70 animate-pulse`}>Loggin In</div>
<AnimatePresence mode='wait'>

<Routes location={loc} key={loc.key}>
<Route  path='/' element={
  <Suspense fallback={<h1>LOADING...</h1>} >
<Home/>
</Suspense>}/>   


<Route path='/cards' element={<Suspense fallback={<h1>LOADING...</h1>}> <Cards/> </Suspense>} /> 

<Route path='details' element={<Suspense fallback={<h1>LOADING...</h1>} >
<Detail/>
</Suspense>} /> 



<Route   path='/register'  element={<Suspense fallback={<h1>LOADING...</h1>}>  <Register/>  </Suspense> }  />



<Route path='/book/:id' element={<Suspense fallback={<h1>LOADING...</h1>}><Book_Menu/></Suspense> } />

<Route   path='/user/:id'  element={<Suspense fallback={<h1>LOADING...</h1>}> <User_panel/></Suspense> }  />

<Route path='/reviews/:id'   element={<Suspense fallback={<h1>LOADING...</h1>}> <Reviews/>  </Suspense>}  />

</Routes>
</AnimatePresence>
    </div></div>
  )
}

export default MainRoutes