import {  LayoutDashboard, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Dashboard({children,}:Readonly<{children:React.ReactNode}>){
    return(
            <div >
                    <div className="grid grid-cols-[1fr_6fr] mt-10">
                        <ul className="flex flex-col gap-4">
                        <li className=" border-b border-l cursor-pointer rounded-2xl flex items-center gap-2" ><LayoutDashboard/><Link  className="px-5 py-2" href={'/dashboard/'}>Dashboard</Link></li>
                        <li className=" border-b border-l cursor-pointer rounded-2xl flex items-center gap-2" ><Users/><Link className="px-5 py-2"  href={'/dashboard/users'}>Users</Link></li>
                        <li className=" border-b border-l cursor-pointer rounded-2xl flex items-center gap-2" ><ShoppingBag/><Link className="px-5 py-2"  href={'/dashboard/products'}>Products</Link></li>
                        </ul>
                        {children}
                        </div>
            </div>
    )
}