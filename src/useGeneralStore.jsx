import { data } from "react-router-dom";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";



let useGeneralStore = create(subscribeWithSelector((set, get) => {
    return {


        data: { type: 'All',search:'', user_dets: { name: null, email: null, password: null, profile: null }}, book_menu: { id: null },


        custom_options:{custom:false,search:''},

        fnx: {
                       set_book:(x)=>{set((state)=>{return {...state,book_menu:{...state.book_menu,id:x}}})  }  ,
         setType: (x) => { console.log('called',x);
         ;set((state) => { return { ...state, data: { ...state.data, type: x} } }) }, 
        set_user: (x) => { set((state) => { return { ...state, data: { ...state.data, user_dets: { name: x.name, email: x.email, password: x.password, profile: x.file } } } }) }, 
        set_book_id: (x) => { set((state) => { return { ...state, book_menu: { ...state.book_menu, id: x } } }) }, 
        set_Search:(x)=>{set((state)=>{ return {...state,data:{...state.data,search:x}}  })},
        // set_Custom:(x)=>{set((state)=>{return {...state,custom_options:{...state.custom_options,custom:x}}})}
    },

    }


}));


export default useGeneralStore