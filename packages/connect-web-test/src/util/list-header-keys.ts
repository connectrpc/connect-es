/**
 * Return all keys of a Headers object, without needing
 * DOM.iterable for Headers.keys().
 */
export function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys;
}
