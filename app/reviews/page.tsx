import { Banner } from "@/components/Banner";
import { SITE } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";

export const metadata = {
  title: "Reviews | Pietro's Pizzeria",
  description: "Read customer reviews of Pietro's Pizzeria in Roscoe, IL. Rated 4.3 stars with 783 reviews. See what our diners say about our homemade food.",
};

const REVIEWS_BANNER = "/assets/le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/reviews-gallery-banner-2880w.jpg";

export default function ReviewsPage() {
  return (
    <div className="page-reviews">
      <>
      <Banner title="Pietro's Pizzeria Customer Reviews" bg={REVIEWS_BANNER} />
      <section className="reviews-head">
        <h2 className="reviews-heading">
          Here's what our satisfied customers are saying...
        </h2>
        <div className="rating-big">( 4.3 )</div>
        <div className="stars-lg">
          <span className="stars-filled" aria-hidden="true">★★★★</span>
          <span className="stars-partial" aria-hidden="true" style={{ "--pct": "30%" } as React.CSSProperties}>★</span>
        </div>
        <div className="reviews-rating-note">Overall Rating</div>
        <div className="reviews-actions" style={{ marginTop: 14 }}>
          <a className="pill-btn sm" href="https://www.pietrospizzeria.net/reviews#write-review">
            Write Review
          </a>
        </div>
        <div className="reviews-tabs">
          <span className="tab active">All (4.3 / 783 Ratings)</span>
          <span className="tab">(4.4 / 649 Ratings)</span>
        </div>
      </section>
      <section>
        {REVIEWS.map((r, i) => (
          <article className="review-card" key={i}>
            <div className="who">{r.name}</div>
            <div className="when">{r.date}</div>
            <div className="stars">★★★★★</div>
            {r.text && <p>{r.text}</p>}
          </article>
        ))}
      </section>
      <section className="center reviews-end">
        <p>You've reached the end of recent reviews.</p>
        <a className="pill-btn sm" href="https://www.pietrospizzeria.net/reviews">
          See more reviews on the source site
        </a>
      </section>
    </>
    </div>
    
  );
}
