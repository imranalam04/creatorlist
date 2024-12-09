import { SessionProvider } from "next-auth/react";
import HeroForm from "../components/forms/HeroForm";
import Header from "../components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="bg-gray-100">
      <section className="p-20 mx-24">
      <div className="max-w-md">
      <h1 className="text-6xl font-bold">Your one link <br /> for everything</h1>
      <h2 className="text-gray-500 text-xl mt-6 mb-6">Share your links, social profiles, contact info and more on one page</h2>
      </div>
      
      <HeroForm user={session?.user}/>
   
      </section>
    </div>
  );
}
