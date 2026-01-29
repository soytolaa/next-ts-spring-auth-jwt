import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
const mavenPro = Maven_Pro({    
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bean Team",
  description: "Manage your tasks and projects easily and efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mavenPro.className} antialiased`}>
        <NextTopLoader color="green" height={4} showSpinner={false} />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
