# Milestone 1 — Project Summary

**Project:** ShininChrist Platform Build (Next.js, Vercel, Paystack)
**Client:** Georgia "Mercy" Nnabuihe (Evangelist Mercy), ShininChrist
**Contract:** Upwork fixed-price, $500 total in three milestones. Milestone 1 = **$200**.
**Due date:** Client set it to **Fri 16 Oct 2026** (Imran first proposed 14 Oct) after her Upwork delay. Contract accepted 5 Oct 2026.
**Prepared from:** every file in the project folder (see Section 7 for how each one was used). No code has been written.

> **How to read this file.** Items marked **[CLIENT]** are stated by the client or in a client-approved document. Items marked **[REC]** are my recommendations. **Not specified / Needs confirmation** means the documents do not say.

---

## 0. Source Hierarchy (which document wins)

The folder contains documents written at different times that partly contradict each other. This is the order I used:

| Rank | Source | Why |
| ---- | ------ | --- |
| 1 | **Milestone 1 contract list** — Imran's message of 25 Sep 2026 (and the edited Upwork re-send), plus the milestone attachments referenced in chat | This is what the client agreed to pay for. **Note:** `Milestones.pdf` and `Website_Development_Milestones_Blueprint (2).pdf` are *not* in the folder. Only the chat copy was available. |
| 2 | **`ShininChristProjectImran.docx`** (Scope Clarifications, Sep 2026) — Section 5 "Milestone 1 Acceptance Criteria" | Client's own acceptance test for M1. It says it does not replace the blueprint. |
| 3 | **Final per-page freelancer guides** (Chapters, Academy Final, Daily Final, Library Explanation, Serve Explanation, Give Explanation Final, Footer, Join, FAQ, Home/Vision/Faith/Founder text, For Influencer 1 & 2) | Define page content and behaviour. They are *later* than the blueprint and go beyond the contract, so some conflict with rank 1 (Section 14). |
| 4 | **Revised Platform Blueprint (Aug 2026)** | Overall architecture and rules. Partly superseded by later documents. |
| 5 | Early page text PDFs (`Academy Text`, `Daily page-Text`, `Library Page`, `Serve Text`, `Give Text`) and early mockups | Superseded by the "Final" versions. Kept only as history. |

---

## 1. Milestone Overview

**What Milestone 1 is.** The public ministry website plus the core membership and payment engine. It is the foundation the later milestones (Academy, Events, Benefits) sit on.

**What the client expects.**
- A responsive public site with the **seven main menus** (Home, Chapters, Academy, Daily, Library, Serve, Give), their dropdown pages and the footer, built from the supplied mockups and text.
- An About section including **"Invite Mercy to Speak"** with editable photo and text.
- Google sign-in with secure sessions, "log out of all devices" and admin session control.
- A multi-step **Join / member onboarding** flow that ends in an **ACTIVE member** with a unique **Member ID**.
- **Uniform request + Paystack payment**. Paying the uniform is a hard gate for member access.
- A **Give page** with one-time Paystack donations.
- A **Library** with free downloads and "give what you can" (including $0) contributions.
- An **Admin panel** for members, roles, uniform orders, payments and site content.
- SEO basics, analytics, security baseline and full mobile responsiveness.

**Main goal.** A test user can go from public visitor → Google sign-in → complete onboarding → pay for the uniform → be activated by Admin → see a Member Dashboard with a Member ID. Public visitors can browse and donate. Admin can manage all of it.

**Acceptance rule [CLIENT]:** a milestone is approved when the functions *work end-to-end in a reviewable (preview) environment*. Layouts or placeholders alone are not enough. Minor cosmetic issues can be logged for later.

---

## 2. Client Requirements

### 2.1 Must Have — explicitly in the M1 contract or M1 acceptance criteria

| # | Requirement | Source | Priority | Expected behaviour |
| - | ----------- | ------ | -------- | ------------------ |
| R1 | Public website with seven main menus + dropdown pages + footer, responsive | Contract M1; Clarif. §5 | Must | Pages built from supplied mockups and text. Navigation works on desktop, tablet, mobile. |
| R2 | About section incl. **Invite Mercy to Speak**, with editable photo and text | Contract M1; chat 14 Sep, 23 Sep | Must | Page + form from the mockup. Admin can edit the photo and text. |
| R3 | Google/Gmail sign-in, secure sessions, **log out of all devices**, **admin session control** | Contract M1; Blueprint §6 | Must | Google sign-in only identifies the user. Admin can revoke sessions. |
| R4 | Member onboarding: registration form, YouTube subscription proof (**screenshot upload + admin approval**), fallback contact link | Contract M1; Clarif. §2 | Must | Applicant submits proof. Admin approves manually in the admin panel. |
| R5 | Minor handling: DOB triggers under-18 flow and parental/guardian consent record | Clarif. §2, §5; Join guide step 3 | Must | Under-18 applicants stay Pending until consent is verified. |
| R6 | Automatic **Member ID** with country prefix (e.g. `SC-NG-0000128`) | Contract M1; Blueprint §5 | Must | Unique ID generated and shown "according to the agreed membership stage". |
| R7 | **Member Dashboard** showing sections relevant to the member's role | Contract M1; Blueprint §16 | Must | Header: name, Member ID, country, chapter, status. Only relevant modules shown. |
| R8 | **Chapter selection** (Men's / Women's / Youth), stored and visible to Admin | Contract M1; Clarif. §5 | Must | Selection saved on the member record. |
| R9 | **Uniform request form** (country, size, quantity, delivery type, address) + **Paystack payment in Naira**, **order status tracking**, **email receipts** | Contract M1 | Must | Order created → Paystack → webhook confirms → status + receipt email. |
| R10 | **Membership status gate:** account ≠ active member. Protected access only after uniform payment is confirmed | Clarif. §2; Join guide §8 | Must | Statuses such as Pending / Awaiting Uniform Payment / Active / Suspended. |
| R11 | **Give page** — one-time donations via Paystack | Contract M1 | Must | Donation recorded, receipt emailed. |
| R12 | **Library** — free downloads and optional "give what you can" contributions including **zero** | Contract M1; Blueprint §13 | Must | Admin marks a resource free or contribution-based. Zero still unlocks a free resource. |
| R13 | **Admin panel** for members, roles, uniform orders, payments, site content | Contract M1; Clarif. §5 | Must | Role-protected, server-enforced. |
| R14 | SEO basics, analytics, performance, security, full mobile responsiveness | Contract M1; Clarif. §3 | Must | Metadata, sitemap/robots, env-var secrets, standard web security. |
| R15 | **Role-based permissions enforced server-side** (Visitor, Pending, Active Member, Learner, Teacher, Admin, Super Admin; combined roles allowed) | Clarif. §2, §3 | Must | Protected data not reachable by knowing a URL. |
| R16 | **Country-aware** records (Nigeria, Jamaica, US); not hard-coded to Nigeria | Clarif. §2; Blueprint §1 | Must | Country stored on member; ID prefix, sizing, delivery rules configurable. |
| R17 | **Private storage** for ID documents, consent files, proof uploads | Clarif. §3 | Must | Never public URLs. |
| R18 | **Payment layer separated from business logic**; webhook verification, idempotent handling, sandbox testing | Clarif. §3; Blueprint §18 | Must | Paystack behind a service layer. Signature-verified webhooks. |
| R19 | Preview vs production environments | Clarif. §3; chat 24 Sep | Must | Private preview link for each milestone review. |
| R20 | Transactional email on a ShininChrist-controlled account; document any recurring cost | Clarif. §3 | Must | Receipts and notifications. Any paid service must be approved first. |
| R21 | Live Paystack keys entered **by the client privately** | Chat 20 Aug; contract text | Must | Keys in env vars. Never shared in chat or code. |
| R22 | Exact supplied **logo** only; "ShininChrist" never in all caps | All guides | Must | Use the supplied logo file. No redrawing. |

### 2.2 Should Have — strongly implied and needed for M1 to work

| # | Requirement | Reason |
| - | ----------- | ------ |
| S1 | Join flow as a **multi-step wizard with progress indicator** and saved progress | Join guide §1, §11, §13 |
| S2 | **Registration status machine** (Started → Form Completed → Subscription Pending/Verified → Consent Pending/Verified → Uniform Payment Pending → Payment Confirmed → Approved → Active) | Join guide §5 |
| S3 | "Registration Pending / Complete Your Registration" screen for signed-in but non-active users | Join guide §5 |
| S4 | **Locked-access page** (Join + Member Login) when non-members open Library, Daily This Week, Daily Archive | Library and Daily guides |
| S5 | Admin screens to verify proof, record consent, confirm payment, activate and issue Member ID | Clarif. §2 ("workable manual Admin process") |
| S6 | Admin notification (email) when onboarding milestones complete | Blueprint §5 |
| S7 | Uniform pricing, delivery cost and total displayed clearly before payment; configurable per country | Join guide step 8; Blueprint §11 |
| S8 | Home dropdown: Home / Vision & Mission (scroll) / Statement of Faith (scroll) / About the Founder (page) | Vision, Faith and Founder guides |
| S9 | Admin-editable content (CMS) for pages built in M1; global header/footer/contact/social links editable | For Influencer 2 (marks it "non-negotiable"); contract says "site content" |
| S10 | Rate limiting on auth, downloads, forms; server-side input validation | Blueprint §22 |
| S11 | Basic audit log of admin actions | Blueprint §17. **Contract places audit log in M3.** Cheap to start with role/payment/session changes. |
| S12 | `noindex` for protected pages; Google Search Console verification file at site root | Blueprint §22; file `google6ca85172db0b5c70 (1).html` |

---

## 3. Pages / Screens

"Design Available" = a mockup image exists. "Text" = a written guide exists.

| # | Page / Screen | Purpose | Required in M1 | Design Available | Notes |
| - | ------------- | ------- | -------------- | ---------------- | ----- |
| 1 | **Home** | Intro, hero, Vision & Mission, Framework, Statement of Faith, short Founder, 4 pathway cards | Yes | Yes (`690540CF`, `31A6F4A1`, `7B3C4120`) + text docx | No Evangelist Mercy photo on Home. Vision & Mission and Statement of Faith are **sections** on Home, not pages. |
| 2 | About the Founder | Full founder bio page | Yes | Yes (`35AAB0BA`) + text | Uses original photo, unedited. Do not title her "Apostle". |
| 3 | **Invite Mercy to Speak** | Speaking-invitation form + info | Yes | Yes (`B4C73C8A`) | In About dropdown + footer, **not** main nav. Photo and text editable. Form handling Not specified. |
| 4 | Chapters (main) | Overview, 5 member-experience tiles, final CTA | Yes | Yes (`Chapters mockup`, `98BF40CF`) + 2 PDFs | |
| 5 | Men's Chapter | Men-specific focus areas | Yes (dropdown) | Preview only in `98BF40CF` | Links to Daily "I Am Adam". |
| 6 | Women's Chapter | Women-specific focus areas | Yes (dropdown) | Preview only | Links to "I Am Eve". |
| 7 | Youth Chapter | Youth-specific focus areas | Yes (dropdown) | Preview only | Links to "I Am Called". Children stay under Youth. |
| 8 | Academy (main) | Gateway, six Fields of Learning | Yes | Yes (`Academy mock up`, `8804E316`) + PDFs | Pages only; Academy functions are M2. |
| 9 | Academy → Courses | Course discovery (search/filter) | Yes (page) | Preview only | Must not imply courses exist yet. |
| 10 | Academy → Assessments | WAEC, NECO, UTME/JAMB, GCE, CXC/CSEC, CAPE | Yes (page) | Preview only | |
| 11 | Academy → Teachers | Instructor intro, future profiles | Yes (page) | Preview only | |
| 12 | Academy → Learner Support | Support hub | Yes (page) | Preview only | |
| 13 | Daily → Today | Public six-step Faith Formation | Yes | Yes (`958C14A0`) | Content model and publishing: Needs confirmation (Section 13). |
| 14 | Daily → This Week | Member-only recent entries | Yes | Yes | ACTIVE members only. |
| 15 | Daily → Archive | Member-only history + search | Yes | Yes | ACTIVE members only. |
| 16 | Library (locked state) | Non-member gate | Yes | Yes (`FBD3AA75`) | Join + Member Login buttons. |
| 17 | Library (member home) | Search, filters, featured, collections | Yes | Yes (`FBD3AA75`) | Conflicts with contract wording (Section 14). |
| 18 | Library resource / download | Free or give-what-you-can download | Yes | No dedicated design | Needs UI design decision. |
| 19 | Store | Public shop (products, cart, checkout) | **Unclear** | Yes (`FBD3AA75`, panel only) | **Not in the M1 contract list.** See Section 14. |
| 20 | Serve (main) | Ways to serve | Yes | Yes (`8C3DC8BB`) + 2 PDFs | |
| 21 | Serve → Volunteer / Partner / Donate In-Kind / Field & Missions | Dropdown pages | Page structure yes; **applications are M3** | No designs for sub-pages | Contract moves Serve volunteer applications to M3. |
| 22 | Give (main) | Three giving paths, impact, process | Yes | Yes (`98BAE633`, `8A62F887`, early `08276B8E`) | |
| 23 | Give Financially | One-time donation flow via Paystack | Yes | No form design | Recurring = M3. |
| 24 | Give In-Kind / Give Property & Major Assets | Inquiry forms | **Unclear** | No form designs | Described in Give guide; not in M1 contract list. |
| 25 | **Join ShininChrist** (wizard) | 10-step onboarding | Yes | Yes (`B2F3D551`) infographic | Infographic is a process diagram, not screen designs. |
| 26 | Login / My Account | Sign in; account states | Yes (needed for R3) | Header only (Login button visible in later mockups) | |
| 27 | Member Dashboard | Role-based home for members | Yes | **No design** | Spec is a text list only (Blueprint §16). |
| 28 | Uniform order / checkout + status | Order, pay, track | Yes | **No design** | |
| 29 | Registration Pending screen | Shown to non-active users | Yes (implied) | No | |
| 30 | Admin panel (members, roles, orders, payments, content) | Operations | Yes | **No design** | |
| 31 | Contact Us | Public inquiry form | **Unclear** | No | Required by footer docs; not in contract M1 list. |
| 32 | FAQ | Editable accordion | **Unclear** | No (text complete) | |
| 33 | Technical Support / Report an Issue | Support forms | **Unclear** | No | |
| 34 | Legal pages (Privacy, Terms, Refund, Cookie, Accessibility, Site Map) | Footer-linked | **Unclear** | No | Client supplies wording. |
| 35 | Site-wide Search | Permission-aware search | **Unclear** | Search icon only | |
| 36 | Global footer | Site-wide component | Yes | Yes (`2CAE4429`) | Contains placeholder contact info. |
| 37 | Global header | Logo, nav, Join, Login/My Account, Search | Yes | Varies by mockup (Section 14) | |

---

## 4. Features

| # | Feature | Description | User Action | Expected Result | Priority |
| - | ------- | ----------- | ----------- | --------------- | -------- |
| F1 | Seven-menu responsive navigation | Dropdowns for Home, Chapters, Academy, Daily, Library, Serve, Give; active-state highlight; mobile menu | Hover/tap menus | Correct destinations on all devices | Must |
| F2 | Home dropdown anchors | Vision & Mission and Statement of Faith smooth-scroll; Founder opens a page | Click item | Scroll or navigate | Must |
| F3 | Google sign-in | OAuth sign-in/registration | Click "Join" or "Login" | Account created/identified; **no** member access granted | Must |
| F4 | Session management | Secure cookies, device/session records, log out of all devices, admin revoke | Click "log out everywhere" / admin revokes | Sessions invalidated | Must |
| F5 | Registration form | Name, DOB, gender, country/state, WhatsApp, email, area of interest (Men/Women/Youth/Academy), faith-journey field (3 options) | Fill and save | Progress saved | Must |
| F6 | Minor/consent logic | DOB under 18 triggers consent step; guardian signs form and submits it | Complete consent | Stays Pending until Admin verifies | Must |
| F7 | YouTube subscription step | Button to open official channel; instructions | Subscribe | Proceeds to proof | Must |
| F8 | Subscription proof upload | Screenshot upload to private storage; admin approve/reject | Upload screenshot | Status Pending → Verified | Must |
| F9 | Fallback contact link | Designated ShininChrist link for confirmation/fallback | Click | Opens approved link | Must (link not supplied) |
| F10 | Chapter selection | Choose Men / Women / Youth | Select | Stored; visible to Admin | Must |
| F11 | Uniform request | Type, size, quantity, delivery type, address, phone, country | Fill form | Order created (unpaid) | Must |
| F12 | Paystack payment (NGN) | Initialise, redirect, verify by webhook | Pay | Order = Paid; receipt emailed | Must |
| F13 | Order status tracking | Payment, production, dispatch, delivery status | View status | Current status visible to member and Admin | Must |
| F14 | Activation + Member ID | Admin verifies all gates and activates; ID `SC-<CC>-#######` generated | Admin clicks "Activate" | Member becomes ACTIVE, ID displayed | Must |
| F15 | Member Dashboard | Role-adaptive modules | Open dashboard | Only permitted modules shown | Must |
| F16 | Access gates | Library, Daily This Week/Archive require ACTIVE | Visit protected URL | Locked page or content | Must |
| F17 | Give one-time donation | Amount, designation, name, email, country → Paystack | Donate | Transaction logged; receipt emailed | Must |
| F18 | Library with free / contribution downloads | Admin sets access level, free vs contribution; zero allowed | Download | Free file unlocks even at ₦0 | Must |
| F19 | Admin: members | Search by name/email/Member ID; view proof, consent, chapter, status | Admin search | Record shown | Must |
| F20 | Admin: roles | Assign roles; combined roles allowed | Admin edits | Permissions change server-side | Must |
| F21 | Admin: uniform orders | List, filter, update status | Admin updates | Member sees new status | Must |
| F22 | Admin: payments | List transactions, status, reference | Admin views | Reconciliation possible | Must |
| F23 | Admin: site content | Edit page text/images/links, header/footer, Invite Mercy photo/text | Admin edits | Change appears on site | Must |
| F24 | Invite Mercy form | Contact, event info, optional upload (PDF/DOC/JPG ≤10 MB) | Submit | Stored + admin notified (**handling not specified**) | Must |
| F25 | Transactional emails | Receipts, registration/onboarding updates, admin alerts | — | Emails sent | Must |
| F26 | SEO/analytics baseline | Meta tags, sitemap, robots, canonical, OG tags, analytics | — | Public pages indexable; member pages not | Must |
| F27 | Contact / FAQ / Support / Legal / Search / Store / In-Kind forms | See Section 3 rows 19, 24, 31–35 | — | — | **Needs confirmation** |

---

## 5. User Flows

### Flow A — Visitor browses the public site
Visitor → Home → opens any dropdown → reads Chapters / Academy / Daily Today / Serve / Give → clicks "Join ShininChrist" (or leaves).

### Flow B — Join and become an ACTIVE member (core flow)
1. Visitor clicks **Join ShininChrist** → sees "what you need" (Google account, WhatsApp number, screenshot ability, uniform funds).
2. **Sign in with Google** → account created, progress saved. *No member access.*
3. **Basic registration form** (name, DOB, gender, country/state, WhatsApp, email, area of interest, faith journey).
4. If **under 18** → **consent step**: download form → guardian signs → submit via designated channel. Status stays Pending.
5. **Subscribe** to official YouTube channel (button opens channel).
6. **Submit proof**: upload screenshot showing "Subscribed" (contract); include registration name/email.
7. **Request uniform** → choose type/size/quantity.
8. **Delivery details** → address, city/state, phone, delivery type.
9. **Review total** (uniform + delivery) → **Pay with Paystack**.
10. Webhook confirms payment → status = *Payment Confirmed*.
11. Status = **Pending verification**. Admin checks: form, consent (if minor), subscription proof, uniform ordered, payment confirmed.
12. Admin **activates** → Member ID generated → email sent.
13. Member sees **Welcome** screen + Member ID → enters **Member Dashboard**.

If the user signs in at any point before step 12 → **Registration Pending / Complete Your Registration** screen.

### Flow C — Returning ACTIVE member
Login (Google) → server checks `membership_status = ACTIVE` → Member Dashboard → Library / Daily This Week / Archive / Uniform status.

### Flow D — Non-member hits protected content
Visitor or Pending user → Library, Daily This Week, or Daily Archive → locked page → **Join ShininChrist** or **Member Login**. Titles, search results and files are not revealed.

### Flow E — One-time donation
Visitor → Give → Give Financially → choose amount/designation → enter name/email/country → Paystack checkout → webhook confirms → on-screen confirmation + email receipt → admin record created.

### Flow F — Library download
ACTIVE member → Library → resource → (if contribution-enabled) contribution prompt, any amount including 0 → file unlocks (free resource) → optional donation recorded separately.

### Flow G — Admin operations
Admin login → Members → open applicant → review proof/consent/payment → approve/activate → Member ID issued. Also: change role, update order status, edit page content, revoke a session.

### Flow H — Invite Mercy to Speak
Visitor → About → Invite Mercy to Speak → fills form (optional upload) → submit → confirmation message ("does not constitute confirmation of an engagement") → admin record/notification.

---

## 6. UI/UX Requirements

Taken from the mockups and guides. Exact values only where a document gives them.

| Area | Requirement |
| ---- | ----------- |
| **Palette [CLIENT]** | Deep/Forest Green **#0B3D2E**, Gold **#D4A017**, Cream **#FAF6EE**, White **#FFFFFF**; restrained black text. Hex values appear only in the Vision/Faith guides. Other mockup colours (blue, maroon, red) appear as accents on Academy, Chapters and Daily stream cards. |
| **Logo [CLIENT]** | Use **only the exact supplied logo** (`C689E3B8…png`, `6f20a6e4…jpeg` — identical). Green "S/C" with gold diagonal and red cross, gold divider, green "ShininChrist" wordmark with gold dot. No recreating, recolouring or restyling. The early Give mockup (`08276B8E`) shows a *different* gold-cross emblem — do not use it. |
| **Brand name** | Always "ShininChrist", never all caps. |
| **Typography** | Serif display headings (elegant, strong) + clean sans body; script/handwritten accent taglines ("A Brighter Tomorrow. Together."). Exact fonts **Not specified**. |
| **Header** | Logo left; main nav; gold **Join ShininChrist** button; later mockups add **Search** icon, **Join** (outline) and **Login** (green filled). After login, replace Login with **My Account**. Active page highlighted. Mockups vary (Section 14). |
| **Navigation** | 7 items with dropdowns: Chapters (4), Academy (5), Daily (3: Today / This Week 🔒 / Archive 🔒), Library (2: Library / Store), Serve (5), Give (4), Home (4). Members-only items show a lock / "Members Only" badge. |
| **Footer** | One reusable global component: Brand, Explore, Get Involved, Support, Contact Us (with gold button), Connect (YouTube, Facebook, Instagram, TikTok, WhatsApp; **Telegram hidden until activated**), legal bar with dynamic copyright year. Dark green with gold lines. Stacked/accordion on mobile. Links must go to real pages; no dead icons. |
| **Hero sections** | Full-width dark-green/photographic hero, large white serif title with gold accent word, gold primary button + outline secondary button. Curved gold divider at the bottom of heroes (Home, Academy, Daily, Give). |
| **Buttons** | Gold filled (primary), outline white/green (secondary), dark-green filled in light sections; arrow icon on many CTAs. Rounded corners. |
| **Cards** | Rounded cards with thin gold border; circular dark-green icon badge overlapping the image top; image + title + short text + link. Used for Framework, Chapters, Fields of Learning, Ways to Give/Serve, Library collections. |
| **Forms** | Invite Mercy form: grouped sections (Contact / Event / Additional), labelled fields, red asterisks for required, dropdowns, date picker, file upload with type/size note, dark-green submit button. Join form: simple, progress indicator recommended. |
| **Tables / lists** | Daily "This Week" list (thumbnail, title, date, lock icon) and Archive (search + filters by month/topic/scripture). Admin tables are Not designed. |
| **Modals** | None shown. Not specified. |
| **Tabs / filters** | Library filter chips (All, Faith, Christian Living, Education, Media, Music, Publications, Tools); Store chips (All, Books, Music, Merchandise…). |
| **Accordions** | FAQ (expandable); Daily Today steps (+ expand icons); footer on mobile. |
| **Icons** | Simple line icons in dark-green circles (heart, house, people, globe, Bible, cross, dove, crown, eye, target). |
| **Imagery** | Warm, diverse, people-centred photography; world-map/global overlays and light rays. Most mockup images look **AI-generated**; real licensed/client photos are required for production (Section 12). |
| **Spacing** | "Generous spacing"; exact values Not specified. |
| **Responsive [CLIENT]** | Mandatory on phones, tablets, desktops. Cards/columns stack; footer reorganises (not just shrinks); Vision/Mission stack; mobile nav keeps all routes. |
| **Accessibility** | Semantic HTML, keyboard navigation, visible focus, contrast, accessible icon labels. |
| **Content rules** | Preserve approved wording; do not add claims; correct grammar. No Evangelist Mercy photo on Home. Founder photo must be used unaltered (resize/crop only). Do not call her "Apostle" (use "apostolic anointing"). Do not state tax-deductibility. Use "Elohim" terminology exactly. |
| **Tone (Library)** | "Support this ministry if you are able", never "Pay to unlock". |

---

## 7. Design Screenshots Mapping

| Screenshot / File | Represents | Related Requirement | Notes |
| ----------------- | ---------- | ------------------- | ----- |
| `690540CF-…png` | **Home page** (header, hero, Framework, Founder + Faith blocks, 4 pathway cards, footer strip) | R1, S8; `Homepage Text.docx` | Header has **no** search/Login. Matches the 7-menu spec. |
| `31A6F4A1-…png` | Home → **Vision & Mission** section + Home dropdown behaviour | R1, S8; Vision guide | Section sits between hero and Framework. |
| `7B3C4120-…png` | Home → expanded **Statement of Faith** (6 pillars) | R1, S8; Faith guide | **Mockup text differs from guide text** (Section 14). |
| `35AAB0BA-…png` | **About the Founder** page | R1; Founder guide | Shows founder photo and university logos. Real photo file not supplied separately. |
| `B4C73C8A-…png` | **Invite Mercy to Speak** page + annotations | R2; chat 14 & 23 Sep | Annotations: not in main nav; in About dropdown and footer. Header shows Shop, Contact, account icon. |
| `Chapters mockup.png` | **Early Chapters** main page | R1; `ChaptersText 1.pdf` | Has top utility bar (social + English), Login. Superseded in layout by `98BF40CF`. |
| `98BF40CF-…png` | **Chapters** with dropdown + Men/Women/Youth previews | R1; Chapters Freelancer Guide | Final structure: 4 pages. |
| `Academy mock up.PNG` | **Early Academy** page ("Learn. Grow. Excel.") | R1; `Academy Text.pdf` | Superseded by `8804E316`. |
| `8804E316-…png` | **Academy** main + 5 dropdown page previews | R1; Academy Final | Hero: "Learn Today. Lead Tomorrow. Shine for Christ." |
| `A5C3AE96-…png` | **Early Daily** page (4 streams) | `Daily page-Text.pdf` | **Superseded** by Daily Final. |
| `958C14A0-…png` (+ `(1)` duplicate) | **Daily** final: Today / This Week 🔒 / Archive 🔒 | R1, F16; Daily Final | Connector arrows are explanatory, not UI. Header shows About, Join, Login, Search. |
| `6FE3C785-…png` | **Early Library** page (six collections) | `Library Page.pdf` | **Superseded** by `FBD3AA75`. |
| `FBD3AA75-…png` | **Library** (locked / member) + **Store** (public) | R12, F16, S4; Library Explanation | Contains developer notes on the image. |
| `8C3DC8BB-…png` | **Serve** page | R1; `Serve Text.pdf`, Serve Explanation | The file named for Serve in chat (`98BAE633`) is actually a **Give** image. |
| `98BAE633-…png` | **Give** (pre-gateway update) | R11; Give Explanation | Shows "Give Where Needed" cards. Placeholder email/WhatsApp. |
| `08276B8E-…png` | **Early Give** page | `Give Text.pdf` | Different logo/emblem; superseded. |
| `8A62F887-…png` | **Give** updated, with Secure & Trusted Payment Options (Paystack, Flutterwave, Stripe, PayPal, Bank) | R11; Give Explanation Final | Multi-gateway **conflicts with Paystack-only contract**. |
| `2CAE4429-…png` | **Global footer** reference | R1; Footer guide | Placeholder email and phone must not be published. Includes "Prison Outreach / Community Impact" links that need approval. |
| `B2F3D551-…png` | **Join ShininChrist** 10-step infographic | R4–R10; Join guide | Shows "User ID and Password" issued at activation; WhatsApp used for proof. |
| `C689E3B8-…png`, `6f20a6e4-…jpeg`, `…1.jpeg` | **Official logo** (same artwork; jpeg ×2 identical) | R22 | Raster on white background. No SVG/transparent version supplied. |
| `google6ca85172db0b5c70 (1).html` | Google Search Console verification file | S12 | Single line; must be served at site root. |

**Documents (non-image) and their role**

| File | Role |
| ---- | ---- |
| `shinin-doc.docx` | Full Upwork chat history: **source of the M1 contract list**, dates, budget, tools, hosting decisions. |
| `ShininChristProjectImran.docx` | Client's scope clarifications and acceptance criteria. |
| `ShininChrist_Revised_Platform_Blueprint_August_2026.pdf` | Architecture, roles, rules, 3-phase plan. |
| `Homepage Text.docx`, `About the Founder Text.pdf`, `Vision & Mission…pdf`, `Statement of Faith…pdf` | Home area copy and behaviour. |
| `ChaptersText 1.pdf`, `ShininChrist_Chapters_Main_and_Dropdown_Freelancer_Guide.pdf` | Chapters. |
| `Academy Text.pdf`, `Academy Final.pdf` | Academy (Final wins). |
| `Daily page-Text.pdf`, `Daily Final W_Explanation.pdf` | Daily (Final wins). |
| `Library Page.pdf`, `Library Explanation .pdf` | Library (Explanation wins). |
| `Serve Text.pdf`, `Serve Explanation.pdf` | Serve. |
| `Give Text.pdf`, `Give Explanation Final.pdf` | Give (Final wins). |
| `Join Text Explanation .pdf` | Join process. |
| `Footer ShiniChrist.pdf` | Footer. |
| `Final Final FAQs ShininChrist.pdf` | FAQ content + membership/serving rules. |
| `For Influencer 1.pdf`, `For Influencer 2.pdf` | Remaining pages (Contact, Store, Search, FAQ, Support, Legal) and the 100% CMS requirement. Client confirmed "Influencer" should read "Freelancer". |
| `Zenovra_Techs_Four_Partner_Agreement.docx` | **Not a client document.** A template partnership agreement for a developer company (Zenovra Techs). No ShininChrist requirements. Ignored. It contains personal-data placeholders and should not be shared with the client. |

---

## 8. Business Rules

**Membership and access**
- **Google sign-in or account creation never grants member access.** Protected access requires `membership_status = ACTIVE`, checked on every protected request (server-side).
- Activation requires **all** of: registration complete; parental consent verified (if under 18); YouTube proof received/verified; uniform requested; **uniform + delivery payment confirmed**; ShininChrist approval.
- Physical delivery of the uniform is **not** required before activation.
- No required monthly/annual membership subscription. The only "subscription" is the free YouTube subscribe step.
- Donating does not make anyone a member, teacher or learner. Statuses stay separate.
- Born-again status is **not** a membership requirement. Faith-journey field has 3 options (born-again Christian / Christian still learning / desire to learn about and follow Jesus).
- Serving/volunteering/outreach requires born-again status, good character and verifiable references (applications are M3, but FAQ states the rule).
- Students are never promoted to teachers (Academy is M2).

**Minors**
- DOB under 18 → guardian consent required **and** uniform payment, before activation.
- Children are served inside Youth; **no Children's Chapter** ("coming soon" only). *Jesus & Me* is a Daily stream, not a chapter.

**Member ID**
- Format e.g. `SC-NG-0000128`: country prefix + automatic unique number.
- Join infographic and guide also say a "User ID and Password" may be issued; the contract and blueprint say Google sign-in. See Section 14.

**Daily access**
- **Today = public.** This Week, Archive, member downloads = ACTIVE only. Each new day replaces the previous public Daily; the old one moves to member-only history. No public download button.

**Library / Store**
- Library = ACTIVE members only (final guide). Store = public. Library must never be a back door to other pages' protected content.
- Contribution rule: zero is allowed. If a resource is designated free, the file unlocks at 0. Optional donations are recorded separately from entitlement.
- Admin controls resource visibility, access level, contribution settings.

**Payments**
- Paystack (contract): Naira. Accept Nigerian bank transfers/POS cards, international cards, Apple Pay (client's 20 Aug message).
- Payment is only "Paid" after **verified webhook** (signature checked, idempotent). A browser success page or screenshot is never proof.
- No card data stored. Keys in secure config, entered by the client.
- Do not claim tax deductibility.

**Roles and permissions**
- Minimum roles: Public Visitor, Registered/Pending Member, Active Member, Learner, Approved Teacher, Admin, Super Admin; combinations allowed. Least privilege; server-enforced.

**Content and brand**
- Founder photo: no AI, no retouching, no alteration. No Mercy photo on Home.
- Do not publish placeholder emails/phones/QR codes. Footer links only to approved, real destinations.
- Volunteer disclosure ("voluntary, not employment") belongs in application text, not prominent on the Serve page.

**Notifications**
- Welcome/registration, onboarding completion, uniform payment/order updates, donation receipts, admin alerts for new applications/verification tasks.

---

## 9. Technical Requirements

### Frontend
- **Next.js**, responsive, accessible; public and protected routes **[CLIENT]**.
- Protected pages excluded from search indexing; sitemap, robots, canonical URLs, structured/social metadata.
- Core Web Vitals / image optimisation / caching.
- Fonts, CSS framework, component library: **Not specified**.

### Backend
- Server-side authorization on every protected action; server-side validation of all input; rate limiting.
- Payment-service layer so other gateways can be added later.
- Webhook handling (verified + idempotent).
- Language/runtime beyond Next.js: **Not specified**.

### Database
- Relational DB "such as PostgreSQL" is *recommended* in the blueprint; the product is **Not specified**.
- Must model: users, roles, members, countries, chapters, registration status, consent, proof, uniform orders, payments/transactions, donations, library resources, content, sessions/devices, audit.
- Currency/amount storage must support multiple countries.
- Backups + documented recovery.

### APIs / Integrations
- **Paystack** (NGN, hosted checkout, webhooks).
- **Google OAuth**.
- YouTube API verification: *prototype planned in blueprint*, but the **contract downgrades to screenshot + admin approval**. Automatic verification is "later phase".
- Fallback contact channel (WhatsApp link): **link not supplied**; the contract text was edited after Upwork blocked the original.
- Transactional email provider: **Not specified**.

### Authentication / Authorization
- Google/Gmail sign-in, secure cookies/sessions, log-out-all-devices, admin session revoke, device/session records, rate limiting.
- Suspicious-login flags, concurrent-session limits, password recovery: *blueprint-level*, **not in the M1 contract**. Needs confirmation.
- Role-based access, server-side, no URL-guessing.

### Third-party Services
| Service | Status |
| ------- | ------ |
| **Vercel** hosting | Client: free plan at start. Imran builds on his own Vercel account and **transfers** the project at handover [CLIENT-agreed, chat 3 Oct]. |
| **Hostinger** | Client already owns the domain there. DNS stays with client. |
| **Paystack** | Client account needed; client enters live keys. |
| **Private file storage** | Provider **Not specified**. |
| **Email service** | Provider **Not specified**; must be ShininChrist-owned or transferable. |
| **Video hosting** | Academy only (M2). |
| **CMS (e.g. Sanity)** | Client suggested "like Sanity" (20 Aug). Contract says "Admin panel … site content". **Not decided.** |
| **Analytics** | "Privacy-conscious analytics agreed with ShininChrist"; tool **Not specified**. |
| **Error monitoring / uptime** | Blueprint requires; tool **Not specified**. |

**Rule [CLIENT]:** no paid recurring service may be activated without approval; list any recurring cost/vendor lock-in before final approval.

---

## 10. Reusable Components

| Component | Where used |
| --------- | ---------- |
| **Header + mega/dropdown nav** (desktop + mobile drawer) | Every page |
| **Global Footer** (config-driven links, socials, legal bar) | Every page |
| **Page hero** (title, accent, subtitle, 2 CTAs, curved divider) | Home, Chapters, Academy, Daily, Library, Serve, Give, Founder, Invite Mercy |
| **Section heading** (centred title with gold rules/diamond) | All pages |
| **Icon-badge card** (image + circular icon + title + text + link) | Framework, Chapters, Academy fields, Serve, Give ways, Library collections |
| **Pathway card** (dark-green/gold colour block + CTA) | Home bottom, Give three paths |
| **Buttons** (primary gold, secondary outline, dark-green) | Everywhere |
| **Quote / scripture band** | Founder, Daily, Chapters, Academy |
| **Form field set** (text, select, date, file upload, textarea, validation, error states) | Join, Uniform, Give, Invite Mercy, Admin |
| **Multi-step wizard + progress bar** | Join |
| **Status badge** (Pending, Active, Paid, Locked, Members Only) | Dashboard, Admin, nav |
| **Locked-access panel** (lock icon + Join + Member Login) | Library, Daily This Week/Archive |
| **Data table with filters/search/pagination** | Admin (members, orders, payments, resources) |
| **Dashboard module tile** | Member Dashboard |
| **Accordion** | FAQ, Daily Today steps, mobile footer |
| **Search field + filter chips** | Library, Archive, Courses |
| **Paystack checkout wrapper** | Uniform, Give, Library contribution |
| **Email templates** | Receipts, onboarding, admin alerts |
| **Content blocks (CMS-driven)** | All editable pages |
| **Auth guard / role guard** | Server middleware, all protected routes |

---

## 11. Milestone 1 Deliverables (checklist)

**Foundation**
- [ ] Next.js project, repo, preview + production environments on Vercel
- [ ] Database schema + migrations (users, roles, members, chapters, orders, payments, resources, sessions)
- [ ] Environment-variable handling for secrets; Paystack keys entered privately by client
- [ ] Analytics + error monitoring configured (agreed with client)

**Global**
- [ ] Header with 7-menu dropdown navigation (desktop + mobile), Login/My Account state
- [ ] Global Footer (config-driven)
- [ ] Brand theme (colours, type, buttons, cards) using the exact logo
- [ ] SEO: metadata, sitemap, robots, canonical, OG; protected pages noindex
- [ ] Google Search Console verification file served at root

**Public pages**
- [ ] Home (with Vision & Mission and Statement of Faith sections; anchor scrolling)
- [ ] About the Founder
- [ ] Invite Mercy to Speak (page, form, editable photo/text; linked from About dropdown + footer)
- [ ] Chapters main + Men + Women + Youth
- [ ] Academy main + Courses + Assessments + Teachers + Learner Support (content pages only)
- [ ] Daily: Today (public), This Week (locked), Archive (locked)
- [ ] Library locked page + member Library home
- [ ] Serve main + dropdown pages (structure; applications are M3)
- [ ] Give main + Give Financially (one-time)

**Auth and membership**
- [ ] Google sign-in; secure sessions; log out of all devices; admin session revoke
- [ ] Join wizard (all 10 steps, status machine, saved progress)
- [ ] Registration form incl. faith-journey field
- [ ] Under-18 consent handling
- [ ] YouTube proof screenshot upload (private storage) + admin approve/reject
- [ ] Fallback contact link (once supplied)
- [ ] Chapter selection stored and visible to Admin
- [ ] Member ID generation with country prefix
- [ ] Registration Pending screen
- [ ] Access gates enforced server-side (Library, Daily member pages)
- [ ] Member Dashboard (role-based modules)

**Payments**
- [ ] Uniform request form (country, size, quantity, delivery type, address)
- [ ] Paystack payment (NGN) + verified, idempotent webhook
- [ ] Order status tracking (member + admin)
- [ ] Email receipts
- [ ] Give one-time donation via Paystack
- [ ] Library free / contribution (incl. zero) download logic

**Admin**
- [ ] Members (search by name/email/Member ID, view proof/consent, activate, suspend)
- [ ] Roles management
- [ ] Uniform orders
- [ ] Payments / donations list
- [ ] Site content editing (incl. Invite Mercy, header/footer links)
- [ ] Library resource management (access level, contribution settings)

**Quality and acceptance**
- [ ] Fully responsive (phone, tablet, desktop)
- [ ] Paystack sandbox end-to-end test; webhook signature test
- [ ] Role/permission tests (public cannot reach protected URLs)
- [ ] Preview link delivered to client; walkthrough of M1 flows
- [ ] Third-party service + recurring-cost list started

---

## 12. Dependencies

| Needed | From | Notes |
| ------ | ---- | ----- |
| **Paystack account access** (test keys for dev; client enters live keys) | Client | Contract: "Accounts needed for M1 = Paystack + domain login". |
| **Domain/DNS access** (Hostinger) | Client | Needed only at deployment; client keeps control. |
| **Google Cloud OAuth credentials** | Client or developer | OAuth consent screen branding needs the logo; ownership Not specified. |
| **Official logo in best format** (SVG/transparent PNG) | Client | Only a raster on white background supplied. |
| **Photographs**: real people/community imagery; **original founder photo** file | Client | Mockup images appear AI-generated. Founder photo only exists inside the mockup image. |
| **Founder video** and **"Watch our Story"**, **Chapter video** | Client | Not provided. |
| **Official YouTube channel URL** | Client | Not provided. |
| **Official WhatsApp link/number** | Client | Not provided; footer/Give mockups show placeholders. |
| **Official email/contact info and social URLs** (Facebook, Instagram, TikTok) | Client | Placeholders only. |
| **Parental consent form** wording/template | Client | "Precise consent wording can be supplied by ShininChrist." |
| **Uniform details**: types (T-shirt, wristband?), sizes, prices, delivery costs per country (NG/JM/US), delivery methods | Client | None supplied. |
| **Join-form field list confirmation** (country/state lists etc.) | Client | |
| **Library content** (files, covers, metadata) | Client | None supplied. |
| **Daily content** (at least sample entries, media) | Client | None supplied. |
| **Legal wording** (Privacy, Terms, Refund, Cookie, Accessibility) | Client | If those pages are in M1. |
| **Email service account** | Client (approve) / developer (configure) | Provider and sender domain Not specified. |
| **Analytics choice** | Client | |
| **Missing contract attachments** (`Milestones.pdf`, `Website_Development_Milestones_Blueprint (2).pdf`) | Developer/Imran | Not in folder; confirm they match the chat text. |
| **Written scope confirmation** for the clarification document | Imran → Georgia | Imran said (23 Sep) he would send it; not seen in folder. |

---

## 13. Unclear / Missing Information

**Q1 — Which "extra" pages are in M1?**
**Question:** Are Store, Contact Us, FAQ, Technical Support, Report an Issue, legal pages, site-wide Search, Give In-Kind form and Give Property inquiry part of M1?
**Why it matters:** The contract M1 list does not include them, but footer/guide documents say they are required and acceptance says the footer must work. This is a large scope difference.

**Q2 — Is a CMS (Sanity or similar) required in M1, and how editable is "site content"?**
**Question:** Does "Admin panel … site content" mean full page-level CMS editing (Influencer 2: "100% editable", demonstrated on every page type) or limited editing of specific blocks?
**Why it matters:** It decides architecture (headless CMS vs DB-backed admin) from day one.

**Q3 — How does YouTube proof reach us: upload or WhatsApp?**
**Question:** The contract says screenshot **upload** with admin approval; the Join guide says send the screenshot via **WhatsApp**. Which is the primary path? Is WhatsApp only the fallback?
**Why it matters:** Changes the form, storage and admin matching process.

**Q4 — Parental consent submission method.**
**Question:** Guide says guardian submits signed consent via WhatsApp. Should the site also allow uploading the signed form?
**Why it matters:** Determines private-file handling for minors' documents.

**Q5 — Fallback contact link.**
**Question:** What is the actual link/number (WhatsApp or other)? Imran's message was edited after Upwork blocked a platform reference.
**Why it matters:** Required in onboarding, footer and Contact.

**Q6 — Who activates a member and when is the Member ID shown?**
**Question:** Is activation manual (Admin clicks) after payment webhook, or automatic when all gates pass? Contract says ID is shown "according to the agreed membership stage".
**Why it matters:** Defines the status machine and when IDs are issued/consumed.

**Q7 — Credentials: Google SSO only, or ID + password?**
**Question:** Join infographic shows "User ID and Password" issued at activation.
**Why it matters:** Password systems need hashing, resets and extra security. Contract/blueprint imply Google-only.

**Q8 — Uniform product and pricing.**
**Question:** Item(s) (T-shirt only or T-shirt + wristband), size charts, price per country, standard vs expedited delivery fees, quantity limits. Is the price fixed in NGN for everyone?
**Why it matters:** Required to build the order form and Paystack amounts.

**Q9 — Currency and international payments.**
**Question:** "Operate in Naira" but accept international cards/Apple Pay for US/Jamaica. Will Jamaican/US members pay the uniform in NGN or USD/JMD? Does Paystack account support the needed currencies?
**Why it matters:** Affects pricing, FX display and Paystack account configuration.

**Q10 — Give: Paystack only or multi-gateway?**
**Question:** Give Explanation Final lists Paystack + Flutterwave + Stripe + PayPal + bank transfer; the contract says Paystack, "additional payment providers" later.
**Why it matters:** Cost/time. The mockup shows other logos on the page.

**Q11 — Give categories and designations.**
**Question:** Which designations (Where Needed Most, Scholarships, Missions…) and "Sponsor an Initiative" campaigns exist at launch? Amount presets/minimums?
**Why it matters:** Form and admin configuration.

**Q12 — Library in M1: public preview vs fully members-only.**
**Question:** Contract: free downloads and give-what-you-can. Final guide: Library is fully ACTIVE-only with no public titles. Which applies, and where do "free downloads" live?
**Why it matters:** Determines gating logic and what public users can see.

**Q13 — Library structure.**
**Question:** Collections differ between guides (6 vs 7 named collections, 9 categories). Which taxonomy for M1?
**Why it matters:** Data model and filters.

**Q14 — Daily in M1.**
**Question:** How is Daily content created (by Admin in a CMS, six sections with mixed media)? Is the Today/Week/Archive model confirmed and is the older "four streams" page dropped? Who supplies content and media hosting?
**Why it matters:** Daily is not named in the contract list but its dropdown pages are.

**Q15 — Header/navigation final version.**
**Question:** Which header is final: 7 items + Join (Home mockup), or Home / About / Daily / Academy / Chapters / Library / Serve / Give + Search + Join + Login (later mockups), or including Shop + Contact (Invite Mercy mockup)?
**Why it matters:** Contract says "seven main menus". Header is global and touches every page.

**Q16 — Academy / Serve dropdown pages in M1.**
**Question:** Are the Academy sub-pages (Courses, Assessments, Teachers, Learner Support) and the Serve sub-pages static content pages in M1? Serve applications are M3.
**Why it matters:** Avoids building M2/M3 features early.

**Q17 — Invite Mercy submissions.**
**Question:** Where do submissions go (admin inbox, email address), and is a file upload needed? Who is notified?
**Why it matters:** Needs storage + notification target.

**Q18 — Email provider and sending domain.**
**Question:** Which provider and what sender address? Who owns the account?
**Why it matters:** Receipts and notifications cannot be tested without it.

**Q19 — Security extras.**
**Question:** Are device records, suspicious-login flags, concurrent-session limits and password recovery required in M1 or only "log out of all devices" and admin revoke?
**Why it matters:** Time/budget.

**Q20 — Hosting handover timing and database.**
**Question:** Which database and storage vendor, and will the free tiers be enough? Who creates the accounts and when?
**Why it matters:** Clarification doc requires ShininChrist ownership and cost transparency.

**Q21 — Country list and ID prefixes.**
**Question:** Confirm launch countries (Nigeria, Jamaica, United States) and prefixes (`NG`, `JM`, `US`?). What if someone selects another country?
**Why it matters:** ID generation and form validation.

**Q22 — Due date.**
**Question:** Imran's message said 14 Oct; client changed the Upwork due date to 16 Oct. Confirm 16 Oct is binding.
**Why it matters:** Planning.

**Q23 — Founder photo / assets.**
**Question:** Please send the original founder photo (unedited) and approved imagery or confirm AI-style mockup images are placeholders.
**Why it matters:** Brand and legal rules forbid altered founder images.

---

## 14. Conflicts / Inconsistencies

**C1 — Contract vs later guides on scope**
**Conflict:** Contract M1 lists specific features. `For Influencer 1/2`, Footer, Library & Give guides add Store (cart/checkout), Contact, FAQ, Support, Search, legal pages, Give In-Kind/Property, multi-gateway payments and a 100% CMS. The client calls these "remaining development" pages.
**Possible interpretation:** Client considers all of it part of the $500 build. The clarification doc (§7) says ambiguous items must be raised before work starts.
**Action required:** Send Georgia a line-by-line scope list (Section 3) and get written inclusion/deferral. Do this before starting.

**C2 — Paystack only vs four gateways**
**Conflict:** Contract: Paystack, other processors "later". Give Explanation Final: Paystack + Flutterwave + Stripe + PayPal + bank transfer, and Give mockup shows all.
**Possible interpretation:** Architecture must allow multiple gateways; only Paystack is built now. The Give mockup would show only enabled methods.
**Action required:** Confirm only Paystack is live in M1 and the mockup's other logos are hidden/"coming soon".

**C3 — YouTube proof: upload vs WhatsApp**
**Conflict:** Contract: screenshot upload + admin approval. Join guide/infographic: send screenshot via WhatsApp. Blueprint: WhatsApp as fallback.
**Possible interpretation:** Upload is primary, WhatsApp is a fallback.
**Action required:** Confirm (Q3).

**C4 — Library public vs members-only**
**Conflict:** Clarification doc: "public website may show a Library preview". Contract: Library with free downloads. Library Explanation/Footer/FAQ: Library is ACTIVE-only and non-members see nothing. Early Library page was public.
**Possible interpretation:** Latest guide wins; "free downloads" are inside the member Library. A "preview" is only the locked page.
**Action required:** Confirm (Q12).

**C5 — Daily structure**
**Conflict:** `Daily page-Text.pdf` + early mockup: four streams (Adam / Eve / Called / Jesus & Me). Daily Final: Daily is universal; three destinations (Today / This Week / Archive); "should not be divided into I Am Adam…" Chapter mockups still link to "I Am Adam/Eve/Called".
**Possible interpretation:** Final guide supersedes. Chapter pages keep links to those streams, but Daily has no stream split. What those links open is unclear.
**Action required:** Confirm destination of the "Visit I Am …" buttons.

**C6 — Navigation / header**
**Conflict:** Contract + original mockups: 7 menus + Join. Later mockups: add About (with FAQ, Invite Mercy), Search, Login/Join split, different item order (Daily before Academy before Chapters), and Shop/Contact. Invite Mercy image says "Do not add to main navigation", while the same header shows Shop, Contact and About dropdown. Home dropdown spec (Vision / Faith / Founder under Home) vs later About dropdown (Our Founder, Vision & Mission, Statement of Faith, Invite Mercy, FAQ). Imran told the client Invite Mercy goes under About.
**Possible interpretation:** The newest mockups represent the final header; the Home dropdown became About.
**Action required:** Confirm final menu structure and order (Q15).

**C7 — Statement of Faith wording**
**Conflict:** Home mockup: 3 statements (Genesis 1:1, Bible, Salvation + fasting, prayer, Great Commission). Faith guide: 6 headings (Bible, Elohim, God the Son, Holy Spirit, Salvation, Church) with scripture refs. The Faith **mockup image** has 6 cards with different wording (e.g. "promised return", "Christ-Centered Living") not in the guide text.
**Possible interpretation:** Guide text is the exact copy; image is illustrative only.
**Action required:** Confirm the written guide is authoritative.

**C8 — Home hero wording**
**Conflict:** Homepage Text docx: "Shining Christ in our Hearts, Homes, Communities, and Nations" with a longer description. Vision mockup hero: "Advancing spiritual, educational, and cultural literacy through interdisciplinary learning…". Founder bio on Home: "Georgia Melecia Morris at birth" vs Founder page "Georgia 'Mercy' Morris-Nnabuihe".
**Possible interpretation:** Vision mockup is an illustration; Home docx is authoritative.
**Action required:** Use Homepage Text docx; confirm.

**C9 — Founder naming / titles**
**Conflict:** Home text calls her "educator, missionary, U.S. Army veteran"; Founder page adds "evangelist, author". Chat sign-off uses "Georgia 'Mercy' Nnabuihe".
**Possible interpretation:** Home is intentionally concise.
**Action required:** None unless the client says otherwise; follow each page's guide.

**C10 — Logo variations**
**Conflict:** Early Give mockup shows a different emblem and tagline ("Shining Christ. Transforming Lives."). Several mockups show taglines under the logo and "People • Purpose • Impact". Guides insist on the exact supplied logo.
**Possible interpretation:** Mockup artwork is not final; only the supplied logo file counts.
**Action required:** Use the supplied file; ask for a transparent/SVG version.

**C11 — Chapter vs Academy "area of interest"**
**Conflict:** Join form "Area of interest" includes Men, Women, Youth, **Academy**; contract's M1 "Chapter selection (Men's, Women's, Youth)". Clarification says select chapter "where applicable".
**Possible interpretation:** Interest is a form field; Chapter is a stored choice. Academy interest does not need a chapter.
**Action required:** Confirm whether Academy-only members need no chapter.

**C12 — Credentials**
**Conflict:** Join infographic: "User ID and Password" issued at activation. Contract/blueprint: Google sign-in and Member ID. Join guide: "Student/User ID" and "student credentials".
**Possible interpretation:** Member ID is the visible ID; no separate password.
**Action required:** Confirm (Q7).

**C13 — Access terminology: "student" vs "member"**
**Conflict:** Blueprint says platform is member-centred, not student-centred; Join guide still says "student access" and "Student/User ID".
**Possible interpretation:** Use "Member" in UI. Learner is a separate role (M2).
**Action required:** Confirm label.

**C14 — Uniform item**
**Conflict:** Blueprint/Join: T-shirt; FAQ: "T-shirt and wristband"; Join guide: "uniform type (T-shirt, …)".
**Possible interpretation:** Product list is configurable.
**Action required:** Confirm (Q8).

**C15 — Serve application timing**
**Conflict:** Serve guide describes a volunteer application form and opportunities management; contract M3 includes "Serve page volunteer applications". Serve is also part of the M1 7-menu site.
**Possible interpretation:** M1 builds Serve pages (content); forms and review come in M3. Teacher applications are M2.
**Action required:** Confirm Serve CTAs link to "coming soon" or a simple contact in M1.

**C16 — Recurring donations and audit log**
**Conflict:** Blueprint/Give guide include recurring giving and audit trail; contract puts both in M3.
**Possible interpretation:** Build M1 donations as one-time and keep the model ready.
**Action required:** None; keep M1 to one-time donations. Optional: start the audit log early.

**C17 — Library tone vs contribution**
**Conflict:** None in documents, but "contribution before download" must not look like paywall (Blueprint §13). Flagging as a design risk.
**Action required:** Review copy with client.

**C18 — Dates and duration**
**Conflict:** Imran's first plan: M1 due 14 Oct (contract) and total delivery 15–17 Sep (earlier plan, now past). Client moved M1 due date to 16 Oct. Chat shows contract accepted 5 Oct, 11 days before the due date.
**Possible interpretation:** 16 Oct governs.
**Action required:** Confirm; plan around 11 days.

**C19 — Billing concern on contact info**
**Conflict:** Mockups show `info@shininchrist.org`, `give@shininchrist.org`, `+1 (XXX) XXX-XXXX`; guides say these are placeholders and must not be published.
**Action required:** Use admin-configurable fields, empty until supplied.

**C20 — Evangelist Mercy photo on Home**
**Conflict:** Home spec: no photo of Mercy. The Invite Mercy page is built around her photo (editable).
**Possible interpretation:** Not a conflict. Photo allowed on Founder and Invite Mercy pages only.
**Action required:** None.

---

## 15. Recommended Development Order

**[REC]** based only on the dependencies above.

1. **Confirm scope with client** (Q1, Q2, Q3, Q8, Q15) — short written reply. Nothing else blocks on this except pages marked "unclear".
2. **Project foundation:** Next.js app, repo, Vercel preview, env handling, DB + migrations, linting, error monitoring.
3. **Design system:** tokens (colours), typography, buttons, cards, forms, header/footer shells.
4. **Global layout:** header (desktop + mobile), global footer (config-driven), page-hero component.
5. **Auth + roles + sessions:** Google sign-in, session store, log-out-all, role model, server-side guards.
6. **Membership data model + status machine** (registration steps, consent, proof, uniform, payment, activation).
7. **Public pages** (Home, Founder, Chapters ×4, Academy ×5, Serve, Give shell, Daily Today). Static/CMS-backed.
8. **Join wizard:** form, consent, proof upload (private storage), chapter selection.
9. **Uniform ordering + Paystack:** payment service layer, webhook verification, order status, receipts.
10. **Admin foundation:** members, roles, orders, payments, proof/consent review, activation + Member ID.
11. **Member Dashboard + access gates** (Library locked page, Daily This Week/Archive locks).
12. **Give one-time donation** (reuse payment layer).
13. **Library:** resources, free/contribution logic, admin controls.
14. **Invite Mercy page + form** and admin content editing for M1 pages.
15. **SEO / analytics / security hardening / performance.**
16. **Responsive pass, accessibility pass.**
17. **Testing:** Paystack sandbox E2E, webhook idempotency, permission tests, mobile.
18. **Deploy to private preview; client walkthrough; fix; submit M1.**

---

## 16. First Development Task

### What should I do first?

**Set up the project foundation: create the Next.js application with the database schema for users, roles, members and membership status, wired to Google sign-in, deployed to a Vercel preview URL.**

**Why this one first:** every other M1 feature (onboarding, uniform orders, payments, admin, gated Library/Daily, Member ID) depends on the user/role/status model and a working auth + preview environment. It needs nothing from the client except Google OAuth credentials (which can be a developer test project initially).

**In parallel (not coding):** send the client the short scope-confirmation list (Q1, Q2, Q3, Q8, Q15) so answers arrive before the pages and Join flow are built.

---

*End of summary. No development has started.*
