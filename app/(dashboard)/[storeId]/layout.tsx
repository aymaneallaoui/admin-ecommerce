import NavBar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";

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
      <NavBar />
      {children}
    </>
  );
}
