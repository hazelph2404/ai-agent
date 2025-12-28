import DashboardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar'
import {auth} from '@/lib/auth';
import HomeView from '@/modules/home/ui/views/home-view';
import {redirect} from "next/navigation";
import { headers } from 'next/headers';
const Page = async () => {
  const session = auth.api.getSession({
    headers: await headers(), 
  })
  if(!session){
    redirect("/sign-in")
  }
  return (
    <div>
      <HomeView/>
      <DashboardNavbar/>
    </div>
  )
}

export default Page