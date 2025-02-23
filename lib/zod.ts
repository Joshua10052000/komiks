import { z } from "zod";

type OrderQuerySchema = z.infer<typeof orderQuerySchema>;
type MangasQuerySchema = z.infer<typeof mangasQuerySchema>;
type MangaQuerySchema = z.infer<typeof mangaQuerySchema>;
type ScanlationGroupQuerySchema = z.infer<typeof scanlationGroupSchema>;
type ChaptersQuerySchema = z.infer<typeof chaptersQuerySchema>;

const orderQuerySchema = z
  .object({
    title: z.enum(["asc", "desc"]).optional(),
    year: z.enum(["asc", "desc"]).optional(),
    createdAt: z.enum(["asc", "desc"]).optional(),
    updatedAt: z.enum(["asc", "desc"]).optional(),
    latestUploadedChapter: z.enum(["asc", "desc"]).default("desc").optional(),
    followedCount: z.enum(["asc", "desc"]).optional(),
    relevance: z.enum(["asc", "desc"]).optional(),
    rating: z.enum(["asc", "desc"]).optional(),
  })
  .strict({ message: "Unrecognized order query" });

const mangaQuerySchema = z
  .object({
    includes: z
      .array(
        z.enum(["manga", "cover_art", "author", "artist", "tag", "creator"])
      )
      .default([])
      .optional(),
  })
  .strict({ message: "Unrecognized manga query" });

const mangasQuerySchema = z
  .object({
    limit: z.number().default(10).optional(),
    offset: z.number().optional(),
    title: z.string().optional(),
    authorOrArtist: z.string().optional(),
    authors: z.array(z.string()).default([]).optional(),
    artists: z.array(z.string()).default([]).optional(),
    year: z.string().or(z.number()).optional(),
    includedTags: z.array(z.string()).default([]).optional(),
    includedTagsMode: z.enum(["OR", "AND"]).default("OR").optional(),
    status: z.enum(["ongoing", "completed", "hiatus", "cancelled"]).optional(),
    originalLanguage: z.array(z.string()).default([]).optional(),
    excludedOriginalLanguage: z.array(z.string()).default([]).optional(),
    availableTranslatedLanguage: z.array(z.string()).default([]).optional(),
    publicationDemographic: z
      .array(z.enum(["shounen", "shoujo", "josei", "seinen", "none"]))
      .default([])
      .optional(),
    ids: z.array(z.string()).default([]).optional(),
    contentRating: z
      .array(z.enum(["safe", "suggestive", "erotica", "pornographic"]))
      .default([])
      .optional(),
    createdAtSince: z.string().optional(),
    updatedAtSince: z.string().optional(),
    order: orderQuerySchema.optional(),
    includes: z
      .array(
        z.enum(["manga", "cover_art", "author", "artist", "tag", "creator"])
      )
      .default([])
      .optional(),
    hasAvailableChapters: z.enum(["0", "1", "true", "false"]).optional(),
    group: z.string().optional(),
  })
  .strict({ message: "Unrecognized mangas query" });

const scanlationGroupSchema = z
  .object({
    limit: z.number().default(10).optional(),
    offset: z.number().optional(),
    ids: z.array(z.string()).default([]).optional(),
    name: z.string().optional(),
    focusedLanguage: z.string().optional(),
    includes: z
      .array(z.enum(["leader", "member"]))
      .default([])
      .optional(),
    order: orderQuerySchema.optional(),
  })
  .strict({ message: "Unrecognized scanlation group query" });

const chapterOrderQuerySchema = z
  .object({
    createdAt: z.enum(["asc", "desc"]).optional(),
    updatedAt: z.enum(["asc", "desc"]).optional(),
    publishAt: z.enum(["asc", "desc"]).optional(),
    readableAt: z.enum(["asc", "desc"]).optional(),
    volume: z.enum(["asc", "desc"]).optional(),
    chapter: z.enum(["asc", "desc"]).optional(),
  })
  .strict({ message: "Unrecognized chapter order query" });

const chaptersQuerySchema = z.object({
  limit: z.number().default(100).optional(),
  offset: z.number().optional(),
  translatedLanguage: z.array(z.string()).default([]).optional(),
  originalLanguage: z.array(z.string()).default([]).optional(),
  excludedOriginalLanguage: z.array(z.string()).default([]).optional(),
  contentRating: z
    .array(z.enum(["safe", "suggestive", "erotica", "pornographic"]))
    .default([])
    .optional(),
  excludedGroups: z.array(z.string()).default([]).optional(),
  excludedUploaders: z.array(z.string()).default([]).optional(),
  includeFutureUpdates: z.enum(["0", "1"]).default("1").optional(),
  createdAtSince: z.string().optional(),
  updatedAtSince: z.string().optional(),
  publishAtSince: z.string().optional(),
  order: chapterOrderQuerySchema.optional(),
  includes: z
    .array(z.enum(["manga", "scanlation_group", "user"]))
    .default([])
    .optional(),
  includeEmptyPages: z.number().optional(),
  includeFuturePublishAt: z.number().optional(),
  includeExternalUrl: z.number().optional(),
});

export {
  orderQuerySchema,
  mangasQuerySchema,
  mangaQuerySchema,
  scanlationGroupSchema,
  chaptersQuerySchema,
};
export type {
  OrderQuerySchema,
  MangasQuerySchema,
  MangaQuerySchema,
  ScanlationGroupQuerySchema,
  ChaptersQuerySchema,
};
