import {
  neon,
  NeonDbError,
  NeonQueryFunction,
} from "@neondatabase/serverless";

// Lazily created so importing this module (e.g. transitively, in a test
// that doesn't touch the DB) doesn't require DATABASE_URL to be set.
let sql: NeonQueryFunction<false, false> | undefined;
const getSql = () => (sql ??= neon(process.env.DATABASE_URL!));

// Neon (like the Fly-hosted Strapi this replaced) suspends its compute when
// idle, so a request right after a quiet period can be slow or fail outright
// while it wakes up. Cache the last successful result per query (kept for
// the lifetime of this warm serverless instance) and serve it on a
// transient failure, so visitors see stale-but-real content instead of an
// empty page. Mirrors the cachedGet stale-while-revalidate cache this
// replaces (see git history for app/lib/api.server.ts).
type CacheEntry<T> = { data: T; cachedAt: number };
const cache = new Map<string, CacheEntry<unknown>>();

export const queryDb = async <T extends Record<string, unknown>>(
  key: string,
  text: string,
  params: unknown[] = []
): Promise<T[]> => {
  try {
    const result = (await getSql().query(text, params)) as T[];

    cache.set(key, { data: result, cachedAt: Date.now() });

    return result;
  } catch (error) {
    // A NeonDbError means Postgres itself responded with a definitive
    // answer (bad SQL, permission denied, etc.) — that's a bug, not the
    // transient cold-start/connectivity case this cache exists for, so
    // don't mask it with stale data. Only fall back when the DB never
    // responded at all (network error/timeout).
    const isTransient = !(error instanceof NeonDbError);
    const cached = isTransient
      ? (cache.get(key) as CacheEntry<T[]> | undefined)
      : undefined;

    if (cached) {
      console.warn(
        `DB query "${key}" failed, serving cached response from ${new Date(
          cached.cachedAt
        ).toISOString()}`,
        error
      );

      return cached.data;
    }

    throw error;
  }
};

export const toIso = (value: unknown): string =>
  value instanceof Date ? value.toISOString() : (value as string);
