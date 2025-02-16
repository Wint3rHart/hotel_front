import React, { useEffect, useRef, useState } from 'react'
import useGeneralStore from './useGeneralStore';
import useData from './useData';

import { useLocation, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useSignStore from './useSignStore';
import usePost from './usePost';
import { useQueryClient } from '@tanstack/react-query';



function Book_Menu() {

  let client=useQueryClient();
let {id}=useParams();
let [inputState,setInput]=useState(false)
let decode=decodeURIComponent(id);
let {data,isLoading}=useData(decode,'book');
let post=usePost("confirm_bookings")
let loc=useLocation();
let login_status=useSignStore(state=>state.fields)
let {register,handleSubmit,formState,control}=useForm({defaultValues:{type:loc.state.types  ,check_out:null,number:1,requests:null}});
let {errors,isValid}=formState
let ref=useRef([])



console.log('book rendered');

useEffect(()=>{ 
 post.data&&client.invalidateQueries('book');
 
 
},[post.data])

useEffect(()=>{  if (data) {
 if (data.rooms[data.rooms.findIndex(x=> x.category==ref.current[0].value)  ].availability) {
  setInput(x=> x=true)
 }else{setInput(x=> x=false)}  

} },[data])

useEffect(()=>{useGeneralStore.subscribe((state)=>{return state.book_menu},(x)=>{console.log(x);
})},[])


  return (

    <div className="flex bg-gray-300 text-gray-800  items-center justify-center min-h-screen w-full ">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Hotel Booking</h2>
        <form onSubmit={handleSubmit((input)=>{  
        ;post.mutate({type:input.type,check_out:input.check_out,check_in:input.check_in,number:input.number,requests:input.requests,user_id:login_status.user_id,hotel_id:decode,hotel_name:data.hotelName})
         })}>
          {/* Room Type */}
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">Room Type</label>

  <select  {...register('type',{onChange:(e)=>{ if (data.rooms[data.rooms.findIndex(x=> x.category==e.target.value)].availability ) {
    setInput(x=> x=true)
  }else{setInput(x=> x=false)}  }})} ref={(e)=>{ ref.current[0]=e;register('type').ref(e)}}  >{data&&data.rooms.map((x)=>{return <option>{x.category}</option>})}</select>


{/* <Controller name='type'  control={control}  render={({field})=>{return   <select  {...field} ref={(e)=>{ ref.current[0]=e;field.ref(e)}}  >{data&&data.rooms.map((x)=>{return <option>{x.category}</option>})}</select> }}   /> */}





          </div>

          {/* Number of rooms */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Number of Rooms</label>
      {inputState?  <input  type="number"  className="w-full border border-gray-300 rounded-md p-2" placeholder="1" min="1"  {...register("number",{required:'Cant be empty',validate:(value)=>{ 
          
          ;
            if (data&&data.rooms[ data.rooms.findIndex(x=> x.category==ref.current[0].value)].rooms >=value) {
              return true
            }else{return 'Not enough rooms available'}
                }})} />:<h1>Not available</h1>}
          </div>

          {/* Check-in Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Check-in Date</label>
            <input disabled={inputState?false:true} type="date" className="w-full border border-gray-300 rounded-md p-2"
            
          
          {...register('check_in',{required:'Cant be empty'})}   ref={(e)=>{ref.current[1]=e;register('check_in').ref(ref.current[1])}}/>
          </div>

          {/* Check-out Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Check-out Date</label>
            <input disabled={inputState?false:true}  type="date" className="w-full border border-gray-300 rounded-md p-2" {...register('check_out',{required:'Cant be empty',validate:(value)=>{ 
            
              if (new Date(value)>new Date(ref.current[1].value)) {
             return   true 
            }else{return 'check out must be be after check in' }   }    })}/>
              
          </div>

          {/* Special Requests */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Special Requests</label>
            <textarea disabled={inputState?false:true} className="w-full border border-gray-300 rounded-md p-2" rows="3" placeholder="Any special requests..."  {...register('requests',{required:'Cant be empty'})}></textarea>
          </div>

   

          {/* Submit Button */}
        {inputState?  <button  disabled={!login_status.sign_status?true:false}    type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
           { login_status.sign_status?"Confirm Booking":"Login First"}
          </button>:<span>Room not Available</span>}
        </form>
        <DevTool control={control}/>
      </div>
    </div>
  )
}

export default Book_Menu