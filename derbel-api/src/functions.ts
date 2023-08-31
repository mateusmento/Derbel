export function patchObject(
  dest: Record<string, any>,
  source: Record<string, any>
) {
  for (const key in source) dest[key] = source[key];
  return dest;
}
