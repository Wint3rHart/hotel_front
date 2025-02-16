import { useQuery } from '@tanstack/react-query'
import React from 'react'

function useData(type,key) {

let query=useQuery({queryKey:[key,type],queryFn:async({queryKey})=>{  console.log(queryKey);

    let get=await fetch(key=='hotels'?`http://localhost:4700?type=${queryKey[1]}`:key=="details"?`http://localhost:4700/details?id=${queryKey[1]}`:key=='book'? `http://localhost:4700/book_menu/${queryKey[1]}`:'');let conv=await get.json() ;return conv },onSuccess:(x)=>{console.log(x);
    }})



  return query
}

export default useData


////GET DEtAIlS k lye api banani aur rooms ko schema mei daalna