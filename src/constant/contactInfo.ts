/**
 * Official ShininChrist contact details, supplied by the client. The footer, Contact page, Give page and Join steps
 * all read from here, so a number or address is changed in ONE place.
 */
export const CONTACT = {
  email: "hello@shininchrist.com",
  whatsappLabel: "Official WhatsApp Inquiry Line — Nigeria",
  whatsappNumber: "+234 902 861 5032",
  /** Opens a WhatsApp chat with the official line. */
  whatsappUrl: "https://wa.me/2349028615032",
  internationalLabel: "International Ministry Inquiries",
  internationalNote: "Number to be announced soon.",
  /** Evangelist Mercy's own ministry website (music, media, invitations). Opens in a new tab. */
  mercyAmenUrl: "https://mercyamen.com",
  instagramUrl: "https://www.instagram.com/shininchrist/",
  tiktokUrl: "https://www.tiktok.com/@shininchrist",
};

export const emailHref = (address: string) => `mailto:${address}`;

/** wa.me link for any number typed in the admin (digits only, country code first). */
export const whatsappHref = (number: string) => {
  const digits = number.replace(/\D/g, "");
  // A real international number has at least 8 digits; anything shorter (a placeholder) falls back to the official line.
  return digits.length >= 8 ? `https://wa.me/${digits}` : CONTACT.whatsappUrl;
};
