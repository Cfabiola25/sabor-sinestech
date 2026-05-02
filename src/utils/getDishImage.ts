import placeholder from "../assets/images/placeholder.webp";

const dishImages = import.meta.glob("../assets/images/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const getDishImage = (image?: string) => {
  if (!image) return placeholder;

  const cleanImage = image.trim().split("/").pop();

  if (!cleanImage) return placeholder;

  const foundImage = Object.entries(dishImages).find(([path]) =>
    path.endsWith(`/${cleanImage}`)
  );

  return foundImage?.[1] ?? placeholder;
};