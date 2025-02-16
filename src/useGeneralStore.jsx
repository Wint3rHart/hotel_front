import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";



let useGeneralStore = create(subscribeWithSelector((set, get) => {
    return {


        data: { type: 'All', user_dets: { name: null, email: null, password: null, profile: null }, for_debug: 'hassssan' }, book_menu: { id: null },

        fnx: {
                       set_book:(x)=>{set((state)=>{return {...state,book_menu:{...state.book_menu,id:x}}})  }  ,
         setType: (x) => { set((state) => { return { ...state, data: { ...state.data, type: x } } }) }, 
        set_user: (x) => { set((state) => { return { ...state, data: { ...state.data, user_dets: { name: x.name, email: x.email, password: x.password, profile: x.file } } } }) }, 
        set_book_id: (x) => { set((state) => { return { ...state, book_menu: { ...state.book_menu, id: x } } }) } }

    }


}));


export default useGeneralStore