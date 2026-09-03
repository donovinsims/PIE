import { Banner, Intro, MenuSection } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { MENU_FAMILY_OR_PARTY_TRAYS } from "@/lib/menus";

export const metadata = { title: "Pietro's Pizzeria Party Trays Menu | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function PartyTraysPage() {
  return (
    <div className="page-family-or-party-trays">
      <>
      <Banner title="Family or Party Trays" bg={p("IMG_7601-2880w.jpg")} mobileBg={p("IMG_7601-640w.jpg")} />
      <Intro title="Family or Party Trays for a Special Event">
        Are you planning a family celebration or a special event? At Pietro's Pizzeria, we have a special party tray
        menu that you can choose from. All the dishes are carefully chosen and combined to make sure everyone is well
        fed. Check out what we have to offer. <a href="/contact">Order now</a>, and enjoy some great food at your next
        party.
      </Intro>
      <MenuSection title="Menu" cats={MENU_FAMILY_OR_PARTY_TRAYS} note="Plus tax and delivery. Prices subject to change. No substitutions allowed." />
    </>
    </div>
    
  );
}
