import { Banner } from "@/components/Banner";
import GalleryGrid from "@/components/GalleryGrid";
import { asset } from "@/lib/assets";

export const metadata = {
  title: "Pietro's Pizzeria Gallery | Roscoe, IL",
  description: "Browse photos of Pietro's Pizzeria in Roscoe, IL. See our delicious homemade pizzas, sandwiches, appetizers, and our spacious new dining area.",
};

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);
const GALLERY_BANNER = "/assets/le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/reviews-gallery-banner-2880w.jpg";

const IMGS = [
  { file: "IMG_1907-1920w.jpg", alt: "Freshly baked pizza with melted cheese at Pietro's Pizzeria" },
  { file: "IMG_7610-1920w.jpg", alt: "Pietro's Pizzeria dining area with warm lighting" },
  { file: "IMG_7609-1920w.jpg", alt: "Close-up of a hand-tossed pizza being prepared" },
  { file: "g4-1920w.jpg", alt: "Pietro's Pizzeria interior with booth seating" },
  { file: "g2-1920w.jpg", alt: "A delicious sandwich from Pietro's Pizzeria menu" },
  { file: "g1-1920w.jpg", alt: "Pietro's Pizzeria restaurant exterior" },
  { file: "g3-1920w.jpg", alt: "Fresh ingredients used at Pietro's Pizzeria" },
  { file: "IMG_7605-1920w.jpg", alt: "Pietro's Pizzeria bar area with full service" },
  { file: "IMG_7606-1920w.jpg", alt: "A pepperoni pizza from Pietro's Pizzeria" },
  { file: "IMG_7604-1920w.jpg", alt: "Pietro's Pizzeria appetizers and side dishes" },
  { file: "IMG_7629-1920w.jpg", alt: "Pietro's Pizzeria gaming area" },
  { file: "IMG_7628-1920w.jpg", alt: "Pietro's Pizzeria spacious dining room" },
  { file: "g6-1920w.jpg", alt: "A slice of pizza being served at Pietro's Pizzeria" },
  { file: "IMG_7603-1920w.jpg", alt: "Pietro's Pizzeria kitchen with fresh pizza being made" },
  { file: "IMG_7602-1920w.jpg", alt: "Pietro's Pizzeria dessert options" },
  { file: "pietrospizzeria-gallery-image-16-1920px-1920w.jpg", alt: "Pietro's Pizzeria main dining area with tables and chairs" },
  { file: "pietrospizzeria-gallery-image-15-1920px-1920w.jpg", alt: "Pietro's Pizzeria casual dining atmosphere" },
].map((item) => ({
  full: p(item.file),
  mobile: p(item.file.replace("-1920w.jpg", "-640w.jpg")),
  alt: item.alt,
}));

export default function GalleryPage() {
  return (
    <div className="page-gallery">
      <>
      <Banner title="Pietro's Pizzeria Gallery" bg={GALLERY_BANNER} />
      <section className="intro">
        <h2>Check Out Our Great Food Options</h2>
        <p>
          Check out the freshly made delicious food we serve at Pietro's Pizzeria. If you're planning a lunch with
          friends, a special dinner, or a big party, we are here for you. Lovingly made using fresh ingredients, our
          food will become your favorite. Call us for delivery and carry out.
        </p>
      </section>
      <section className="gallery-grid-wrap">
        <GalleryGrid images={IMGS} />
      </section>
    </>
    </div>
    
  );
}
