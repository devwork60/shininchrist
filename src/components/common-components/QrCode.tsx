"use client";

import { QRCodeSVG } from "qrcode.react";

interface QrCodeProps {
  value: string;
  label: string;
  size?: number;
}

/** Scannable QR code with a gold border. */
const QrCode = ({ value, label, size = 96 }: QrCodeProps) => (
  <div className="rounded-xl border border-primary-gold bg-white-color p-2">
    <QRCodeSVG
      value={value}
      size={size}
      level="M"
      fgColor="#212326"
      bgColor="#ffffff"
      title={label}
    />
  </div>
);

export default QrCode;
