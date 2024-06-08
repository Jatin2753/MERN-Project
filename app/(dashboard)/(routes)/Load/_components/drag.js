import React, { useState } from 'react';
import { ArrowBigUp } from 'lucide-react';
import Alertmsg from './Alertmsg';
import UploadFile from './UploadFile';
import ProgressBar from './ProgressBar';
import AlertUploaded from './AlertUploaded';

function Drag({UploadBtnClicked,value}) {
    const [message,setmessage] = useState()
    const [file,setFile] = useState();
    const onFileSelect = (file)=>{
        if(file&&file.size > 10000000){
            setmessage("File size is greater than 10MB");
            return 
        }
        setmessage(null);
        console.log("Your file is Uploaded \n"+ file);
        setFile(file);
    }
  return (
    <div className='m-10'>
      <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-blue-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-16 h-16 mb-4 text-main dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-lg text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or <strong className='text-main'>drag</strong> and <strong className='text-main'>drop</strong></p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, PDF, Docx or GIF (MAX SIZE 10MB)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={(event)=>(onFileSelect(event.target.files[0]))} />
            </label>
        </div> 
        {message ?  <Alertmsg msg={message}/> : null}
        {file ? <UploadFile src={file} onRemoved = {()=>setFile(null)}/>:null}
        
          {value>0?<ProgressBar progress ={value}/>:
          <div className='flex justify-center w-full mt-8'>
            <button disabled={file == null} onClick = {()=>UploadBtnClicked(file)} type="button" className='flex gap-2 disabled:cursor-not-allowed justify-center items-center text-white bg-main hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Upload <ArrowBigUp size={20}/> </button>
          </div>
          }

          {value == 100 ? <AlertUploaded msg="File Uploaded Successflly"/> : null }
    </div>
  )
}

export default Drag;
