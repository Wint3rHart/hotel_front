import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form'

function Upload_files() {

let {register,handleSubmit,control,formState}=useForm({defaultValues:{files:[]}});

let {data,mutate,isLoading}=useMutation({mutationFn:async (value)=>{  
    
    let form=new FormData();
    
    console.log(value);
    for(let i=0;i<=value.length-1;i++){ form.append("files",value[i]) ;console.log(value[i]);
      }
  
    
    
    
    ;let send=await fetch("http://localhost:4700/upload",{method:'POST',body:form});let conv=await send.json();
 return conv }})

  return (

    <div>

<form  onSubmit={handleSubmit((data)=>{  console.log(data);mutate(data.files)
  })}  > 

<input multiple type='file'  {...register('files')}  />

<button className='border-2 border-black rounded-md' type='submit'>Submit</button>
</form>



    </div>

  )
}

export default Upload_files