import { useMutation } from '@tanstack/react-query'
import React from 'react'

function usePost(type) {



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
    else if(type=='sign'){ 
           let get=await fetch(`http://localhost:4700/sign`,{method:"POST",headers:{"Content-Type":"Application/json"},body:JSON.stringify(x)});let conv=await get.json();
           return conv
         }
        else if(type=='confirm_bookings'){
          
        let get=await fetch(`http://localhost:4700/booking`,{method:"POST",headers:{'Content-type':"application/json"},body:JSON.stringify(x)});let conv=await get.json(); 
        return conv      }
     }})

  return query
}

export default usePost