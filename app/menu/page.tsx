import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_MENU } from "@/lib/menus";

export const metadata = { title: "Pietro's Pizzeria Pizza Menu | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function MenuPage() {
  return (
    <div className="page-menu">
      <>
      <Banner title="Pizza Menu" bg={p("IMG_7606-2880w.jpg")} />
      <Intro title="Never Say No to Freshly Made, Homemade Pizza!">
        Is there anybody out there who does not love pizza? Hardly anybody, right? Contact Pietro's Pizzeria for
        amazing homemade pizza. We also have gluten-free crust and cauliflower crust options. We even grate our own
        cheese. Check out our <a href="/menu">pizza menu</a>. You can order delivery or carry out. Call us today!
      </Intro>
      <MenuSection title="Menu" cats={MENU_MENU} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}