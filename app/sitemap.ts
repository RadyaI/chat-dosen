import { MetadataRoute } from "next";
import { getAllTemplates } from "@/lib/templates";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://chatdosen.radya.my.id"; 

  const templates = await getAllTemplates();

  const templateUrls = templates.map((t) => ({
    url: `${baseUrl}/${t.slug}`,
    lastModified: new Date(t.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...templateUrls,
  ];
}