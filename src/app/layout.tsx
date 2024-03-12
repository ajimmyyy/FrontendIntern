import type { Metadata } from "next";
import Main from "@/components/main";
import Header from "@/components/header";
import NextAuthProvider from "@/app/nextAuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的部落格",
  description: "部落格",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#f5f5f5]">
        <NextAuthProvider>
          <Header />
          <Main>{children}</Main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
