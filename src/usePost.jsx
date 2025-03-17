import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import useSignStore from './useSignStore';

function usePost(type) {


  let client=useQueryClient();
let signOut=useSignStore(state=>state.fnx.set_signOut)
    let query=useMutation({mutationFn:async (x)=>{
        
        if (type=='register') {

      let form=new FormData();
      form.append("name",x.name);
      form.append("email",x.email);
      form.append("password",x.password);
      form.append("file",x.file[0]);
     
      

    let get=await fetch(`http://localhost:4700/register`,{method:"POST",body:form});
     let conv=await get.json();
    return conv
    } 
    else if(type=='sign'){ console.log('signing');
    
           let get=await fetch(`http://localhost:4700/sign`,{method:"POST",headers:{"Content-Type":"Application/json"},body:JSON.stringify(x),credentials:'include'});
           let conv=await get.json();
           return conv
         }
        else if(type=='confirm_bookings'){
          
        let get=await fetch(`http://localhost:4700/booking`,{method:"POST",headers:{'Content-type':"application/json"},body:JSON.stringify(x),credentials:'include'});
if (!get.ok) {
let conv=await get.json(); console.log(conv);
;throw new Error(conv.msg||'Error in usePost Booking req')
  
}

        let conv=await get.json(); 
        return conv      }

        else if(type=="delete"){ console.log(x);
        ;let get=await   fetch(`http://localhost:4700/delete/${x.id}/${x.hotel}/${x.booking_id}?suite=${x.suite}&rooms=${x.rooms}`,{method:"DELETE",credentials:'include'});if (!get.ok) { throw new Error(await get.json());
          
        }  return await get.json() }
        
        else if(type=="signOut"){ let get=await fetch("http://localhost:4700/signOut",{method:"PUT",credentials:'include',headers:{'content-type':'application/json'}}); return await get.json()   }

        else if(type=="review"){ console.log(x);
        ;let get=await fetch("http://localhost:4700/review",{method:"PUT",headers:{"Content-Type":"Application/json"},body:JSON.stringify(x)});if(!get.ok){let conv=await get.json(); throw new Error(conv.error||"error posting review") };return await get.json()   }


        

     },onSuccess:()=>{type=='review'?client.invalidateQueries('reviews'):type=='signOut'&&signOut()
     }})

  return query
}

export default usePost