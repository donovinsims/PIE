import { Banner } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "About Pietro's Pizzeria | Roscoe, IL",
  description: "Learn about Pietro's Pizzeria in Roscoe, IL. Family-owned since 1991, serving homemade pizza, sandwiches, and desserts with fresh ingredients daily.",
};

const ABOUT_BANNER = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_7628-1920w.jpg");

const KH = [
  ["Year Established", "1991"],
  ["Products", ""],
  ["Services", "Pizza, Sandwiches, Appetizers, Gaming"],
  ["Specialties", "Pizzeria"],
  ["Associations", ""],
  ["Brands", "Broaster Chicken"],
  ["Business Hours", SITE.hoursShort],
  ["Payment Types", "American Express, Cash, Check, Discover, MasterCard, Visa"],
  ["Business Attributes", ""],
  ["Languages", "English"],
];

export default function AboutPage() {
  return (
    <div className="page-about">
      <>
      <Banner title="About Pietro's Pizzeria" bg={ABOUT_BANNER} />
      <section className="about-card">
        <div className="about-cols">
          <div>
            <h2 className="reviews-heading">About Us</h2>
            <p>
              Pietro&apos;s Pizzeria provides pizza, dinners, sandwiches, appetizers, and more to the Roscoe, IL area. This
              locally owned and operated restaurant is known for its delicious homemade Italian food, made with fresh
              ingredients every day. Carry out, delivery, and dine-in options are all available, plus a full service
              bar with gaming and Sunday Ticket.
            </p>
          </div>
          <div>
            <h2 className="reviews-heading">Business Information</h2>
            <dl className="kv-list">
              {KH.filter(([, value]) => value.trim()).map(([k, v]) => (
                <div className="kv-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="center mt-md">
          <a className="about-fb" href={SITE.facebook}>Facebook</a>
        </div>
      </section>
    </>
    </div>
    
  );
}
