'use client'
import { User } from "@/app/generated/prisma";
import { signUser } from "@/app/lib/actions";
import { zodSchema } from "@/app/schema/zod/zod";
import { Button } from "@/components/ui/button";
import { Card,CardTitle,CardContent,CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";


 const SignUp = () => {



  let [errors,setErrors]=useState<Record<string,string>>({})
  let [msg,signAction,pending]=useActionState<{data:User | null, errors:Record<string,string> | null}, FormData>(signUser,{
    data: null,
    errors: null
  })
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let form =e.currentTarget
    let formData=new FormData(form)

    let pass=formData.get('password')
    let repeatPass=formData.get('repeatPass')

    if(pass!==repeatPass){
      toast('repeat the password correctly',{duration:2000,position:'top-center'})
      return;
    }
     startTransition(() => {
      signAction(formData);
    });


  }
  useEffect(()=>{
    if(msg.data){
      localStorage.setItem('user',JSON.stringify({name:msg.data.name,username:msg.data.username,role:msg.data.role}))
    }

  },[msg])
const handleBlur=(e:React.FocusEvent<HTMLInputElement>)=>{
   const { name, value } = e.target
    const fieldSchema = zodSchema.shape[name as keyof typeof zodSchema.shape]
    // console.log(fieldSchema);
    const result = fieldSchema.safeParse(value)
    setErrors(prev => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0].message,
    }))

}



 return ( <>
 <form onSubmit={handleSubmit} className="flex justify-center items-center min-h-screen">
        <Card className="max-w-xl grow min-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Sign Up </CardTitle>
            {/* {msg && <div>{JSON.stringify(msg)}</div>} */}
            <CardContent className="flex flex-col gap-4 [&>*>label]:pb-3 [&>*>p]:text-red-600">
              <div>
                <Label htmlFor="Name">Name</Label>
                <Input placeholder="Mohammad Ali" id="Name" name="name" onChange={handleBlur} />
                <p>{msg.errors?.name || errors.name}</p>
              </div>
                <div>
                <Label htmlFor="Email">Email</Label>
                <Input placeholder="foo@example.com" id="Email" name="email"  onChange={handleBlur} />
                <p>{msg.errors?.email || errors.email}</p>
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input  placeholder="example123" id="username"  name="username"  onChange={handleBlur}/>
                <p>{msg.errors?.username || errors.username}</p>

              </div>
              <div>
                <Label htmlFor="pass">Password</Label>
                <Input  type="password" id="pass"  name="password"  onChange={handleBlur}/>
                <p>{msg.errors?.password || errors.password}</p>

              </div>
              <div>
                <Label htmlFor="repeatPass">Repeat Password</Label>
                <Input type="password"  id="repeatPass"  name="repeatPass"/>
              </div>
              <Button disabled={pending}>Sign up</Button>
              <Label >Do not have an account yet?<Link href="/auth/login" className="underline">login</Link></Label>
            </CardContent>
          </CardHeader>
        </Card>
        
      </form>
      
 </>);
     
}
export default SignUp;