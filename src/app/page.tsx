import { auth } from "@/auth"; // Your NextAuth v5 server auth config
import { redirect } from "next/navigation";
import LandingClientView from "../components/LandingClientView";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <LandingClientView />;
}
