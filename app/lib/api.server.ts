import axios from "axios";

const BASE_URL = "https://strapi-fly-1ldf.fly.dev/api/";

const API_TOKEN = process.env.STRAPI_API_TOKEN;

export const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Strapi runs on a Fly.io machine that scales to zero when idle, so the
// first request after a quiet period can time out while it wakes up.
// Cache the last successful response per URL (kept for the lifetime of
// this warm serverless instance) and serve it if a request fails, so
// visitors see stale-but-real content instead of an empty page while
// Fly comes back up.
type CacheEntry<T> = { data: T; cachedAt: number };
const cache = new Map<string, CacheEntry<unknown>>();

export const cachedGet = async <T = unknown>(url: string): Promise<T> => {
  try {
    const result = await api.get<T>(url);

    cache.set(url, { data: result.data, cachedAt: Date.now() });

    return result.data;
  } catch (error) {
    // A 4xx means Strapi is up and definitively says "no" (e.g. deleted
    // content) — that's not the cold-start case this cache exists for, so
    // don't mask it with stale data. Only fall back on transient failures:
    // no response at all (network error/timeout) or a 5xx.
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const isTransient = status === undefined || status >= 500;
    const cached = isTransient ? (cache.get(url) as CacheEntry<T> | undefined) : undefined;

    if (cached) {
      console.warn(
        `Strapi request to "${url}" failed, serving cached response from ${new Date(
          cached.cachedAt
        ).toISOString()}`,
        error
      );

      return cached.data;
    }

    throw error;
  }
};
