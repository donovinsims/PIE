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
  { file: "IMG_1907-1920w.jpg", alt: "Crispy onion rings on a plate" },
  { file: "IMG_7610-1920w.jpg", alt: "Crispy chicken wings with crinkle-cut fries" },
  { file: "IMG_7609-1920w.jpg", alt: "Spaghetti and meatballs with salad and bread" },
  { file: "g4-1920w.jpg", alt: "Whole pepperoni pizza cooling on rack" },
  { file: "g2-1920w.jpg", alt: "Loaded supreme pizza with olives and peppers" },
  { file: "g1-1920w.jpg", alt: "Beef sandwiches with cheese and fries" },
  { file: "g3-1920w.jpg", alt: "Stuffed pizza topped with tomato sauce" },
  { file: "IMG_7605-1920w.jpg", alt: "Sausage pizza with melted cheese in box" },
  { file: "IMG_7606-1920w.jpg", alt: "Pepperoni pizza in a delivery box" },
  { file: "IMG_7604-1920w.jpg", alt: "Supreme pizza with olives, peppers and mushrooms" },
  { file: "IMG_7629-1920w.jpg", alt: "Two cheese slices with Mountain Dew can" },
  { file: "IMG_7628-1920w.jpg", alt: "Single cheese pizza slice with Pepsi can" },
  { file: "g6-1920w.jpg", alt: "Two boxed pizzas with olive toppings" },
  { file: "IMG_7603-1920w.jpg", alt: "Crispy chicken tenders in paper wrapper" },
  { file: "IMG_7602-1920w.jpg", alt: "Golden fried sticks with marinara sauce" },
  { file: "pietrospizzeria-gallery-image-16-1920px-1920w.jpg", alt: "Chocolate lava cake with fudge topping" },
  { file: "pietrospizzeria-gallery-image-15-1920px-1920w.jpg", alt: "Golden fried appetizer bites on plate" },
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
