import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetUsers } from "../dashboardActions";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";
// import { useState } from "react";

const Users = async ({searchParams}:{searchParams:{page:string}}) => {
  // const [page,setPage]=useState()
  const currPage=parseInt(await searchParams.page || "1")
  const pageSize=7
  const res = await GetUsers(currPage,pageSize);
  const users=res?.users
  const totalUsers:number|undefined=res?.totalUsers
  // const totalArr=Array.from({length:Math.ceil(totalUsers!/10)},(_,i)=>i+1)

  return (
    <div className="overflow-x-scroll no-scrollbar">
    <div className="flex justify-end pr-5">
    <Button asChild><Link prefetch href={'users/new'}>Add New User</Link></Button>

    </div>
    <Table >
      <TableCaption>a list of all your users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Count</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>UserName</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Signed in at:</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {users
          ? users.map((user, index) => (
              // <Link href={`?id=${user.id}`}>
                <TableRow key={index + 32} className="py-8">
                <TableCell>{index + 1}</TableCell>
                {/* <Button variant={'outline'} asChild><Link  href={`/dashboard/users/${user.id}`}><Edit/></Link></Button> */}
                <TableCell><Link href={`users/${user.id}`}><Edit/></Link></TableCell>
                <TableCell>{user.id.slice(0, 8)}+</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.registeredAt.toString()}</TableCell>
                
              </TableRow>
              // {/* </Link> */}
            ))
          : null}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            
            {totalUsers&&<Pagination  page={currPage} totalItems={totalUsers} divide={pageSize}/>}
              
              
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>

  );
};
export default Users;
