import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Pietro's Pizzeria",
    template: "%s",
  },
  description: "Pietro's Pizzeria — Homemade Food | Fresh Ingredients | Delivery and Carry Out in Roscoe, IL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="dmInner">{children}</main>
        <Footer />
      </body>
    </html>
  );
}