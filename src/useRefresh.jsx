import { useMutation } from "@tanstack/react-query"

const useRefresh=()=>{

const query=useMutation({mutationFn:async()=>{  let get=await fetch('http://localhost:4700/refresh',{method:"POST",headers:{"Content-Type":"Application/json"},credentials:'include'});

if(!get.ok) {let conv=await get.json(); throw new Error(conv.msg||'Failed') };

let conv=await get.json();
return conv; 


  }})

return query


}
export default useRefresh