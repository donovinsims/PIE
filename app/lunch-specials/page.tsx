import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_LUNCH_SPECIALS } from "@/lib/menus";

export const metadata = {
  title: "Pietro's Pizzeria Lunch Specials | Roscoe, IL",
  description: "Grab Pietro's Pizzeria lunch specials in Roscoe, IL. Affordable daily deals on pizza, sandwiches, and more — dine-in, carry out, or delivery.",
};

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function LunchSpecialsPage() {
  return (
    <div className="page-lunch-specials">
      <>
      <Banner title="Lunch Specials" bg={p("IMG_7629-1920w.jpg")} mobileBg={p("IMG_7629-640w.jpg")} />
      <Intro title="Try Our Homemade Lunch Specials">
        At Pietro's Pizzeria, all our food is homemade, using fresh ingredients. We don't use anything pre-made and we
        even grate our own cheese. If you're looking for great lunch options, call us today.
      </Intro>
      <MenuSection title="Menu" cats={MENU_LUNCH_SPECIALS} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}
