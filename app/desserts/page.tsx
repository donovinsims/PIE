import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_DESSERTS } from "@/lib/menus";

export const metadata = {
  title: "Pietro's Pizzeria Desserts Menu | Roscoe, IL",
  description: "Save room for dessert at Pietro's Pizzeria in Roscoe, IL. Cannoli cake, fried Oreos, and more sweet treats for dine-in, delivery, or carry out.",
};

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function DessertsPage() {
  return (
    <div className="page-desserts">
      <>
      <Banner
        title="Dessert Menu"
        bg={p("pietrospizzeria-gallery-image-16-1920px-1920w.jpg")}
        mobileBg={p("pietrospizzeria-gallery-image-16-1920px-640w.jpg")}
      />
      <Intro title="Finish Your Meal With a Delectable Dessert">
        Who does not like to order dessert after a scrumptious meal? At Pietro's Pizzeria, we offer the most delectable
        desserts you will just fall in love with. What are you waiting for? Visit us today and order carry out from our
        menu.
      </Intro>
      <MenuSection title="Menu" cats={MENU_DESSERTS} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}
