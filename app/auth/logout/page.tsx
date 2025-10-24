"use client";

import { redirect } from "next/navigation";
import { LogOutUser } from "../../lib/actions";
import { useEffect, useState } from "react";

const LogOut = () => {
  let [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    let a = async () => {
      const logoutResult = await LogOutUser();
      setResult(() => logoutResult);
      if (logoutResult) {
      }
    };
    a();
    redirect("/");
  }, []);

  return <h1>{result ? "you logged out successfully" : "logging out..."}</h1>;
};
export default LogOut;
