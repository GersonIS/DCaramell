import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UiProviderCarrito } from "@/context/UiProvideCarrito";
import { CustomerProvider } from "@/context/UiProvideUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D' Caramel",
  description: "Tienda de pasteleria y decoraciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomerProvider>
          <UiProviderCarrito>
            <Header />
            <main>{children}</main>
            <Footer />
          </UiProviderCarrito>
        </CustomerProvider>
      </body>
    </html>
  );
}
