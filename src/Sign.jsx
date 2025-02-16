import { DevTool } from '@hookform/devtools';
import React, { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import usePost from './usePost';
import useGeneralStore from './useGeneralStore';
import selectors from './useGeneralStore';
import useSignStore from './useSignStore';

function Sign() {
//states and Refs
  let ref=useRef(null)
  let [reg,setReg]=useState(true);
let user_fnx=useGeneralStore(state=>state.fnx.set_user)
let login_global_fnx=useSignStore(x=> x.fnx.set_Login)
let debug=useSignStore(x=>x.fields)
  //TanStack 
let {mutate,isError,error,isLoading,data}=usePost(reg?'register':"sign");

//RHF
let  {register,handleSubmit,formState,control}=useForm({defaultValues:{name:'',email:'',password:'',confirmPassword:'',file:null}})
let {errors,isValid}=formState;

useEffect(()=>{console.log(debug);
},[debug])


//Use Effects
useEffect(()=>{ if (data&&data.dets) {

  ;login_global_fnx(data)
} else if(data){console.log(data);
}  },[data])

useEffect(()=>{  errors.name&& console.log(errors.name.message)
},[errors])

useEffect(()=>{
  
  // let x=useGeneralStore.subscribe((state)=>{return state.data},(x)=>{console.log(x);
// })  

let y=useSignStore.subscribe((state)=>{ return state.fields},(x)=>{console.log(x);
})
return ()=>{y()}


},[])

  return (
     <div className='flex justify-center h-250  items-center w-500 ' >

<section className=" shadow-2xl rounded-2xl p-8 w-full bg-white max-w-md">
        <div className="flex items-center justify-center mb-6">
          <button    onClick={()=>{setReg(x=> x=false)}}
            
            className="w-1/3  pb-4 font-medium text-center text-gray-500 capitalize border-b hover:text-blue-500"
          >
            Sign In
          </button>

          <button  onClick={(x)=> {setReg(x=> x=true)}}
            
            className="w-1/3 pb-4 font-medium text-center text-black capitalize border-b-2 border-blue-500"
          >
            Sign Up
          </button>
        </div>

        <form  onSubmit={handleSubmit((data)=>{
        mutate(data)
        ;user_fnx(data)
        })} className="space-y-6">
          <div className="relative">
            
            <input
              type="text"
              placeholder="Username"
              className="w-full py-3 pl-12 pr-4 text-black bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('name',{required:"Cant be Empty",pattern:'',validate:(value)=>{if ( value.length<6) {
                return "Must Have 6 Characters"
              } else {return true} }})}
            />
          </div>
          {reg&&<label
            htmlFor="dropzone-file"
            className="flex items-center justify-center py-3 text-center bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <h2 className="ml-3 text-gray-400">Profile Photo</h2>
            <input id="dropzone-file" type="file" className="hidden" {...register(`file`,{required:'Cant be Empty'}) } />
          </label>}
         

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-12 pr-4 text-black bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('email',{required:'Cant be Empty',pattern:''})}
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
        autoComplete=''
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 pr-4 text-black bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('password',{required:'Cant be Empty',validate:(value)=>{ value.length<6?"Must Have Atleast 6 Characters":true}})}
              ref={(e)=>{ref.current=e;register('password').ref(e)}}
            />
          </div>

         {reg&& <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input  autoComplete=''
              type="password"
              placeholder="Confirm Password"
              className="w-full py-3 pl-12 pr-4 text-black bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('confirmPassword',{required:"Cant Be Empty",validate:(value)=>{  if (value.length<6) {return "Must Have Atleast 6 Characters "}
              else if(value!==ref.current.value){return "Must be similar to password"} 
              else{
                return  true
              }  }})}
            />
          </div>}

          <button
            type="submit"
            className="w-full py-3 text-sm cursor-pointer font-medium text-black bg-blue-500 rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
           {reg? 'Sign Up':"Sign In"}
          </button>

         
        </form>
        <DevTool control={control}/>
      </section>


     </div>
  )
}
export default Sign