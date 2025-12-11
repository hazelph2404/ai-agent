import HomeView from "@/modules/home/ui/home-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log(session)
  if (!session) {
    redirect("/auth/sign-in");
  }
  return <HomeView />;
};

export default page;
