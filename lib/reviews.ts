export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
};

const sharedReviews: ProductReview[] = [
  {
    id: "r1",
    author: "jordan m.",
    rating: 5,
    date: "Mar 12, 2026",
    body: "Wore this to brunch and three strangers asked if I was okay. Five stars.",
  },
  {
    id: "r2",
    author: "casey r.",
    rating: 5,
    date: "Feb 28, 2026",
    body: "Soft cotton, true to size, and emotionally concerning in the best way.",
  },
  {
    id: "r3",
    author: "devon k.",
    rating: 4,
    date: "Feb 9, 2026",
    body: "My therapist saw it and just nodded. That felt like approval.",
  },
];

const slugReviews: Record<string, ProductReview[]> = {
  empath: [
    {
      id: "empath-1",
      author: "morgan t.",
      rating: 5,
      date: "Mar 4, 2026",
      body: "Finally a shirt that matches my personality disorder (affectionate).",
    },
    ...sharedReviews.slice(0, 2),
  ],
  "open-minded": [
    {
      id: "open-1",
      author: "riley s.",
      rating: 5,
      date: "Mar 1, 2026",
      body: "Got more compliments than follow-up questions. Perfect ratio.",
    },
    ...sharedReviews.slice(1, 3),
  ],
  lesbian: [
    {
      id: "les-1",
      author: "alex p.",
      rating: 5,
      date: "Feb 22, 2026",
      body: "Nobody knew. Then they knew. Shirt did its job.",
    },
    ...sharedReviews,
  ],
  genitals: [
    {
      id: "gen-1",
      author: "sam h.",
      rating: 5,
      date: "Feb 18, 2026",
      body: "Bold statement. Zero regrets. Mild HR concern at work.",
    },
    ...sharedReviews.slice(0, 2),
  ],
  puh: [
    {
      id: "puh-1",
      author: "taylor w.",
      rating: 5,
      date: "Mar 8, 2026",
      body: "No explanation needed, but I gave one anyway. Nobody understood. Perfect.",
    },
    ...sharedReviews.slice(1, 3),
  ],
  "day-ones": [
    {
      id: "day-1",
      author: "jamie l.",
      rating: 5,
      date: "Feb 14, 2026",
      body: "Front and back both go hard. Day ones were concerned. Good.",
    },
    ...sharedReviews,
  ],
};

export function getProductReviews(slug: string): ProductReview[] {
  return slugReviews[slug] ?? sharedReviews;
}

export function getAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
