'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, {  useEffect, useState } from "react";
import { toast } from "sonner";
import { UploadImageAction } from "../lib/actions";


 const UploadImage = ({id,setImageDta}:{id:string,setImageDta:React.Dispatch<React.SetStateAction<{path:string,url:string}|null>>}) => {
    const [file,setFile]=useState<File | null>(null)

    useEffect(()=>{
        ///////////////////////////////////////////////////////////////////here
    },[])

    async function handleUpload(){
       if(file){
        const formData=new FormData()
       formData.append('id',id)
       formData.append('file',file)
      let res=await UploadImageAction(formData)
      setImageDta(res)

       }else{
        toast.error('Select an Image first')
       }
       
    }

 return ( <div className="flex">
                <Label htmlFor="fileUpload"> Image</Label>
                <Input onChange={e=>e.target.files&& setFile(e.target.files[0])} id="fileUpload" type="file" />
                <div onClick={handleUpload} className="ring ring-neutral-300 rounded-md p-1.5 text-sm flex items-center font-semibold cursor-pointer">Upload</div>
            </div>);
}
export default UploadImage;