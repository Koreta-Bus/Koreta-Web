export const noop = () => {};

export function isNulOrUndefined(v) {
  return v === null || v === undefined;
}

export function isEmpty(o) {
  if (Number.isNaN(o)) return true;
  if (isNulOrUndefined(o)) return true;
  if (Array.isArray(o)) return !o?.length;
  if (typeof o === "string") return o === "";
  if (typeof o === "object") return !Object.keys(o).length;
  return false;
}

export function isNotEmpty(o) {
  return !isEmpty(o);
}

export const generateQuery = (query) =>
  Object.entries(query).reduce((acc, [k, v]) => (v ? `${acc}${k}=${v}&` : acc), "");
