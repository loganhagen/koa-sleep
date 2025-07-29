import { create } from "flat-cache";
import path from "path";

const CACHE_DIR = path.resolve(__dirname, "../../.cache");
const CACHE_TTL = 24 * 60 * 60 * 1000;

const loadCache = (id: string) => {
  return create({
    cacheId: id,
    cacheDir: CACHE_DIR,
    ttl: CACHE_TTL,
  });
};

export const cacheService = {
  get: (id: string, key: string): string => {
    const cache = loadCache(id);
    return cache.getKey(key);
  },

  set: (id: string, key: string, data: any) => {
    const cache = loadCache(id);
    cache.setKey(key, data);
    cache.save(true);
  },
};
