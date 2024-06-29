import React from "react";

export function getPlaceholderImage(color: React.CSSProperties["color"]) {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='${color}' /></svg>`;
}
export const PLACEHOLDER_IMAGE = getPlaceholderImage("gray");
