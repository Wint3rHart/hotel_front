import React, { useEffect, useReducer, useRef, useState } from 'react'
import useGeneralStore from './useGeneralStore';
import useData from './useData';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useSignStore from './useSignStore';
import usePost from './usePost';
import { useQueryClient } from '@tanstack/react-query';
import { animate, motion } from 'framer-motion';

function Book_Menu() {

  let variants={initial:{opacity:0,},animate:{opacity:1,transition:{duration:.4,delayChildren:.3,staggerChildren:.300}}};
  let childvariants={initial:{y:'100px',opacity:0},animate:{y:0,opacity:1,transition:{duration:.2}}}

  let client = useQueryClient();
  let { id } = useParams();
  let decode = decodeURIComponent(id);
  let { data, isLoading } = useData(decode, 'book');
  let [states, setStates] = useReducer((state, action) => {
    return action.type == 'input' ? { ...state, inputState: action.payload, room_id: action.room_id } : action.type == 'notice' ? { ...state, notice: action.payload } : state;
  }, { inputState: false, notice: false });

  let nav = useNavigate();
  let post = usePost("confirm_bookings")
  let loc = useLocation();
  let login_status = useSignStore(state => state.fields)
  let { register, handleSubmit, formState, control } = useForm({ defaultValues: { type: loc.state.types, check_in: null, check_out: null, number: 1, requests: null } });
  let { errors, isValid, isSubmitSuccessful, isSubmitting } = formState;
  let ref = useRef([]);
console.log('re rendered');

  useEffect(() => {

    if (post) {
        if(post.data ){client.invalidateQueries('book');ref.current[2].innerText='Booking Confirmed'    };
        if(post.error) { ref.current[2].innerText='Booking Failed'}
    }
  
    let x=setTimeout(() => {
     post? ref.current[2].innerText=null:null;

    }, 1200);

return ()=>clearTimeout(x)
    
  }, [post.data, post.error]);

  useEffect(() => {
    if (data) {
      if (data.rooms[data.rooms.findIndex(x => x.category == ref.current[0].value)].availability) {
        setStates({ type: 'input', payload: true })
      } else {
        setStates({ type: 'input', payload: false })
      }
    }
  }, [data]);

  useEffect(() => {
    isSubmitting && setStates({ type: "notice", payload: true });
    let x = setTimeout(() => {
      !isSubmitting && setStates({ type: "notice", payload: false });
    }, 1200);
    return () => clearTimeout(x);
  }, [isSubmitting]);

  console.log('Bookmenujs rendered');

  return (
    <motion.div variants={variants} initial='initial' animate='animate' className="flex bg-transparent relative text-gray-400 items-center justify-center min-h-screen w-full">
      <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className='text-gray-400 border-1 absolute top-5 hover:border-white hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-700 inline-block mb-5 rounded-full p-3' onClick={() => { nav('/cards') }}>Back</motion.span>
     <motion.div variants={childvariants} className='w-full flex justify-center'> {isLoading ? <p>LOADING...</p> :
        <motion.div   className="bg-transparent border-1 border-purple-700 rounded-full p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Hotel Booking</h2>
          <form onSubmit={handleSubmit((input) => {
            post.mutate({
              type: input.type,
              check_out: input.check_out,
              check_in: input.check_in,
              number: input.number,
              requests: input.requests,
              user_id: login_status.user_id,
              hotel_id: decode,
              hotel_name: data.hotelName,
             
            })
          })}>
            <div className="mb-4">
              <label className="block font-semibold  w-1/2 border-purple-500 text-gray-300 mb-1">Room Type</label>
              <select className='border-1 border-purple-500  rounded-full p-1' {...register('type', {
                onChange: (e) => {client.invalidateQueries('book');                  let search = data.rooms[data.rooms.findIndex(x => x.category == e.target.value)];
                  if (search.availability) {
                    setStates({ type: 'input', payload: true, room_id: search.room_id })
                  } else { setStates({ type: "notice", payload: false }) }
                }
              })} ref={(e) => { ref.current[0] = e; register('type').ref(e) }}>{data && data.rooms.map((x) => { return <option className='text-purple-500 bg-black'>{x.category}</option> })}</select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Number of Rooms</label>
              {states.inputState ? <input type="number" className="w-full border border-gray-500 rounded-md p-2" placeholder="1" min="1" {...register("number", {
                required: 'Cant be empty', validate: (value) => {
                  if (data && data.rooms[data.rooms.findIndex(x => x.category == ref.current[0].value)].rooms >= value) {
                    return true
                  } else { return 'Not enough rooms available' }
                }
              })} /> : <h1>Not available</h1>}
               <p> {errors?.number&&errors.number.message} </p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Check-in Date</label>
              <input disabled={!states.inputState} type="date" className="w-full border border-gray-500 rounded-md p-2" {...register('check_in', { required: 'Cant be empty' })} ref={(e) => { ref.current[1] = e; register('check_in').ref(ref.current[1]) }} />
              <p> {errors?.check_in&&errors.check_in.message} </p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Check-out Date</label>
              <input disabled={!states.inputState} type="date" className="w-full border border-gray-500 rounded-md p-2" {...register('check_out', {
                required: 'Cant be empty', validate: (value) => {
                  if (new Date(value) > new Date(ref.current[1].value)) {
                    return true
                  } else { return 'Check-out must be after check-in' }
                }
              })} />
              <p> {errors?.check_out&&errors.check_out.message} </p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Special Requests</label>
              <textarea disabled={!states.inputState} className="w-full border border-gray-500 rounded-md p-2" rows="3" placeholder="Any special requests..." {...register('requests')}></textarea>
            </div>

            {states.inputState ? <button disabled={!login_status.sign_status?true:states.notice?true:false} type="submit" className="group   hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40  border-1 border-purple-600 transition-color duration-300 relative bg-transparent  text-purple-300 font-semibold sm:font-bold py-2 px-4 border hover:border-gray-100 cursor-pointer hover:text-white rounded-full sm:translate-x-1/4">
              {!login_status.sign_status ? "Login First" : states.notice ? "Confirming" : "Confirm Booking"}
            </button> : <span>Room not Available</span>}<p ref={(e)=>ref.current[2]=e } className='font-black text-white -translate-y-10 translate-x-50' ></p>
          </form>
          <DevTool control={control} />
          
        </motion.div>}</motion.div>
    </motion.div>
  )
}
export default Book_Menu;

