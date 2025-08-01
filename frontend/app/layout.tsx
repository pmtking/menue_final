import type { Metadata } from "next";
import '../public/fonts/style.css'
import '../styles/sass/main.scss';
import "./globals.css";
import NavBar from "@/components/NavBar/page";
import toast, { Toaster } from 'react-hot-toast';



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" className="dark" dir="rtl">
      <body
        className={` antialiased`}
      >
        <main className="flex flex-col items-center justify-center">
            <Toaster />
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
