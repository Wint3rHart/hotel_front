import { DevTool } from '@hookform/devtools';
import React, { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import usePost from './usePost';
import useGeneralStore from './useGeneralStore';
import selectors from './useGeneralStore';
import useSignStore from './useSignStore';

function Sign() {
//states and Refs
  let ref=useRef(null);
  let ref_msg=useRef(null)
  let [reg,setReg]=useState(true);
let user_fnx=useGeneralStore(state=>state.fnx.set_user)
let login_global_fnx=useSignStore(x=> x.fnx.set_Login);
let [submission,setSub]=useState(false);
let debug=useSignStore(x=>x.fields)
  //TanStack 
let {mutate,isLoading,data}=usePost(reg?'register':"sign");

//RHF
let  {register,handleSubmit,formState,control}=useForm({defaultValues:{name:'',email:'',password:'',confirmPassword:'',file:null}})
let {errors,isValid,isSubmitting}=formState;



useEffect(()=>{console.log(ref.current.value);
},[ref])


//Use Effects
useEffect(()=>{ 
;if (data&&data.dets) {

  ;login_global_fnx(data)
} else if(data){console.log(data);
};    },[data])

useEffect(()=>{  errors&& console.log(errors,'g')
},[errors])

useEffect(()=>{
  
  // let x=useGeneralStore.subscribe((state)=>{return state.data},(x)=>{console.log(x);
// })  

let y=useSignStore.subscribe((state)=>{ return state.fields},(x)=>{console.log(x);
})
return ()=>{y()}


},[])


useEffect(()=>{  isSubmitting&&setSub(x=> x=true);let x= setTimeout(() => {
  setSub(x=> x=false)
}, 1100); return ()=>clearTimeout(x) },[isSubmitting])




  return (
    <div className='flex justify-center items-center h-250 w-500 bg-black text-gray-800 p-6'>
    <section className="shadow-2xl rounded-2xl p-8 w-full bg-black max-w-md border border-purple-800 text-white">
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => setReg(false)}
          className={`w-1/3 pb-4 font-medium text-center text-${!reg?'white':'purple-500'}  cursor-pointer scale-98 hover:scale-99 hover:border-white capitalize border-b-2 border-${!reg?'white':'purple-500'} transition`}
        >
          Sign In
        </button>
        <button
          onClick={() => setReg(true)}
          className={`w-1/3 pb-4 font-medium text-center cursor-pointer scale-99 hover:scale-98 ${reg?'text-white':'text-purple-500'} capitalize border-b-2 hover:border-white border-${reg?'white':'purple-500'} transition`}
        >
          Sign Up
        </button>
      </div>
  
      <form
        onSubmit={handleSubmit((data) => {console.log(data);
        ;
          mutate(data);
          user_fnx(data);
        })}
        className="space-y-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            className="w-full py-3 pl-4 pr-4 text-white bg-transparent border border-purple-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-gray-400"
            {...register('name', {
              required: "Can't be Empty",
              validate: (value) => value.length < 6 ? "Must Have 6 Characters" : true,
            })}
          /><p className='text-purple-300'>{errors?.name&& errors.name.message}</p>
        </div>
  
        {reg && (
       <div> <label
            htmlFor="dropzone-file"
            className="flex items-center justify-center py-3 text-center bg-transparent border-2 border-dashed border-purple-600 rounded-lg cursor-pointer hover:border-purple-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <h2 className="ml-3 text-gray-400">Profile Photo</h2>
            <input id="dropzone-file" multiple type="file" className="hidden" {...register('file', { required: 'Cant be Empty' })} />
           
          </label>  <p className='text-purple-300'>{errors?.file&& errors.file.message}</p>  </div>  
        )}
  
        <div className="relative">
          <input
            type="email"
            placeholder="Email address"
            className="w-full py-3 pl-4 pr-4 text-white bg-transparent border border-purple-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-gray-400"
            {...register('email', { required: "Can't be Empty" })}
          />
          <p className='text-purple-300'>{errors?.email&& errors.email.message}</p>
        </div>
  
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full py-3 pl-4 pr-4 text-white bg-transparent border border-purple-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400  focus:outline-none placeholder-gray-400"
            {...register('password', {
              required: "Cant be Empty",
              validate: (value) => value.length < 6 ? "Must Have At Least 6 Characters" : true,
            })}
            ref={(e) => {
              ref.current = e;
              register('password').ref(e);
            }}
          />
          <p className='text-purple-300'>{errors?.password&& errors.password.message}</p>
        </div>

       {reg&& <div className="relative">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full py-3 pl-4 pr-4 text-white bg-transparent border border-purple-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400  focus:outline-none placeholder-gray-400"
            {...register('confirmPassword', {
              required: "Cant be Empty",
              validate: (value) =>{return  value!=ref.current.value ? "Must Be Similar To The password" : true},
            })}
            
          />
          <p className='text-purple-300'>{errors?.confirmPassword&& errors.confirmPassword.message}</p>
        </div>}
  
        <div className='mt-1 flex justify-evenly'>  
          
            <button type='submit'   disabled={submission?true:false} className="group   hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40 border-1 border-purple-600 transition-color duration-300 relative bg-transparent  text-purple-300 font-bold py-2 px-4 border hover:border-gray-100 hover:text-white rounded-full " ><span className=' w-full absolute inline-block opacity-0 group-hover:opacity-90  top-0  h-full -left-0  group-hover:bg-purple-500/25  transition-all duration-300 group-hover:rounded-full cursor-pointer '></span>
                {submission?'Submitting':"Submit"}
                </button>
                
                </div>
      </form>
      <DevTool control={control}/>
      <p ref={(e)=>{ ref_msg.current=e}}  className='text-purple-400 mt-2 ml-1/2' >{data?.msg&&data.msg}</p>
    </section>
  </div>
  
  
  )
}
export default Sign