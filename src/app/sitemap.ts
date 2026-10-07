import type { MetadataRoute } from "next";
import { absoluteUrl, PUBLIC_SITEMAP_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SITEMAP_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/get-started" || path === "/services" ? 0.9 : 0.7,
  }));
}
