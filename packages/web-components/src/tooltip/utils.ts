import type { Coords, Placement } from "@floating-ui/dom";
import { isSSR } from "../utils";

/**
 * Returns a translate CSS value that is rounded by DPR.
 */
export const translate = (coordinates: Coords) => {
  const { x, y } = coordinates;

  const dpr = isSSR() ? window.devicePixelRatio : 1;

  // Rounding coordinates by DPR
  const _x = Number.isNaN(x) ? 0 : Math.round(Math.round(x * dpr) / dpr);
  const _y = Number.isNaN(y) ? 0 : Math.round(Math.round(y * dpr) / dpr);

  return `translate(${_x}px, ${_y}px)`;
};

/**
 * Rotates arrow based on the placement of the tooltip.
 */
export const rotateArrow = (placement: Placement) => {
  if (placement.includes("top")) return "rotate(-90deg)";
  if (placement.includes("bottom")) return "rotate(90deg)";
  if (placement.includes("left")) return "rotate(180deg)";

  return "rotate(0)";
};
