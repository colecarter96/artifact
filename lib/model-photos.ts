const MODEL_PHOTO_BY_SLUG: Record<string, string> = {
  empath: "empath.png",
  "open-minded": "openMinded.png",
  lesbian: "lesbian.png",
  genitals: "genitals.png",
  puh: "eatMorPuh.png",
  "day-ones": "switchUpBack.png",
};

export function getModelPhotoUrl(slug: string): string | undefined {
  const file = MODEL_PHOTO_BY_SLUG[slug];
  return file ? `/modelPhotos/${file}` : undefined;
}
