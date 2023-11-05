import NavBar from "@/components/navbar";
import { NextResponse } from "next/server";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

interface SetupLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function SetupLayout({
  children,
  params,
}: SetupLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <NextTopLoader
        color="#7c3aed"
        initialPosition={0.08}
        crawlSpeed={200}
        height={6}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 40px #7c3aed,0 0 10px #7c3aed"
      />
      <NavBar />
      {children}
    </>
  );
}
