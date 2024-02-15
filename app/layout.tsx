import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "./_components/footer";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BAE Barber",
  description: "Site com finalidade de alocar as melhores barbearias que existe no mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} dark`}>
        <AuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
