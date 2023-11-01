import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import { ModeToggle } from "./ui/Theme-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

async function NavBar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="border-b ">
      <div className="flex items-center h-16 px-4 ">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="flex items-center ml-auto space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
