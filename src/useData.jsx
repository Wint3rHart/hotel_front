import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import useDelay from './useDelay';

function useData(type,key,search) {

  let state=useDelay(search);

// useEffect(()=>{console.log(state);
// },[state])


let query=useQuery({
  queryKey:[key,type,type=='custom'&&state],queryFn:async(queryKey)=>{  
console.log(queryKey);


    let get=await fetch(key=='hotels'&&type!='custom'?`http://localhost:4700?type=${queryKey.queryKey[1]}`:key=="details"?`http://localhost:4700/details?id=${queryKey.queryKey[1]}`:key=='book'? `http://localhost:4700/book_menu/${queryKey.queryKey[1]}`:key=='user'?`http://localhost:4700/user_panel/${queryKey.queryKey[1]}`:key=='hotels'&&type=="custom"?`http://localhost:4700?type=custom&search=${queryKey.queryKey[2]}`:
    `http://localhost:4700/reviews/${queryKey.queryKey[1]}`,{method:"GET",credentials:"include"});
    if (get.ok) {
      let conv=await get.json()
        ;return conv 
    }else{   let msg=await get.json(); throw new Error(msg.msg)}
    ;},cacheTime:90000,staleTime:90000,refetchOnWindowFocus:false,retry:1
  })



  return query
}

export default useData


