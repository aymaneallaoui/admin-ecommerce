import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
// import { Inter } from "next/font/google";
import { GeistSans } from "geist/font";
import type { Metadata } from "next";
import { ModalProvider } from "@/providers/modal-provider";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { Toaster } from "@/components/ui/toaster";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <Toaster />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
