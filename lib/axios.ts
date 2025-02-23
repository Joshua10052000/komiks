import axios from "axios";

const mangadexAPI = axios.create({ baseURL: "https://api.mangadex.org" });

export { mangadexAPI };
