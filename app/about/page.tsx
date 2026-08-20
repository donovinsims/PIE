import { Banner } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const metadata = { title: "About Pietro's Pizzeria | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

const KH = [
  ["Year Established", "1991"],
  ["Products", ""],
  ["Services", "Pizza, Sandwiches, Appetizers, Gaming"],
  ["Specialties", "Pizzeria"],
  ["Associations", ""],
  ["Brands", "Broaster Chicken"],
  ["Business Hours", "Mon - Thu, Sun 10:00 am - 9:45 pm\nFri, Sat 10:00 am - 10:45 pm"],
  ["Payment Types", "American Express, Cash, Check, Discover, MasterCard, Visa"],
  ["Business Attributes", ""],
  ["Languages", "English"],
];

export default function AboutPage() {
  return (
    <div className="page-about">
      <>
      <Banner title="About Pietro's Pizzeria" bg={p("living-room-interior-design-white-sofa-2880w.jpg")} />
      <section className="about-card">
        <div className="about-cols">
          <div>
            <h3 style={{ fontFamily: "Quicksand", fontSize: 22, color: "#C10000" }}>About Us</h3>
            <p style={{ fontSize: 15, color: "#252525" }}>
              Pietro's Pizzeria provides pizza, dinners, sandwiches, appetizers, and more to the Roscoe, IL area. This
              locally owned and operated restaurant is known for its delicious homemade Italian food, made with fresh
              ingredients every day. Carry out, delivery, and dine-in options are all available, plus a full service
              bar with gaming and Sunday Ticket.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "Quicksand", fontSize: 22, color: "#C10000" }}>Business Information</h3>
            <dl className="kv-list">
              {KH.map(([k, v]) => (
                <li key={k}>
                  <dt>{k}</dt>
                  <dd>{v || "—"}</dd>
                </li>
              ))}
            </dl>
          </div>
        </div>
        <div className="center" style={{ marginTop: 24 }}>
          <a href={SITE.facebook}>Facebook</a>
        </div>
      </section>
    </>
    </div>
    
  );
}