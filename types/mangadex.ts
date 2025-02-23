interface Author {
  id: string;
  type: "author";
  attributes: AuthorAttributes;
  relationships: Relationship[];
}

interface AuthorAttributes {
  name: string;
  imageUrl: string | null;
  biography: AuthorBiography;
  twitter: string | null;
  pixiv: string | null;
  melonBook: string | null;
  fanBox: string | null;
  booth: string | null;
  nicoVideo: string | null;
  skeb: string | null;
  fantia: string | null;
  tumblr: string | null;
  youtube: string | null;
  weibo: string | null;
  naver: string | null;
  namicomi: string | null;
  website: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface AuthorBiography {}

interface Chapter {
  id: string;
  type: "chapter";
  attributes: ChapterAttributes;
  relationships: Relationship[];
}

interface ChapterAttributes {
  title: string | null;
  volume: string | null;
  chapter: string | null;
  pages: number;
  translatedLanguage: string;
  uploader: string;
  externalUrl: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishAt: string;
  readableAt: string;
}

interface Cover {
  id: string;
  type: "cover_art";
  attributes: CoverAttributes;
  relationships: Relationship[];
}

interface CoverAttributes {
  volume: string | null;
  fileName: string;
  description: string | null;
  locale: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface Manga {
  id: string;
  type: "manga";
  attributes: MangaAttributes;
  relationships: Relationship[];
}

interface MangaAttributes {
  title: MangaTitle;
  altTitles: MangaAlternativeTitle[];
  description: MangaDescription;
  isLocked: boolean;
  links: MangaLink;
  originalLanguage: string;
  lastVolume: string | null;
  lastChapter: string | null;
  publicationDemographic: "shounen" | "shoujo" | "josei" | "seinen" | null;
  status: "completed" | "ongoing" | "cancelled" | "hiatus";
  year: number | null;
  contentRating: "safe" | "suggestive" | "erotica" | "pornographic";
  chapterNumbersResetOnNewVolume: boolean;
  availableTranslatedLanguages: MangaAvailableTranslatedLanguages;
  latestUploadedChapter: string;
  tags: Tag[];
  state: "draft" | "submitted" | "published" | "rejected";
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface MangaTitle {
  en?: string;
  "ja-ro"?: string;
}

interface MangaAlternativeTitle {
  en?: string;
  ko?: string;
}

interface MangaDescription {
  en: string;
}

interface MangaLink {}

interface MangaAvailableTranslatedLanguages {}

interface Relationship<TAttributes = any> {
  id: string;
  type: string;
  attributes: TAttributes;
}

interface ScanlationGroup {
  id: string;
  type: "scanlation_group";
  attributes: ScanlationGroupAttributes;
  relationships: Relationship[];
}

interface ScanlationGroupAttributes {
  name: string;
  altNames: ScanlationGroupAlternativeNames;
  website: string | null;
  ircServer: string | null;
  ircChannel: string | null;
  discord: string | null;
  contactEmail: string | null;
  description: string | null;
  twitter: string | null;
  mangaUpdates: string | null;
  focusedLanguages: (string | null)[];
  locked: boolean;
  official: boolean;
  verified: boolean;
  inactive: boolean;
  exLicensed: boolean;
  publishDelay: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface ScanlationGroupAlternativeNames {}

interface Tag {
  id: string;
  type: "tag";
  attributes: TagAttributes;
  relationships: Relationship[];
}

interface TagAttributes {
  name: TagName;
  description: TagDescription;
  group: "content" | "format" | "genre" | "theme";
  version: number;
}

interface TagName {
  en: string;
}

interface TagDescription {}

export type {
  Author,
  Cover,
  Chapter,
  Manga,
  Tag,
  ScanlationGroup,
  Relationship,
};
