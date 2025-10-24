import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup   , DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User  } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { localUser } from "../types/types";

 const Profile = ({user}:{user:localUser}) => {
 return (  <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full ring-1 aspect-square size-8 p-1 cursor-pointer "
              asChild
            >
              <Button variant={"outline"}>
                <User className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                
                {user?.role=="ADMIN" &&<DropdownMenuItem>
                  <Link href={"/dashboard"}>dashboard</Link>
                </DropdownMenuItem>}
                <DropdownMenuItem>
                  <Link href={"/profile"}>profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Link href={"/auth/logout"}>Log Out</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> );
}
export default Profile;