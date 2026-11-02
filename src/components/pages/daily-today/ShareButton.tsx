"use client";

import { useState } from "react";
import UiIcons from "@/components/icons/UiIcons";

/** "Share This Daily": opens the phone's share sheet when there is one, otherwise copies the page address. */
const ShareButton = ({ label, className }: { label: string; className: string }) => {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // The person closed the share sheet, or the browser blocked copying: nothing to do.
    }
  };

  return (
    <button type="button" onClick={share} className={className}>
      <UiIcons name="share" />
      {copied ? "Link copied" : label}
    </button>
  );
};

export default ShareButton;
