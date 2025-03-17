import { hydrate } from "@tanstack/react-query";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

const useSignStore=create( subscribeWithSelector((set,get)=>{

    return {  
        
        fields:{sign_status:false,name:null,user_id:null,profilePic:null} ,

    fnx:{
        set_Login:(x)=>{ console.log(x);
    ;set((state)=>{ return {...state,fields:{...state.fields,sign_status:true,name:x.dets.name,user_id:x.dets._id,profilePic:x.dets.profile}}  })   }, 

set_signOut:()=>{console.log('siggning out');
;set((state)=>{return {...state,fields:{...state.fields,sign_status:false,name:null,user_id:null,profilePic:null}}   })}

}    

    
    }
}))


export default useSignStore



