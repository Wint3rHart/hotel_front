import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';


function Home() {


// let {register,handleSubmit,}=useForm({defaultValues:{file:null,id:null,name:null}});

// let {mutate,data}=useMutation({mutationFn:async(data)=>{ let form=new FormData();
//   form.append('file',data.file);
//   form.append('folder',data.folder);
//   form.append('id',data.id);

// }})


  let variants={initial:{x:'-200px'},animate:{x:0,transition:{duration:0.1,type:'spring',stiffness:'95',damping:'10',mass:.8, delayChildren: .3,staggerChildren:.5}},exit:{x:'400px',opacity:0,transition:{duration:.3}}};


  let childvariants={initial:{opacity:0},animate:{opacity:1,transition:{duration:0.9}}};
  ////

  let variants2={initial:{opacity:0},whileInView:{opacity:1,transition:{duration:0.3,delayChildren: .3,staggerChildren:.4}}};

  let childvariants2={initial:{opacity:0},whileInView:{opacity:1,transition:{duration:0.4}}};

  console.log('homejs rendered');

let nav=useNavigate();
  return (
    <>



    <motion.div  variants={variants} initial='initial' animate='animate' exit='exit' className='flex flex-col w-full text-gray-800 p-6 '>



    <motion.header  variants={childvariants}  className="bg-transparent  relative hover:bg-purple-900/7 border-2 border-purple-800   sm:mt-20 sm:w-[90%] m-auto flex flex-col items-center justify-center text-white text-center sm:h-150 py-16 rounded-lg transition-all duration-200   " style={{backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'100px 0px'}}>
    <video  autoPlay 
        loop 
        muted 
        playsInline src='http://localhost:4700/vid' controls className='absolute -z-1 brightness-10  h-full w-full'> </video>
    
    <motion.div variants={variants} initial='initial' animate='animate'    >
    <motion.h1 variants={childvariants} className="sm:text-5xl  text-xl font-bold mb-4">Find Your Perfect Stay – <strong className='text-purple-400 '>Book with Ease</strong> </motion.h1>
    <motion.p variants={childvariants} className="sm:text-xl text-purple-600 font-semibold text-xl mb-6">Discover top-rated hotels at unbeatable prices.</motion.p>
    </motion.div>
    <motion.nav  variants={variants}    class="flex flex-col items-center mt-30 space-y-4">

    <motion.div variants={childvariants}  className='mt-1 flex justify-evenly' >    <button className="group   hover:shadow-[0_1px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40 border-1 border-purple-600 transition-color duration-300 relative bg-transparent  text-purple-300 font-semibold py-2 px-4 border hover:border-gray-100 hover:text-white rounded-full " onClick={() => nav('/cards')}>  <span className=' w-full absolute inline-block opacity-0 group-hover:opacity-90  top-0  h-full -left-0  group-hover:bg-purple-500/25 transition-all duration-300 group-hover:rounded-full cursor-pointer '></span>
    Search Hotels
                </button>
                </motion.div>


                
   </motion.nav>
  </motion.header>


<motion.div  variants={variants2} initial='initial' whileInView='whileInView' viewport={{amount:.9,once:true}} className='flex sm:flex-row flex-col font-semibold justify-evenly mt-50'>
<motion.section variants={childvariants2} class="my-12 text-white sm:text-xl text-center font-semibold space-y-4"   >
  <h2 class="text-3xl  text-purple-500">Why Choose Us?</h2>
  <p> <strong className='text-gray-300'>Best</strong>  Price Guarantee</p>
  <p> <strong className='text-gray-300'>24/7</strong>  Customer Support</p>
  <p><strong className='text-gray-300'>Global</strong>   Hotel Partnerships</p>

  <div class="border-t-4 border-2 border-purple-600/85 m-10 mx-auto w-1/2"></div>
</motion.section>




<motion.section variants={childvariants2} class="my-12 sm:text-xl text-white font-semibold text-center space-y-4">
  <h2 class="text-3xl text-purple-500 ">Our Services</h2>

 
  <p> <strong className='text-purple-400'>Secure Payments</strong> – Instant confirmations</p>
  <p> <strong className='text-purple-400'>Exclusive Offers</strong> – Save on your dream destinations</p>
  <p> <strong className='text-purple-400'>Verified Hotels</strong> – Trusted reviews and premium stays</p>
  <div class="border-t-4 border-2 border-purple-600/85 m-10 mx-auto w-1/2"></div>
</motion.section>
  </motion.div>

  <motion.section variants={variants2} initial='initial' whileInView='whileInView' viewport={{amount:.9}}  id="contact" className="my-12 bg-transparent  text-gray-500  border-1 border-[rgba(70,10,144,1)]  p-8 w-full mt-50 sm:w-1/2 m-auto flex flex-col items-center rounded-lg shadow     ">
    <motion.h2  variants={childvariants2} class="text-3xl font-semibold text-purple-500 mb-4">Contact Us</motion.h2>
<motion.div variants={childvariants2} className='    sm:text-left'>
    <p className='font-semibold text-gray-300 '><strong className='text-purple-300 '>Phone:</strong>  +123-456-7890</p>
    <p className='font-semibold text-gray-300 '><strong className='text-purple-300  '>Email:</strong >  support@hotelbooking.com</p>
    <p className='font-semibold text-gray-300 '><strong className='text-purple-300 '>Address:</strong>  123 Travel St, Dream City</p>
    </motion.div>
  </motion.section>

  <footer className="text-center text-sm text-gray-500 mt-12">
    <p>&copy; 2025 Hotel Booking. All rights reserved.</p>
  </footer>
  </motion.div>
 
  </>

  )


}



export default Home