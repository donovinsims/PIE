import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileQuickActions from "@/components/MobileQuickActions";

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
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        <main className="dmInner" id="main-content">{children}</main>
        <Footer />
        <MobileQuickActions />
      </body>
    </html>
  );
}
