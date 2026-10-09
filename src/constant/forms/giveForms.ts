import type { FormConfig } from "./formTypes";

// The In-Kind form follows the client's GiveForm.pdf (new-assets/). The Financial and Property /
// Major Assets forms follow the "Give Explanation Final" guide (no separate document was supplied).

const SUPPORT_AREAS = [
  "Where most needed",
  "ShininChrist Academy",
  "Children & Youth Programs",
  "Community C.A.R.E. Services",
  "Evangelism & Outreach",
  "Media & Digital Ministry",
  "ShininChrist Chapters",
];

const DONOR_TYPES = [
  "Individual",
  "Organization / Business",
  "Church / Ministry",
  "School / Institution",
];

export const GIVE_FINANCIAL_FORM: FormConfig = {
  id: "give-financial-form",
  title: "Give Financially",
  intro:
    "Support the mission through a one-time or monthly gift. After you continue you will be taken to a secure payment page. ShininChrist never collects or stores your card number or security code.",
  submit: "Continue to secure payment",
  successTitle: "Thank you for your generosity!",
  successText:
    "You will be taken to our secure payment page to complete your gift. A confirmation email will follow once your payment is verified.",
  footnote:
    "All gifts are voluntary and appreciated. We do not claim tax deductibility unless legally authorized in your jurisdiction.",
  sections: [
    {
      title: "1. Your Gift",
      fields: [
        {
          id: "frequency",
          label: "Gift Type",
          type: "radios",
          options: ["One-time gift", "Monthly gift"],
          required: true,
          columns: 2,
        },
        {
          id: "amount",
          label: "Amount",
          type: "number",
          required: true,
          placeholder: "Enter amount",
        },
        {
          id: "currency",
          label: "Currency",
          type: "select",
          required: true,
          placeholder: "Select currency",
          options: [
            "NGN – Nigerian Naira",
            "USD – US Dollar",
            "JMD – Jamaican Dollar",
          ],
        },
        {
          id: "designation",
          label: "Where would you like your gift to help?",
          type: "select",
          required: true,
          options: SUPPORT_AREAS,
          span: 6,
        },
      ],
    },
    {
      title: "2. Your Details",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        {
          id: "email",
          label: "Email (for your confirmation)",
          type: "email",
          required: true,
        },
        { id: "phone", label: "Phone / WhatsApp (optional)", type: "tel" },
        { id: "country", label: "Country", type: "text", required: true },
        { id: "note", label: "Message or note (optional)", type: "textarea" },
        {
          id: "anonymous",
          type: "declaration",
          required: false,
          label: "I prefer not to be publicly acknowledged for my gift.",
        },
      ],
    },
  ],
};

export const GIVE_IN_KIND_FORM: FormConfig = {
  id: "give-in-kind-form",
  title: "Give In-Kind — Donation Form",
  intro:
    "Support ShininChrist by offering goods, materials, equipment, or useful services for spiritual growth, education, community development, and compassionate service. Please do not send any items until ShininChrist has accepted your offer.",
  submit: "Submit Donation Offer",
  successTitle: "Thank you for your donation offer!",
  successText:
    "The ShininChrist team will review your offer and contact you with next steps. Please do not ship or deliver items until your offer has been accepted.",
  footnote:
    "Submission does not guarantee acceptance. ShininChrist may decline items that are unsafe, unsuitable, damaged, or outside current operational needs.",
  sections: [
    {
      title: "1. Donor Information",
      fields: [
        {
          id: "donorType",
          label: "Donor Type",
          type: "radios",
          options: DONOR_TYPES,
          required: true,
          columns: 2,
        },
        {
          id: "fullName",
          label: "Full Name / Contact Person",
          type: "text",
          required: true,
        },
        {
          id: "organization",
          label: "Organization Name (if applicable)",
          type: "text",
        },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp Number",
          type: "tel",
          required: true,
        },
        {
          id: "location",
          label: "City, State & Country",
          type: "text",
          required: true,
          span: 6,
        },
      ],
    },
    {
      title: "2. Type of Donation",
      intro: "Select all categories that describe your donation.",
      fields: [
        {
          id: "categories",
          label: "Donation categories",
          type: "checks",
          columns: 2,
          options: [
            "Bibles & Christian Literature",
            "Educational Books & Study Materials",
            "School Supplies & Stationery",
            "Computers, Tablets & Accessories",
            "Phones & Electronic Devices",
            "Printers, Scanners & Office Equipment",
            "Furniture & Storage Equipment",
            "Food & Non-Perishable Groceries",
            "Clothing, Shoes & Personal Care Items",
            "Children’s Educational Materials & Toys",
            "Audio, Video & Media Equipment",
            "Musical Instruments",
            "Tents & Event Equipment",
            "Power Banks, Chargers & Electrical Supplies",
            "Professional or Business Services",
            "Other",
          ],
        },
        {
          id: "otherType",
          label: "Other Donation Type",
          type: "text",
          span: 6,
        },
        {
          id: "description",
          label: "Describe the items or resources you wish to donate",
          type: "textarea",
          required: true,
        },
        { id: "quantity", label: "Quantity", type: "text", required: true },
        {
          id: "condition",
          label: "Condition of Items",
          type: "radios",
          required: true,
          columns: 2,
          options: [
            "New",
            "Gently Used",
            "Refurbished / Fully Functional",
            "Not Applicable (Services)",
          ],
        },
      ],
    },
    {
      title: "3. Donation Delivery Arrangements",
      fields: [
        {
          id: "delivery",
          label: "Preferred delivery method",
          type: "radios",
          columns: 2,
          options: [
            "Arrange drop-off",
            "Request collection, if available",
            "Ship / Courier",
            "Digital delivery / Remote services",
            "Contact me to discuss arrangements",
          ],
        },
        {
          id: "donationDate",
          label: "Preferred Donation Date (optional)",
          type: "date",
          span: 3,
        },
      ],
    },
    {
      title: "4. Preferred Area of Support",
      fields: [
        {
          id: "supportArea",
          label: "Where would you like your donation to help?",
          type: "radios",
          options: SUPPORT_AREAS,
          columns: 2,
        },
        {
          id: "instructions",
          label: "Additional Information or Special Instructions",
          type: "textarea",
        },
        {
          id: "anonymous",
          type: "declaration",
          required: false,
          label: "I prefer not to be publicly acknowledged for my donation.",
        },
      ],
    },
    {
      title: "5. Donor Declaration",
      fields: [
        {
          id: "declaration",
          type: "declaration",
          label:
            "I confirm that the items or services described are offered voluntarily and that I have the right to donate them. I understand that ShininChrist will review the offer before accepting it, and delivery or collection arrangements must be confirmed in advance. I consent to being contacted regarding this donation.",
        },
        {
          id: "signature",
          label: "Donor Signature (typed name)",
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};

export const GIVE_PROPERTY_FORM: FormConfig = {
  id: "give-property-form",
  title: "Give Property & Major Assets — Inquiry",
  intro:
    "Larger gifts such as land, buildings, vehicles, bulk technology and major equipment are handled through an inquiry and review process, not a checkout. Tell us about the asset so ShininChrist can discuss next steps.",
  submit: "Submit Major Gift Inquiry",
  successTitle: "Thank you for your inquiry!",
  successText:
    "Your inquiry has been received. Submitting it does not mean the asset has been accepted. ShininChrist will review ownership, legal, condition, cost and suitability, and then contact you.",
  footnote:
    "All major asset gifts are subject to review and acceptance by ShininChrist. Please do not transfer or send any asset before you receive written confirmation.",
  sections: [
    {
      title: "1. Donor Information",
      fields: [
        {
          id: "donorType",
          label: "Donor Type",
          type: "radios",
          options: DONOR_TYPES,
          required: true,
          columns: 2,
        },
        {
          id: "fullName",
          label: "Full Name / Contact Person",
          type: "text",
          required: true,
        },
        {
          id: "organization",
          label: "Organization Name (if applicable)",
          type: "text",
        },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp Number",
          type: "tel",
          required: true,
        },
        {
          id: "location",
          label: "City, State & Country",
          type: "text",
          required: true,
          span: 6,
        },
      ],
    },
    {
      title: "2. About the Asset",
      fields: [
        {
          id: "assetTypes",
          label: "Type of asset",
          type: "checks",
          columns: 2,
          options: [
            "Land",
            "Buildings / Property",
            "Vehicles",
            "Computers and technology (in bulk)",
            "Major equipment",
            "Other significant assets",
          ],
        },
        {
          id: "description",
          label: "Describe the asset",
          type: "textarea",
          required: true,
        },
        {
          id: "assetLocation",
          label: "Where is the asset located?",
          type: "text",
          required: true,
          span: 6,
        },
        {
          id: "ownership",
          label: "Current owner and legal ownership status",
          type: "textarea",
          required: true,
        },
        {
          id: "condition",
          label: "Condition and any known issues",
          type: "textarea",
        },
        {
          id: "documents",
          label: "Photos or supporting documents (optional)",
          type: "file",
        },
      ],
    },
    {
      title: "3. Declaration",
      fields: [
        {
          id: "declaration",
          type: "declaration",
          label:
            "I confirm that this inquiry is made voluntarily and that I have the right to offer this asset. I understand that submitting it does not mean the asset has been accepted, and that ShininChrist may decline it. I consent to being contacted about this inquiry.",
        },
        {
          id: "signature",
          label: "Signature (typed name)",
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};
