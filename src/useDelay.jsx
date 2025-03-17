import { useEffect, useState } from "react"

const useDelay=(data)=>{



let [state,setState]=useState();

useEffect(()=>{

let x=setTimeout(() => {
    
setState(x=> x=data)

}, 1500);

return ()=>{clearTimeout(x)}
},[data])


return state

}

export default useDelay