import type { CustomElement, Package } from 'custom-elements-manifest';

export function hasCustomElements(
  manifest?: Package | null,
): manifest is Package {
  return (
    !!manifest &&
    Array.isArray(manifest.modules) &&
    manifest.modules.some(
      (x) =>
        x.exports?.some((y) => y.kind === 'custom-element-definition') ||
        x.declarations?.some((z) => (z as CustomElement).customElement),
    )
  );
}

export async function fetchManifest(src: string): Promise<Package | null> {
  try {
    const file = await fetch(src);
    const manifest = (await file.json()) as Package;
    if (hasCustomElements(manifest)) {
      return manifest;
    }
    throw new Error(`No element definitions found at ${src}`);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const removeQuotes = (originalString: string): string =>
  originalString?.trim()?.replaceAll("'", '')?.replaceAll('"', '');
