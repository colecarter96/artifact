const MODEL_PHOTO_BY_SLUG: Record<string, string> = {
  empath: "empath.png",
  "open-minded": "openMinded.png",
  lesbian: "lesbian.png",
  genitals: "genitals2.png",
  puh: "eatMorPuh.png",
  "day-ones": "switchUpBack.png",
};

/** Vertical crop anchor (% from top of source image). Lower = more top visible; raise to shift crop down in-frame. */
const MODEL_PHOTO_OBJECT_POSITION_Y: Partial<Record<string, number>> = {
  empath: 0,
  genitals: 0,
};

export function getModelPhotoUrl(slug: string): string | undefined {
  const file = MODEL_PHOTO_BY_SLUG[slug];
  return file ? `/modelPhotos/${file}` : undefined;
}

export function getModelPhotoImageProps(slug: string): {
  className: string;
  style?: { objectPosition: string };
} {
  const y = MODEL_PHOTO_OBJECT_POSITION_Y[slug];
  if (y !== undefined) {
    return {
      className: "object-cover",
      style: { objectPosition: `center ${y}%` },
    };
  }
  return { className: "object-cover object-center" };
}
