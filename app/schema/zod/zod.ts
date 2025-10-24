import * as z from 'zod'
export const zodSchema = z.object({
    name:z.string().min(2,{error:'name must have at least 2 letters'}),
    email: z.string().email({ message: 'Invalid email input' }),
    username: z.string().min(1, { message: 'Invalid username' }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Za-z]/, { message: "Password must contain at least one letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  })


  export const loginSchema=z.object({
  username: z.string().min(1, { message: 'Invalid username' }),
 password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Za-z]/, { message: "Password must contain at least one letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  })


export const productSchema=z.object({
    name:z.string({error:'name must be a string'}).min(1,{error:'name must be at least one character long'}),
    description:z.string().min(10,{error:'description must be atleast 10 characters'}),
    stock:z.number().min(1,{error:'there should be at least one product available'}),
    price:z.number({error:"price must be in decimals"}),
    category:z.string({error:'category must be a string'}).uppercase({error:"category should be uppercase"}).min(1,{error:'a category must be chosen'})
})

export const addUserSchema=z.object({
    name:z.string({error:'name must be a string'}).min(2,{error:'name has to be at least 2 characters long'}),
    email:z.email({error:'this filed has to be an email'}),
    username:z.string().min(1,{error:'this filed should not be left empty'}),
    password:z.string().min(8,{error:'password has to be at least 8 characters long'}),
    role:z.string().min(1,{error:'a category must be chosen'})    
})