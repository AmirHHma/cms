import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { AuthUser, GetCartItems } from "./lib/actions";
import React from "react";
import { CartProvider } from "./context/CartContext";
import { CartWithItem, localUser } from "./types/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMS",
  description: "E-commerce website by Amir",
  icons:{
    icon:'/cms-logo-svg-vector.svg'
  }
};
// export async function generateMetadata(){
//   const user=await AuthUser() as unknown as localUser
//   return{
//     title:user? `${user?.name } | CMS`:'CMS',
//     description:"E-commerce website by Amir",
//     icons:{
//     icon:'/cms-logo-svg-vector.svg'
//     }
//   }
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const USER=await AuthUser()as unknown as localUser
  let Cart:CartWithItem|null=null
  console.log('USER',USER);
  if(USER){
   Cart=await GetCartItems(USER.cartID) 
  }
  console.log('CART:',Cart);
  
    

  return (
    <html lang="fa" className="" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
          <Toaster/>
       
       <CartProvider>
        <Nav cart={Cart} user={USER}/>
                  {/* {React.cloneElement(children as React.ReactElement, { user: USER })} */}

        {children}

       </CartProvider>
           
          
      </body>
    </html>
  );
}
