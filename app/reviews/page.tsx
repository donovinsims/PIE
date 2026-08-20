import { Banner } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const metadata = { title: "Reviews | Pietro's Pizzeria" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

const REVIEWS = [
  { name: "Cristy L", date: "8/9/2026", text: "Great bartenders. Good specks. Yum." },
  { name: "Chad P", date: "8/1/2026", text: "Excellent pizza and service" },
  {
    name: "Kelie S",
    date: "7/28/2026",
    text: 'My company did a catering order a couple months back, the food was absolutely amazing; my team is still talking about it! They are so happy it wasn\'t another corporate owned food supplier & fighting over seconds & thirds. Setting up catering was super easy & delivered right on time, everything we needed. This is a great locally owned spot with awesome food & service. We will be using them again!',
  },
  { name: "Kathi J", date: "7/27/2026", text: "Love their sauce. Reasonably priced lunch. Nice dining area" },
  {
    name: "Missy H",
    date: "7/26/2026",
    text: "My brother never disappoints when hosting parties serving Pietro's! Best salad (my personal favorite), pizza, chicken, pasta, every time!",
  },
  { name: "D D", date: "7/19/2026", text: "Anyways, a pleasure! Delicious pizza, friendly fast service and decent prices." },
  { name: "Gail J", date: "7/14/2026", text: "Excellent pizza!!" },
  {
    name: "Amy H",
    date: "7/3/2026",
    text: "Busy place, but that's because everyone wants pizza. I've always been happy with the food and customer service. Be prepared for longer wait times on to-go orders, they tell you on the phone. It's worth the wait, food is so amazing, fresh, hot out of the oven. They only recently opened the dining room (last year or so?) I've never dined in, so couldn't tell you about it, but big TVs, nice open atmosphere.",
  },
  { name: "Jim Mc G", date: "6/7/2026", text: "Dam Good Pizza, Great Sauce!" },
  { name: "Brian E", date: "5/28/2026", text: "" },
];

export default function ReviewsPage() {
  return (
    <div className="page-reviews">
      <>
      <Banner title="Pietro's Pizzeria Customer Reviews" bg={p("IMG_7580+(1)-2880w.jpg")} />
      <section className="reviews-head">
        <h3 style={{ fontFamily: "Quicksand, sans-serif", fontSize: 22, color: "#C10000" }}>
          Here's what our satisfied customers are saying...
        </h3>
        <div className="rating-big">( 4.3 )</div>
        <div className="stars-lg">★★★★★</div>
        <div style={{ fontSize: 16 }}>Overall Rating</div>
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
      <section className="center" style={{ padding: "20px 0 50px" }}>
        <button className="pill-btn sm" type="button">
          Load More
        </button>
      </section>
    </>
    </div>
    
  );
}