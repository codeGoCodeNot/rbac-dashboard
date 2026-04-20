import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/components/sidebar";
import { Toaster } from "sonner";
import RedirectToast from "@/components/redirect-toast";
import Providers from "./_provider/react-query-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savings Tracker",
  description: "A simple app to track your savings and expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        <Providers>
          <SidebarProvider>
            <SidebarInset>
              <AppSidebar />
              <Header />
              <main className="py-35 px-10 min-h-screen flex flex-col flex-1 overflow-y-auto mr-0 md:mr-10">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <RedirectToast />
          <Toaster expand />
        </Providers>
      </body>
    </html>
  );
}
