import { Chapter, Cover, Manga, ScanlationGroup, Tag } from "@/types/mangadex";
import { mangadexAPI } from "./axios";
import {
  ChaptersQuerySchema,
  MangaQuerySchema,
  MangasQuerySchema,
  ScanlationGroupQuerySchema,
} from "@/lib/zod";
import { AxiosError } from "axios";

type MangadexAPIQuerySchema =
  | MangasQuerySchema
  | ScanlationGroupQuerySchema
  | ChaptersQuerySchema
  | MangaQuerySchema;
type MangadexAPIResponse<TResponse extends "entity" | "collection", TData> = {
  result: "ok";
  response: TResponse;
  data: TResponse extends "entity" ? TData : TData[];
} & (TResponse extends "collection"
  ? { limit: number; offset: number; total: number }
  : {});

class MangadexAPI {
  static #objectToQueryParts(obj: Record<string, unknown>, parentKey = "") {
    const queryParts: string[] = [];

    for (const key in obj) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        const arrayQueryParts = this.#arrayToQueryParts(value, newKey);
        queryParts.push(...arrayQueryParts);
      } else if (typeof value === "object" && value !== null) {
        const objectQueryParts = this.#objectToQueryParts(
          value as Record<string, unknown>,
          newKey
        );
        queryParts.push(...objectQueryParts);
      } else {
        const queryString = `${newKey}=${value}`;
        queryParts.push(queryString);
      }
    }

    return queryParts;
  }

  static #arrayToQueryParts(array: unknown[], queryKey: string) {
    const queryParts: string[] = array.map((item) => {
      if (Array.isArray(item)) {
        return this.#arrayToQueryParts(item, queryKey).join("&");
      } else if (typeof item === "object") {
        const objectQueryParts = this.#objectToQueryParts(
          item as Record<string, unknown>
        ).join("&");

        return objectQueryParts;
      } else {
        const stringQueryParts = `${queryKey}[]=${item}`;

        return stringQueryParts;
      }
    });

    return queryParts;
  }

  static #buildQuery(queries: MangadexAPIQuerySchema) {
    const queryParts = this.#objectToQueryParts(queries);

    const queryString = queryParts.join("&");

    return queryString;
  }

  static async getMangas(
    queries: MangasQuerySchema = {}
  ): Promise<MangadexAPIResponse<"collection", Manga>> {
    try {
      const queryString = this.#buildQuery(queries);
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"collection", Manga>
      >(`/manga?${queryString}`);
      const { data: getMangasResponse } = response;

      return getMangasResponse;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(`[GET-MANGAS]:[ERROR]:${error}`);
      throw error;
    }
  }

  static async getManga(
    id: string,
    queries: MangaQuerySchema = {}
  ): Promise<MangadexAPIResponse<"entity", Manga>> {
    try {
      const queryString = this.#buildQuery(queries);
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"entity", Manga>
      >(`/manga/${id}?${queryString}`);
      const { data: getMangaResponse } = response;

      return getMangaResponse;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(`[GET-MANGA]:[ERROR]:${error}`);
      throw error;
    }
  }

  static async getMangaFeed(id: string, queries: ChaptersQuerySchema = {}) {
    try {
      const queryString = this.#buildQuery(queries);
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"collection", Chapter>
      >(`/manga/${id}/feed?${queryString}`);
      const { data: getMangaFeedResponse } = response;

      return getMangaFeedResponse;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(`[GET-MANGA/FEED]:[ERROR]:${error}`);
      throw error;
    }
  }

  static async getScanlationGroups(
    queries: ScanlationGroupQuerySchema = {}
  ): Promise<MangadexAPIResponse<"collection", ScanlationGroup>> {
    try {
      const queryString = this.#buildQuery(queries);
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"collection", ScanlationGroup>
      >(`/group?${queryString}`);
      const { data: getScanlationGroupsResponse } = response;

      return getScanlationGroupsResponse;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(`[GET-SCANLATION_GROUP]:[ERROR]:${error}`);
      throw error;
    }
  }

  static async getScanlationGroup(
    id: string
  ): Promise<MangadexAPIResponse<"entity", ScanlationGroup>> {
    try {
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"entity", ScanlationGroup>
      >(`/group/${id}`);
      const { data } = response;

      return data;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(error);
      throw error;
    }
  }

  static async getCover(id: string) {
    try {
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"entity", Cover>
      >(`/cover/${id}`);
      const { data } = response;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
      // [TODO]: Handle error properly
      console.log(`[GET-COVER]:[ERROR]: ${error}`);
      throw error;
    }
  }

  static async getAtHome(id: string) {
    try {
      const response = await mangadexAPI.get<{
        baseUrl: string;
        chapter: { hash: string; data: string[]; dataSaver: string[] };
      }>(`/at-home/server/${id}`);
      const { data } = response;

      return data;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(`[GET-HOME]:ERROR: ${error}`);
      throw error;
    }
  }

  static async getMangaTags() {
    try {
      const response = await mangadexAPI.get<
        MangadexAPIResponse<"collection", Tag>
      >("/manga/tag");
      const { data } = response;

      return data;
    } catch (error) {
      // [TODO]: Handle error properly
      console.error(`[GET-MANGA/TAG]:ERROR: ${error}`);
      throw error;
    }
  }
}

export default MangadexAPI;
