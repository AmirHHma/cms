import ModifyUser from "@/app/views/UserDetailView";
import { getSpecificUser } from "../../dashboardActions";
import { User } from "@/app/generated/prisma";

 const page = async({params}:{params:{id:string}}) => {
  let {id}=await params;
 const user=await getSpecificUser(id) as User
 return <ModifyUser user={user}></ModifyUser>
}
export default page;