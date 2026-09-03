import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_APPETIZERS } from "@/lib/menus";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Pietro's Pizzeria Appetizer Menu | Roscoe, IL",
  description: "Start your meal with Pietro's Pizzeria appetizers in Roscoe, IL. Wings, mozzarella sticks, and more — available for delivery and carry out.",
};

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function AppetizersPage() {
  return (
    <div className="page-appetizers">
      <>
      <Banner title="Try Appetizers" bg={p("IMG_7610-640w.jpg")} />
      <Intro title="Satisfy Your Hunger Before Main Course">
        Get your meal started with a plate of delectable appetizers. Visit Pietro's Pizzeria, order one of our
        delicious appetizers before your main course. You won't be disappointed. We have a number of freshly made
        options for you to choose from.
      </Intro>
      <MenuSection title="Menu" cats={MENU_APPETIZERS} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}