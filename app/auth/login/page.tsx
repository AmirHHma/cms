"use client";
import { User } from "@/app/generated/prisma";
import { loginUser } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const LogIn = () => {

  let [msg, loginAction, pending] = useActionState<
    { data: User | null; error: Record<string, string> | null },
    FormData
  >(loginUser, { data: null, error: null });
  const [showPass, setShowpass] = useState(false);
  const router=useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData(form);

    startTransition(() => {
      loginAction(formData);
    });
  };

  useEffect(() => {
    if (msg.data) {
      toast(`welcome ${msg.data.name}`, { position: "top-center" });

      localStorage.setItem(
        "user",
        JSON.stringify({ name: msg.data.name, username: msg.data.username })
      );
      // location.assign("/");
      router.push('/')

    }
    if (msg?.error?.msg) {
      toast(`make sure you are connected to the internet`);
    }
  }, [msg]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center min-h-screen"
      >
        <Card className="max-w-xl grow min-w-sm ">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardContent className="flex flex-col gap-4 [&>*>label]:pb-3 [&>*>p]:text-red-600 [&>*>p]:pt-1">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input name="username" placeholder="example123" id="username" />
                <p>{msg.error?.username}</p>
              </div>
              <div>
                <Label htmlFor="pass">Password</Label>
                <div className="relative ">
                  <Input
                    name="password"
                    placeholder="exAmple/99"
                    id="pass"
                    type={showPass ? "text" : "password"}
                  />
                  <span
                    className="absolute right-2 top-1/5"
                    onClick={() => setShowpass((prev) => !prev)}
                  >
                    {showPass ? <Eye /> : <EyeClosed />}
                  </span>
                </div>

                <p>{msg.error?.password}</p>
              </div>
              <Button disabled={pending}>Login</Button>
              <Label>
                Do not have an account yet?
                <Link href="/auth/signup" className="underline">
                  sign up
                </Link>
              </Label>
            </CardContent>
          </CardHeader>
        </Card>
      </form>
      {msg.data && (
        <div className="flex justify-center grow-0 mt-3">
          <Button asChild>
            <Link href={"/"}>Go to the main page</Link>
          </Button>{" "}
        </div>
      )}
    </>
  );
};
export default LogIn;
