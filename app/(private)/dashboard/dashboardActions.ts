'use server'
import { User } from "@/app/generated/prisma";
import prisma from "@/app/lib/prisma";
import { addUserSchema } from "@/app/schema/zod/zod";
import bcrypt from 'bcrypt'



export async function GetUsers(currPage:number,pageSize:number):Promise<{users:User[],totalUsers:number} | null>{
    const skip=(currPage-1)*pageSize
    try{

        const [users,totalUsers]=await Promise.all(
           [ prisma.user.findMany({skip,take:pageSize}),prisma.user.count()]
        )
        
        
        return {users,totalUsers}
    }catch{
        return null
    }
}

export async function addUserAction(prev:{data:User|null , err:Record<string,string>|null,success:boolean},formData:FormData):Promise<{data:User|null , err:Record<string,string>|null,success:boolean}>{


    let id=formData.get('id') as unknown as string|null
    let Inputs={
        name:formData.get('name'),
        username:formData.get('username'),
        email:formData.get('email'),
        password:formData.get('password'),
        role:formData.get('role'),
    }   as unknown as User
    let safeUser=addUserSchema.safeParse(Inputs)
        

    if(!safeUser.success){
        let errors:Record<string,string>={};
        safeUser.error.issues.forEach(err=>{
            let path=err.path[0].toString() || "form"
            errors[path]=err.message
        })
        return {data:Inputs,err:errors,success:false}
    }
    Inputs.password=await bcrypt.hash(Inputs.password,10)


    try{
        if(id){
            let user=await prisma.user.update({where:{id},data:Inputs}) 

            console.log(user);
        }else{
            let user =await prisma.user.create({data:Inputs})
            console.log(user);
        }
    }catch{
        return {data:Inputs,err:{username:'try a different username'},success:false}

    }
    
    console.log(Inputs);

return{data:Inputs,err:null,success:true}
}

export async function getSpecificUser(id:string){

    try{
        let user=await prisma.user.findUnique({where:{id}})
        return user
    }catch{
        return false
    }
}