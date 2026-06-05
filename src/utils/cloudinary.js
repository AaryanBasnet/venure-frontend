/**
 * Inserts Cloudinary transformations into an existing upload URL.
 * Works only for URLs containing "/image/upload/"; passes everything else through unchanged.
 *
 * @param {string} url    - The original Cloudinary URL (or any URL).
 * @param {string} transforms - Cloudinary transformation string, e.g. "w_800,h_600,c_fill,f_auto,q_auto"
 */
export function cloudinaryTransform(url, transforms = "f_auto,q_auto,w_800,c_limit") {
  if (!url || !url.includes("/image/upload/")) return url;
  return url.replace("/image/upload/", `/image/upload/${transforms}/`);
}

export const CARD_TRANSFORM   = "f_auto,q_auto,w_600,h_400,c_fill";
export const GALLERY_TRANSFORM = "f_auto,q_auto,w_900,h_600,c_fill";
export const THUMB_TRANSFORM   = "f_auto,q_auto,w_80,h_80,c_fill";
