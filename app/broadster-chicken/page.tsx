import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_BROADSTER_CHICKEN } from "@/lib/menus";

export const metadata = { title: "Pietro's Pizzeria Broaster Chicken | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function BroasterChickenPage() {
  return (
    <div className="page-broadster-chicken">
      <>
      <Banner title="Broaster Chicken" bg={p("IMG_7579-2880w.jpg")} />
      <Intro title="Try Our Popular Broaster Chicken">
        Our Broaster chicken is a complete and satisfying meal. If you're ever craving Broaster chicken, call Pietro's
        Pizzeria and place an order for delivery or carry out.
      </Intro>
      <MenuSection title="Menu" cats={MENU_BROADSTER_CHICKEN} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}