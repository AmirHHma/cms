// app/dashboard/page.tsx
import { getUserInformation } from "@/app/lib/session";

export default async function Dashboard() {
  const user= await getUserInformation()
  if(user?.role!=='ADMIN')return;

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (

    <>
    <h1>sig range range</h1>
    
    
    </>
  );
}

