import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("$$Session", session);
  if (!session?.user?.accessToken) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-[20%]">
        Welcome to Coocon Team {session?.user?.email}
      </h1>
    </div>
  );
};

export default DashboardPage;
