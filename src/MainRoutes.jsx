import React, { lazy, Suspense } from 'react'
import { Routes,Route } from 'react-router-dom'
import Detail from './Detail.jsx';
import NavBar from './NavBar'
import Book_Menu from './Book_Menu.jsx';


function MainRoutes() {
 
let Home=lazy(()=>{return import('./Home.jsx')});
let Cards=lazy(()=>{return import('./App.jsx')})
let Register=lazy(()=>{return import('./Sign.jsx')});
let Detail=lazy(()=>{return import('./Detail.jsx')})
  return (

<div>
     <NavBar/>
    <div  className='bg-gray-300 text-gray-800 flex justify-center  mt-30  '>
       
<Routes>
<Route  path='/' element={
  <Suspense fallback={<h1>LOADING...</h1>} >
<Home/>
</Suspense>}/>   


<Route path='/cards' element={<Suspense fallback={<h1>LOADING...</h1>}> <Cards/> </Suspense>} /> 

<Route path='details' element={<Suspense fallback={<h1>LOADING...</h1>} >
<Detail/>
</Suspense>} /> 



<Route   path='/register'  element={<Suspense fallback={<h1>LOADING...</h1>}>  <Register/>  </Suspense> }  />



<Route path='/book/:id' element={<Book_Menu/>} />
</Routes>
    </div></div>
  )
}

export default MainRoutes