export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
};

export type ReviewSummary = {
  average: number;
  count: number;
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
  chimi: [
    {
      id: "chimi-1",
      author: "marina c.",
      rating: 5,
      date: "Mar 10, 2026",
      body: "The glasses fit well on the face. Strong and beautiful frame. I really liked the purchase. Well packaged. Fast delivery. Thank you, seller.",
    },
    {
      id: "chimi-2",
      author: "lucas f.",
      rating: 5,
      date: "Feb 27, 2026",
      body: "Excellent quality",
    },
    {
      id: "chimi-3",
      author: "priya n.",
      rating: 5,
      date: "Feb 19, 2026",
      body: "",
    },
    {
      id: "chimi-4",
      author: "owen b.",
      rating: 4,
      date: "Feb 8, 2026",
      body: "",
    },
    {
      id: "chimi-5",
      author: "hana k.",
      rating: 5,
      date: "Jan 30, 2026",
      body: "",
    },
  ],
  cat: [
    {
      id: "cat-1",
      author: "sofia r.",
      rating: 5,
      date: "Mar 6, 2026",
      body: "Sun protection of good quality and very good material",
    },
    {
      id: "cat-2",
      author: "diego m.",
      rating: 5,
      date: "Feb 24, 2026",
      body: "Great for the price",
    },
    {
      id: "cat-3",
      author: "emily t.",
      rating: 5,
      date: "Feb 11, 2026",
      body: "I loved these sunglasses. very good quality and similar to original one. there's no case but for the price it's not an issue",
    },
    {
      id: "cat-4",
      author: "nina w.",
      rating: 5,
      date: "Jan 29, 2026",
      body: "Great quality, perfect fit. definitely worth purchasing",
    },
    {
      id: "cat-5",
      author: "carlos v.",
      rating: 5,
      date: "Jan 18, 2026",
      body: "",
    },
  ],
  jmm: [
    {
      id: "jmm-1",
      author: "alex h.",
      rating: 5,
      date: "Mar 9, 2026",
      body: "Great quality",
    },
    {
      id: "jmm-2",
      author: "rachel d.",
      rating: 5,
      date: "Feb 26, 2026",
      body: "Seriously good quality, which is surprising at this price point. will have to see how they hold up, but out the box they seems great. sturdy hinges, glasses don't feel flimsy at all.",
    },
    {
      id: "jmm-3",
      author: "megan s.",
      rating: 5,
      date: "Feb 14, 2026",
      body: "It's just like in the photo, it comes without a case but with a cloth to clean the lenses, it looks good with them, very pretty color.",
    },
    {
      id: "jmm-4",
      author: "tyler j.",
      rating: 5,
      date: "Feb 2, 2026",
      body: "Great glasses, high quality, sturdy, look exactly like picture",
    },
    {
      id: "jmm-5",
      author: "jess l.",
      rating: 4,
      date: "Jan 22, 2026",
      body: "",
    },
  ],
  ysl: [
    {
      id: "ysl-1",
      author: "dana p.",
      rating: 5,
      date: "Mar 8, 2026",
      body: "I like it a lot",
    },
    {
      id: "ysl-2",
      author: "marcus l.",
      rating: 5,
      date: "Feb 21, 2026",
      body: "Excellent",
    },
    {
      id: "ysl-3",
      author: "elena v.",
      rating: 4,
      date: "Feb 3, 2026",
      body: "Classic shape and solid build. Arrived faster than expected.",
    },
  ],
  oval: [
    {
      id: "oval-1",
      author: "jasmine k.",
      rating: 5,
      date: "Mar 11, 2026",
      body: "Looks exactly like the picture and are suuuuuper cute! For the price you can't beat this…also shipping was crazy fast! Love them all 🫶🏽 (ps…i have a tiny face but i can say confidently, these would suit whatever size face you have because despite being wide on me, it's still very stylish)",
    },
    {
      id: "oval-2",
      author: "maya r.",
      rating: 5,
      date: "Feb 25, 2026",
      body: "Cute and fits good",
    },
  ],
};

/** Store-wide average + total count when it differs from displayed reviews */
const reviewSummaries: Record<string, ReviewSummary> = {
  chimi: { average: 4.6, count: 14 },
  cat: { average: 4.8, count: 22 },
  jmm: { average: 4.7, count: 87 },
  ysl: { average: 4.4, count: 10 },
  oval: { average: 4.8, count: 354 },
};

export function getProductReviews(slug: string): ProductReview[] {
  return slugReviews[slug] ?? sharedReviews;
}

export function getReviewSummary(slug: string): ReviewSummary {
  const summary = reviewSummaries[slug];
  if (summary) return summary;

  const reviews = getProductReviews(slug);
  return {
    average: getAverageRating(reviews),
    count: reviews.length,
  };
}

export function getAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
