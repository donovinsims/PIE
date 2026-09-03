import { Banner } from "@/components/Banner";
import { asset } from "@/lib/assets";

export const metadata = { title: "Pietro's Pizzeria Gallery | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);
const GALLERY_BANNER = "/assets/le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/reviews-gallery-banner-2880w.jpg";

const IMGS = [
  "IMG_1907-1920w.jpg",
  "IMG_7610-1920w.jpg",
  "IMG_7609-1920w.jpg",
  "g4-1920w.jpg",
  "g2-1920w.jpg",
  "g1-1920w.jpg",
  "g3-1920w.jpg",
  "IMG_7605-1920w.jpg",
  "IMG_7606-1920w.jpg",
  "IMG_7604-1920w.jpg",
  "IMG_7629-1920w.jpg",
  "IMG_7628-1920w.jpg",
  "g6-1920w.jpg",
  "IMG_7603-1920w.jpg",
  "IMG_7602-1920w.jpg",
  "pietrospizzeria-gallery-image-16-1920px-1920w.jpg",
  "pietrospizzeria-gallery-image-15-1920px-1920w.jpg",
].map((file) => ({
  full: p(file),
  mobile: p(file.replace("-1920w.jpg", "-640w.jpg")),
}));

export default function GalleryPage() {
  return (
    <div className="page-gallery">
      <>
      <Banner title="Pietro's Pizzeria Gallery" bg={GALLERY_BANNER} />
      <section className="intro">
        <h3>Check Out Our Great Food Options</h3>
        <p>
          Check out the freshly made delicious food we serve at Pietro's Pizzeria. If you're planning a lunch with
          friends, a special dinner, or a big party, we are here for you. Lovingly made using fresh ingredients, our
          food will become your favorite. Call us for delivery and carry out.
        </p>
      </section>
      <section className="gallery-grid">
        {IMGS.map((image) => (
          <img
            key={image.full}
            src={image.full}
            srcSet={`${image.mobile} 640w, ${image.full} 1920w`}
            sizes="(max-width: 899px) calc((100vw - 50px) / 2), 280px"
            alt=""
            loading="lazy"
          />
        ))}
      </section>
    </>
    </div>
    
  );
}
