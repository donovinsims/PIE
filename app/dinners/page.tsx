import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_DINNERS } from "@/lib/menus";

export const metadata = { title: "Pietro's Pizzeria Dinner Menu | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function DinnersPage() {
  return (
    <div className="page-dinners">
      <>
      <Banner title="Dinner Menu" bg={p("IMG_7609-2880w.jpg")} mobileBg={p("IMG_7609-640w.jpg")} />
      <Intro title="Order the Perfect Meal for Your Family">
        If you're looking for great food to share with your family or friends, visit Pietro's Pizzeria and take a look
        at our dinner menu. Made using fresh ingredients, we serve homemade food that will titillate your palate. You
        can order carry out or get your meal delivered. Call us for details.
      </Intro>
      <MenuSection title="Menu" cats={MENU_DINNERS} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}
