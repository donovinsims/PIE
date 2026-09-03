import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_SANDWICHES } from "@/lib/menus";

export const metadata = {
  title: "Pietro's Pizzeria Sandwiches Menu | Roscoe, IL",
  description: "Explore Pietro's Pizzeria sandwiches in Roscoe, IL. Calzones, Italian beef, and fresh-made subs served with fries for carry out or delivery.",
};

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function SandwichesPage() {
  return (
    <div className="page-sandwiches">
      <>
      <Banner title="Sandwich Menu" bg={p("g1-2880w.jpg")} mobileBg={p("g1-640w.jpg")} />
      <Intro title="Are You Craving a Fresh Homemade Sandwich?">
        Try one of our delicious sandwiches at Pietro's Pizzeria. Sandwiches are made fresh using fresh ingredients
        and served with fries. Visit us for carry out or place your order for delivery.
      </Intro>
      <MenuSection title="Menu" cats={MENU_SANDWICHES} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}
