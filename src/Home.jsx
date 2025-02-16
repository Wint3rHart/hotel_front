import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sign from './Sign';

function Home() {


let nav=useNavigate();
  return (
    <>
  
    <div className='flex flex-col w-full bg-gray-100 text-gray-800 p-6 '>
    <header className="bg-gray-900 sm:mt-20 sm:w-full flex flex-col items-center justify-center text-white text-center sm:h-150 py-16 rounded-lg shadow-lg">
    <h1 className="sm:text-5xl  text-xl font-bold mb-4">Find Your Perfect Stay – Book with Ease</h1>
    <p className="sm:text-xl  text-xl mb-6">Discover top-rated hotels at unbeatable prices.</p>

    <nav class="flex flex-col items-center mt-30 space-y-4">
      <button  onClick={()=>{nav('/cards')}} className="sm:w-64 w-40 bg-blue-500 text-white py-3 sm:font-semibold rounded-full hover:bg-blue-600 transition"> Search Hotels</button>
      <button className="sm:w-64 w-40 bg-blue-500 text-white py-3 sm:font-semibold rounded-full hover:bg-blue-600 transition">View Deals</button>
   </nav>
  </header>


<div className='flex sm:flex-row flex-col justify-evenly mt-50'>
<section class="my-12 sm:text-xl text-center font-semibold space-y-4">
  <h2 class="text-3xl  text-blue-500">Why Choose Us?</h2>
  <p> Best Price Guarantee</p>
  <p> 24/7 Customer Support</p>
  <p> Global Hotel Partnerships</p>

  <div class="border-t-4 border-blue-500 m-10 mx-auto w-1/2"></div>
</section>




<section class="my-12 sm:text-xl font-semibold text-center space-y-4">
  <h2 class="text-3xl text-blue-500 ">Our Services</h2>

 
  <p> <strong>Secure Payments</strong> – Instant confirmations</p>
  <p> <strong>Exclusive Offers</strong> – Save on your dream destinations</p>
  <p> <strong>Verified Hotels</strong> – Trusted reviews and premium stays</p>
  <div class="border-t-4 border-blue-500 m-10 mx-auto w-1/2"></div>
</section>
  </div>
  <section id="contact" className="my-12 bg-gray-200 p-8  mt-50 w-1/2 m-auto flex flex-col items-center rounded-lg shadow">
    <h2 class="text-3xl font-semibold text-blue-500 mb-4">Contact Us</h2>

    <p> Phone: +123-456-7890</p>
    <p> Email: support@hotelbooking.com</p>
    <p> Address: 123 Travel St, Dream City</p>
  </section>

  <footer className="text-center text-sm text-gray-500 mt-12">
    <p>&copy; 2025 Hotel Booking. All rights reserved.</p>
  </footer>
  </div>
  </>

  )


}



export default Home