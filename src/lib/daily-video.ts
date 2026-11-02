/**
 * Video links for the Daily pages. Only YouTube is played on our page (through YouTube's privacy-friendly address);
 * every other address is shown as a plain "Watch" link, so nothing from an unknown site is ever embedded.
 */

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export const youtubeId = (value: string): string | null => {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0] ?? null;
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") id = url.searchParams.get("v");
    else {
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
      id = match ? match[1] : null;
    }
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
};

/** Address for an embedded player, or null when the link is not a single YouTube video. */
export const youtubeEmbedUrl = (value: string) => {
  const id = youtubeId(value);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
};
