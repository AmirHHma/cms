"use client";
import { Role, User } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { addUserAction } from "../(private)/dashboard/dashboardActions";

const ModifyUser = ({ user }: { user: User }) => {

  const [msg, addUser, pending] = useActionState<
    { data: User | null; err: Record<string, string> | null; success: boolean },
    FormData
  >(addUserAction, { data: user, err: null, success: false });

  useEffect(() => {
    if (msg.success) {
      toast(`operation was successful`, {
        position: "top-center",
      });
    }
  }, [msg]);

  return (
    <div className="flex justify-center ">
      <form
        action={addUser}
        className="max-w-2xl grow max-sm:px-3 sm:px-5 max-md:px-8 md:px-10 grid gap-3 [&>p]:text-red-400 ring p-5 rounded-xl ring-neutral-500"
      >
        <Input value={user?.id} type="hidden" name="id" />
        <Label>Name</Label>
        <Input type="text" defaultValue={msg.data?.name} name="name" />
        <p>{msg.err?.name}</p>
        <Label>UserName</Label>
        <Input type="text" defaultValue={msg.data?.username} name="username" />
        <p>{msg.err?.username}</p>
        <Label>Email</Label>
        <Input type="text" defaultValue={msg.data?.email} name="email" />
        <p>{msg.err?.email}</p>
        <Label>Password</Label>
        <Input type="text" defaultValue={msg.data?.password} name="password" />
        <p>{msg.err?.password}</p>
        <Select name="role" defaultValue={msg.data?.role}>
          <div className="flex gap-3">
            <Label htmlFor="role">Role</Label>
            <SelectTrigger id="role">
              <SelectValue placeholder="choose role"></SelectValue>
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                {Object.entries(Role).map((item, i) => (
                  <SelectItem key={i} value={item[1]}>
                    {item[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectGroup>
          </div>
          <p>{msg.err?.role}</p>
        </Select>

        <div className="flex justify-between px-10">
          <Button variant={"outline"} asChild>
            <Link href={"/dashboard/users"}>Go Back</Link>
          </Button>
          <Button disabled={pending} type="submit">
            {msg.data?.name?'Update':'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ModifyUser;
