"use client";
import { Button } from "@/components/ui/button";

import {  Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Profile from "./profile";
import SearchProduct from "./SearchProduct";
import UserCart from "./UserCart";
import { CartWithItem, localUser } from "../types/types";



const Nav = ({user,cart}:{user:localUser,cart:CartWithItem|null}) => {
  const [scroll,setScroll]=useState(0)
  const [isDark, setDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // const { user, refreshUser } = useGlobalUser();


  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("dark");
    if (saved) {
      setDark(JSON.parse(saved));
    }
    // refreshUser();
    const handleScroll=()=>setScroll(window.scrollY)
    window.addEventListener('scroll',handleScroll)
    return ()=>window.removeEventListener('scroll',handleScroll)
  }, []);


  const changeTheme = () => {
    setDark((dark) => !dark);
  };

  
  useEffect(() => {
    if (!isMounted) return;

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark", JSON.stringify(isDark));
  }, [isDark, isMounted]);

  return (
    <nav  className={`lg:px-20 sm:px-10 px-3 sticky top-0 z-50 `}>
    <div className={`px-10 sticky top-0  border mt-3 rounded-full ${scroll && 'backdrop-blur-xl '}`}>
      <div className="flex justify-between py-4 items-center ">
        <div className="flex max-sm:gap-2 gap-8 items-center max-sm:text-sm">
          
            <Link href={'/'} className="grow-[2] font-bold text-lg" >CMS</Link>
          
          <Sun onClick={changeTheme} className="size-10 cursor-pointer" />
        </div>
        <div className="flex justify-end grow gap-4">
          <SearchProduct />
          {user ? (
           <div className="flex items-center gap-3">
             <Profile user={user} />
            <UserCart user={user} cart={cart}/>
           </div>
          ) : (
            <div className="flex gap-2">
              <Button variant={"outline"} asChild>
                <Link href={"/auth/login"}>Log In</Link>
              </Button>
              
              <Button asChild>
                <Link href={"/auth/signup"}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
    </nav>

  );
};

export default Nav;
