export type ShareLinks = {
  whatsapp: string;
  facebook: string;
  x: string;
};

const DEFAULT_SHARE_URL = "https://saborsinestech.com";

export const createShareLinks = (url: string, text: string): ShareLinks => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
  };
};

export const getCurrentShareUrl = (path?: string) => {
  if (typeof window === "undefined") {
    return path ? `${DEFAULT_SHARE_URL}${path}` : DEFAULT_SHARE_URL;
  }

  return path ? `${window.location.origin}${path}` : window.location.href;
};