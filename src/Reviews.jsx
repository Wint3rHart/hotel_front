import React, { act, useEffect, useReducer, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import useData from './useData';
import { useParams } from 'react-router-dom';
import usePost from './usePost';
import useSignStore from './useSignStore';

function Reviews() {

  let [read,setRead]=useState({bool:false,value:null})
  let user_id=useSignStore(state=>state.fields.user_id)
let {id}=useParams();
let decode=decodeURIComponent(id);
let ref=useRef([]);
let formRef=useRef([])
let {data,isLoading}=useData(decode,"reviews");
let post=usePost('review')
useEffect(()=>{console.log(user_id?user_id:'id not present yet');
},)

let [rate,rateFnx]=useReducer((state,action)=>{if (action.type=='stars') { return {...state,stars:action.payload} 
  
} else if(action.type=='comment'){ return {...state,comment:action.payload} }  },{stars:0,comment:''})

console.log('rendeed');

useEffect(()=>{data&&console.log(data.reviews);
},[data])

useEffect(()=>{},[])


  return (
    <div className='relative min-h-150 flex justify-start items-center'>

      
<div className=' border-3 h-100 w-100 overflow-y-scroll  ' >
  {
isLoading?<h1>Loaing...</h1> :data?.reviews&&data.reviews.map((x,i)=>{return  <div className='text-white font-black border-white border-1 p-4 rounded-lg'> <p >{x.user.name}</p> <p >Ratings : {x.rating}</p> <p className={`   ${read.bool&&read.value==i?'break-words':null} overflow-hidden    max-w-40`} > Comment : {x.comment} <span className={`border-5 border-red-800 ${x.comment.length>20?"visible":"hidden"}`} onClick={()=>{setRead(x=> {return !x.bool||x.value!=i?  x={...x,bool:true,value:i} : x={...x,bool:false,value:null}   })}}>Read more</span> </p> </div>})

  }
</div>
;

 <form className='w-full p-20  border-5' onSubmit={(e)=>{e.preventDefault();post.mutate({comment:rate.comment,stars:rate.stars,user:user_id,hotel:decode});
 }} >
 <label className="block font-semibold mb-1">Rate </label>      
<div className='flex'>

           {[1,2,3,4,5].map((x,i)=> {return <div className='flex' key={i}   ref={(e)=>{ ref.current[i]=e}}>
             <motion.svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    
    stroke="yellow"
    className={`w-6  h-6  `}

    onHoverStart={()=>{for(let x=0;x<=i;x++){ref.current[x].style.fill='yellow'}}}

    onHoverEnd={()=>{ 
rate.stars==0?ref.current.forEach((x)=>{x.style.fill='transparent'}):ref.current.forEach((a,i)=> { i<=rate.stars-1?a.style.fill='yellow':a.style.fill='transparent'  })



      }}

    onClick={(e)=>{ rateFnx({type:"stars",payload:i+1});  for (let index = 0; index <= i; index++) {
      ref.current[index].style.fill='rgb(204, 178, 102)'

      
    }    }}
  >
    
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </motion.svg></div>}

)}</div>
<input type='text' ref={(e)=>{ formRef.current[1]=e}}   disabled={true} className='text-white' />
          
            <div className="mb-4">
              <label className="block font-semibold mb-1">Place a Comment</label>
              <textarea ref={(e)=>{ formRef.current[0]=e }}  onChange={(e)=>{ rateFnx({type:"comment",payload:e.target.value}) }} className="w-full border border-gray-500 rounded-md p-2" rows="3"  ></textarea>
            </div>

            { <button  type="submit" className="group   hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40  border-1 border-purple-600 transition-color duration-300 relative bg-transparent  text-purple-300 font-semibold sm:font-bold py-2 px-4 border hover:border-gray-100 cursor-pointer hover:text-white rounded-full sm:translate-x-1/4">
              Submit
            </button> }<p   className='font-black text-white -translate-y-10 translate-x-50' ></p>
          </form>


    </div>
  )
}

export default Reviews