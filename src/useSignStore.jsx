import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useSignStore=create( subscribeWithSelector ((set,get)=>{

    return {  
        
        fields:{sign_status:false,name:null,user_id:null,token:null} ,

    fnx:{set_Login:(x)=>{ console.log(x);
    ;set((state)=>{ return {...state,fields:{...state.fields,sign_status:true,name:x.dets.name,user_id:x.dets._id}}  })   }}    //tokn is yet to be added
    
    }
}))


export default useSignStore



