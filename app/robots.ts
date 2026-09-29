import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout"],
    },
    sitemap: "https://nadamelhor.com.br/sitemap.xml",
  };
}
