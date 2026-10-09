/** Tiny fetch helpers for the Join wizard. Errors carry the server's readable message. */

const readError = async (res: Response) => {
  try {
    const data = await res.json();
    return data.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
};

export const postJson = async <T = unknown>(
  url: string,
  body: unknown,
): Promise<T> => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
};

export const postForm = async <T = unknown>(
  url: string,
  body: FormData,
): Promise<T> => {
  const res = await fetch(url, { method: "POST", body });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
};

export const getJson = async <T = unknown>(url: string): Promise<T> => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
};

/** Plain object from a form, for JSON posts. */
export const formToObject = (data: FormData) => {
  const out: Record<string, FormDataEntryValue> = {};
  data.forEach((value, key) => {
    if (typeof value === "string") out[key] = value;
  });
  return out;
};
