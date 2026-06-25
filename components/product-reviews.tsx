import {
  getProductReviews,
  getReviewSummary,
  type ProductReview,
} from "@/lib/reviews";

type ProductReviewsProps = {
  slug: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-black" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>{index < rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="border-t border-neutral-100 py-4 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{review.author}</p>
        <p className="text-xs text-neutral-400">{review.date}</p>
      </div>
      <div className="mt-1">
        <Stars rating={review.rating} />
        <span className="sr-only">{review.rating} out of 5 stars</span>
      </div>
      {review.body ? (
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {review.body}
        </p>
      ) : null}
    </article>
  );
}

export function ProductReviews({ slug }: ProductReviewsProps) {
  const reviews = getProductReviews(slug).filter((review) => review.body.trim());
  const { average, count } = getReviewSummary(slug);

  return (
    <section className="border-t border-neutral-200 pt-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase">Reviews</h2>
        <p className="text-xs text-neutral-500">
          {average} · {count} reviews
        </p>
      </div>
      <div className="mt-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
