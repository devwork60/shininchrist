"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import SocialIcons from "@/components/icons/SocialIcons";
import UiIcons from "@/components/icons/UiIcons";

interface ShareDailyProps {
  /** The Daily being viewed, e.g. "ShininChrist Daily: Today’s Faith Formation – Psalm 46:10 (NIV)". */
  title: string;
  /** Text on the button that opens the options. */
  label: string;
  /** Look of the button that opens the options (supplied by the page, so it matches its surroundings). */
  className: string;
}

const ITEM =
  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-text-dark transition-colors hover:bg-primary-green/5 focus-visible:bg-primary-green/5";

/** The address of the Daily page being viewed (no #section or tracking parts), so every Daily shares its own link. */
const currentUrl = () => `${window.location.origin}${window.location.pathname}`;

const encode = encodeURIComponent;

/** Copies text. Uses the browser's clipboard, then an older method for browsers that do not allow the first. */
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const box = document.createElement("textarea");
      box.value = text;
      box.setAttribute("readonly", "");
      box.style.position = "fixed";
      box.style.opacity = "0";
      document.body.appendChild(box);
      box.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(box);
      return ok;
    } catch {
      return false;
    }
  }
};

/**
 * "Share This Daily": WhatsApp, Email and Facebook open their real share links with this Daily's title and address.
 * Instagram and TikTok do not let a website post for someone, so those buttons copy the link and say what to do next.
 * "Copy link" copies the address and confirms it. Works for any Daily page because it reads the page it is on.
 */
const ShareDaily = ({ title, label, className }: ShareDailyProps) => {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<{ text: string; manual?: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The address and the share links only exist once the person has opened the options (never on the server).
  const url = open ? currentUrl() : "";
  const message = `${title}\n${url}`;
  const canNativeShare = open && typeof navigator !== "undefined" && "share" in navigator;

  const show = (next: { text: string; manual?: string }) => {
    setNotice(next);
    if (timer.current) clearTimeout(timer.current);
    if (!next.manual) timer.current = setTimeout(() => setNotice(null), 8000);
  };

  const copy = async (text: string) => {
    const ok = await copyText(url);
    show(
      ok
        ? { text }
        : { text: "Your browser did not allow copying. Select the link below and copy it.", manual: url },
    );
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: title, url });
    } catch {
      // The person closed the share sheet: nothing to do.
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          setNotice(null);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className={className}
      >
        <UiIcons name="share" />
        {label}
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label="Share this Daily"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          className="mt-2 rounded-xl border border-primary-green/15 bg-white-color p-2 shadow-sm"
        >
          <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
            <li>
              <a
                href={`https://wa.me/?text=${encode(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={ITEM}
              >
                <SocialIcons name="whatsapp" className="h-6 w-6 shrink-0 [&>svg]:h-full [&>svg]:w-full" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:?subject=${encode(title)}&body=${encode(`${title}\n\n${url}`)}`}
                className={ITEM}
              >
                <UiIcons name="mail" className="flex h-6 w-6 shrink-0 items-center justify-center text-primary-green [&>svg]:h-5 [&>svg]:w-5" />
                Email
              </a>
            </li>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={ITEM}
              >
                <SocialIcons name="facebook" className="h-6 w-6 shrink-0 [&>svg]:h-full [&>svg]:w-full" />
                Facebook
              </a>
            </li>
            <li>
              {/* Instagram has no web address that posts a link for someone (unlike Facebook). So one tap copies the link
                  and opens Instagram in a new tab, where it can be pasted into a message or a story. */}
              <a
                href="https://www.instagram.com/direct/new/"
                target="_blank"
                rel="noopener noreferrer"
                className={ITEM}
                onClick={() => {
                  void copy(
                    "Link copied and Instagram opened in a new tab. Paste the link into a message to a friend or into a story (link sticker).",
                  );
                }}
              >
                <SocialIcons name="instagram" className="h-6 w-6 shrink-0 [&>svg]:h-full [&>svg]:w-full" />
                <span>
                  Instagram
                  <span className="block text-xs font-normal text-text-grey">Copies the link and opens Instagram</span>
                </span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className={ITEM}
                onClick={() =>
                  copy(
                    "Link copied. TikTok does not let websites post for you: open TikTok and paste the link into your video description, a message or your bio.",
                  )
                }
              >
                <SocialIcons name="tiktok" className="h-6 w-6 shrink-0 [&>svg]:h-full [&>svg]:w-full" />
                <span>
                  TikTok
                  <span className="block text-xs font-normal text-text-grey">Copies the link to paste</span>
                </span>
              </button>
            </li>
            <li>
              <button type="button" className={ITEM} onClick={() => copy("Link copied. You can now paste it anywhere.")}>
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-green text-white-color"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.43" />
                    <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.33-1.33" />
                  </svg>
                </span>
                Copy Daily Link
              </button>
            </li>
            {canNativeShare && (
              <li>
                <button type="button" className={ITEM} onClick={nativeShare}>
                  <UiIcons name="share" className="flex h-6 w-6 shrink-0 items-center justify-center text-primary-green [&>svg]:h-5 [&>svg]:w-5" />
                  <span>
                    More apps
                    <span className="block text-xs font-normal text-text-grey">Use your phone’s share menu</span>
                  </span>
                </button>
              </li>
            )}
          </ul>

          <div aria-live="polite" role="status" className={clsx(notice && "mt-2")}>
            {notice && (
              <div className="rounded-lg bg-primary-green/10 px-3 py-2 text-sm text-primary-green">
                <p className="font-semibold">{notice.text}</p>
                {notice.manual && (
                  <input
                    readOnly
                    value={notice.manual}
                    onFocus={(event) => event.currentTarget.select()}
                    aria-label="Link to copy"
                    className="mt-2 w-full rounded-md border border-primary-green/25 bg-white-color px-2 py-1.5 text-xs text-text-dark"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareDaily;
