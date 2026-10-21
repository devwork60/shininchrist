"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrCodeProps {
  value: string;
  label: string;
  size?: number;
}

/** Scannable QR code with a gold border that resolves absolute URLs for mobile devices. */
const QrCode = ({ value, label, size = 96 }: QrCodeProps) => {
  const [resolvedUrl, setResolvedUrl] = useState(value);

  useEffect(() => {
    if (value.startsWith("/")) {
      const origin =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      setResolvedUrl(`${origin}${value}`);
    } else if (value.includes("shininchrist.org")) {
      try {
        const parsed = new URL(value);
        const origin =
          process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
        setResolvedUrl(`${origin}${parsed.pathname}${parsed.search}`);
      } catch {
        // keep current value
      }
    }
  }, [value]);

  return (
    <div className="rounded-xl border border-primary-gold bg-white-color p-2">
      <QRCodeSVG
        value={resolvedUrl}
        size={size}
        level="M"
        fgColor="#212326"
        bgColor="#ffffff"
        title={label}
      />
    </div>
  );
};

export default QrCode;
