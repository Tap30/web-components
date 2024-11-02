/**
 * Returns value wrapped to the inclusive range of `min` and `max`.
 */
export const wrap = (number: number, min: number, max: number): number =>
  min + ((((number - min) % (max - min)) + (max - min)) % (max - min));

/**
 * Returns value clamped to the inclusive range of `min` and `max`.
 */
export const clamp = (number: number, min: number, max: number): number =>
  Math.max(Math.min(number, max), min);

/**
 * Linear interpolate on the scale given by `a` to `b`, using `t` as the point on that scale.
 */
export const lerp = (a: number, b: number, t: number) => a + t * (b - a);

/**
 * Inverse Linar Interpolation, get the fraction between `a` and `b` on which `v` resides.
 */
export const inLerp = (a: number, b: number, v: number) => (v - a) / (b - a);

/**
 * Remap values from one linear scale to another.
 *
 * `oMin` and `oMax` are the scale on which the original value resides,
 * `rMin` and `rMax` are the scale to which it should be mapped.
 */
export const remap = (
  v: number,
  oMin: number,
  oMax: number,
  rMin: number,
  rMax: number,
) => lerp(rMin, rMax, inLerp(oMin, oMax, v));
