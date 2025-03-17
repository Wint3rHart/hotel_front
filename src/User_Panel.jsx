import React, { useEffect } from 'react'
import useData from './useData'
import { useNavigate, useParams } from 'react-router-dom'
import useSignStore from './useSignStore';
import usePost from './usePost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useRefresh from './useRefresh';

function User_panel() {

  let client = useQueryClient();
  let { id } = useParams()
  let refresh = useRefresh();
  let decoded = decodeURIComponent(id);

  useEffect(() => {
    console.log(decoded);
  }, [])

  let nav = useNavigate();
  let { data, isLoading, isError, error } = useData(decoded, 'user');
  let post = usePost('delete');
  let pic = useSignStore(x => x.fields.profilePic);

  useEffect(() => {
    isLoading ? console.log('loading') : data && console.log(data);


    isError && refresh.mutate();


  }, [data, isLoading, error, isError])

  useEffect(() => {
    refresh.error ? console.log(refresh.error, 'from refresh')
    : refresh.data && client.invalidateQueries('user')
    ; console.log('from user');


  }, [refresh.error, refresh.data])


  useEffect(() => {
    post.error ? console.log(post.error) : post.data && console.log(post.data);

    post.data && client.invalidateQueries('user')



  }, [post.data, post.error])


  return (

    <div className="flex flex-col  w-full hover:bg-purple-900/3 transition-all duration-300  hover:border-gray-200 items-center justify-center p-6 space-y-4 bg-transparent border-1 border-purple-600 rounded-lg shadow-lg">
      {isLoading ? (
        <h1 className="text-xl font-semibold text-gray-100 animate-pulse">Loading...</h1>
      ) : (
        data && (
          <div className="space-y-2 text-center  ">
            <span className='text-gray-300 border-1 hover:border-white  hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-400 inline-block mb-5 rounded-full p-2' onClick={() => { nav('/cards') }}>Back</span>
            <img className='rounded-full w-100 m-auto border-2 border-purple-500' src={`data:image/webp;base64,${pic}`} />
            <h1 className="text-2xl font-bold text-purple-500">{data.name.toUpperCase()}</h1>
            <p className=" text-gray-300" > <strong className='text-purple-400'>Email:</strong>  {data.email}</p>
            <p className="text-gray-300 text-sm"><strong className='text-purple-400'>ID:</strong> {data._id}</p>

            <div>
              <p className='font-bold  text-xl text-purple-500'>Bookings :</p>
              <ul className='flex flex-wrap mt-3  p-5 justify-evenly'>{data?.bookings.length > 0 ? data.bookings.map((x, i) => { return <ul className='px-2 text-white font-lg text-center mt-30'><li className=''> <strong className='text-purple-300'>Booking Id : </strong>{x.booking_id}</li> <li> <strong className='text-purple-300'>Hotel Name : </strong>{x.hotel.hotelName}</li> <li> <strong className='text-purple-300'>No of Bookings : </strong>{x.rooms}</li> <li> <strong className='text-purple-300'>Check In Date :  </strong>{x.check_in}</li><li><strong className='text-purple-300'>Check Out Date :</strong>  {x.check_out}</li><li> <strong className='text-purple-300'>Suite : </strong>{x.suite}</li>  <li><strong className='text-purple-300'>Requests :</strong> {x.special_request?.length > 0 ? x.special_request.length : 'none'}</li> <button className='border-1 border-purple-500 hover:border-gray-300 hover:scale-99 hover:text-purple-400 transition-all duration-300 text-sm bg-transparent p-2 rounded-xl mt-3 cursor-pointer ' onClick={() => { post.mutate({ id: data._id, hotel: x.hotel._id, suite: x.suite, rooms: x.rooms, booking_id: x.booking_id }) }}>Cancel</button> </ul> }) : <p className='text-gray-300'>No Bookings</p>}</ul>

            </div>
          </div>
        )
      )}
    </div>


  )
}

export default User_panel