import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "SaborSinestech";
const DEFAULT_BASE_URL = "https://saborsinestech.com";

export type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
};

const Seo = ({
  title,
  description,
  path,
  image = "/og-image.jpg",
  type = "website",
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = DEFAULT_BASE_URL.replace(/\/$/, "");

    const canonicalPath =
      path ?? `${location.pathname}${location.search}`;

    const canonicalUrl = `${baseUrl}${
      canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`
    }`;

    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    const imageUrl = image.startsWith("http")
      ? image
      : `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`;

    document.title = fullTitle;

    // SEO básico
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow",
    });

    upsertCanonical(canonicalUrl);

    // Open Graph
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    // UI color
    upsertMeta('meta[name="theme-color"]', {
      name: "theme-color",
      content: "#2e1a0e",
    });
  }, [description, image, location.pathname, location.search, path, title, type]);

  return null;
};

export default Seo;