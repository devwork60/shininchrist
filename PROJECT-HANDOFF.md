# ShininChrist — Project Handoff Guide

Written for: another AI agent (or developer) continuing this build.
Last updated: 7 Oct 2026. Project folder: `D:\shininchrist`.

---

## 1. The project in short

- **Client:** Georgia "Mercy" Nnabuihe (Evangelist Mercy), ShininChrist ministry. Developer contact on Upwork: Imran Nasir.
- **Contract:** $500 fixed price, 3 milestones. **Milestone 1 = $200, due 16 Oct 2026** ("Core Platform & Member Onboarding").
- **Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, deployed on Vercel. Payments: Paystack (Naira). Google sign-in.
- **Read first:** `MILESTONE-1-SUMMARY.md` (full scope, conflicts, open questions) and `SKILL.md` (coding rules). `AGENTS.md` warns this Next.js version differs from older docs: read `node_modules/next/dist/docs/` before using unfamiliar APIs.
- **Client files** (designs, guides, chat history) are in `client-docs/`. Key design images: `home-page-design.png`, `library-page.png`, `chapter-page-dropdown.png` (Men/Women/Youth previews), `academy-page.png` (all Academy pages), `958C14A0-…png` (Daily, all 3 pages), `Chapters mockup.png`.

### Core business rules (do not break)
- Google sign-in does **not** make someone an active member. Access needs `membership_status = ACTIVE`, checked on the server.
- Activation needs: registration, parental consent if under 18, YouTube subscription proof (screenshot, admin approves), uniform requested **and paid**, admin approval. Then a Member ID like `SC-NG-0000128` is issued.
- Daily "Today" is public. Daily "This Week" and "Archive" are members only. The Library is members only. The Store is public.
- Use the exact supplied logo only. Write "ShininChrist", never all caps. Do not add claims, wording or programs the client has not approved. Never edit photos of Evangelist Mercy.
- Do not invent real emails, phone numbers, social links or bank details.

---

## 2. What is built (frontend pages only)

All pages are in `src/app/(landing-page)/…`. Everything is static content; there is **no login, database, payment or admin yet**.

| Area | URL | What is on it |
| ---- | --- | ------------- |
| Home | `/` | Hero with curve, Our Framework (4 cards), Founder + Statement of Faith panel, 4 pathway cards |
| Chapters | `/chapters` | Hero, "What Are ShininChrist Chapters?", 5-column experience, "All Ages Welcome" banner |
| Men's Chapter | `/chapters/men` | Hero, "What We Focus On" (10 items), "Connected to ShininChrist Daily" (I AM ADAM) |
| Daily | `/daily` | Hero, framework strip, "Today's Faith Formation" (6 step cards), closing banner |
| Daily Today | `/daily/today` | 6 expandable steps, verse card, action buttons |
| Daily This Week | `/daily/this-week` | 7 locked entries, members-only notice |
| Daily Archive | `/daily/archive` | Working search + 3 filters, locked entries |
| Academy | `/academy` | Hero, Fields of Learning, benefits strip, quote band |
| Courses | `/academy/courses` | Hero, working search (32 "Coming soon" subjects), browse by field, quote |
| Assessments | `/academy/assessments` | Hero, 6 exam cards (WAEC, NECO, UTME/JAMB, GCE, CXC/CSEC, CAPE), quote |
| Teachers | `/academy/teachers` | Hero, "Meet Our Teachers" 4 points, quote |
| Learner Support | `/academy/learner-support` | Hero, 6 support services, quote |
| Library | `/library` | Hero, Explore by Collection, Explore Resources, Academy Resources, Featured Resources, closing banner (**see warning below**) |

**Global parts:** sticky header with dropdowns on Chapters, Academy, Daily (rich rows with "Members Only" badges) and Library (Library + Store); mobile hamburger menu with expanding lists; global footer (6 columns + gold banner + legal bar).

### Not built yet
Women's and Youth chapter pages, Serve (+ dropdown pages), Give, Join wizard, Login / My Account, Member Dashboard, Contact, FAQ, Support, legal pages, site search, About / Founder / Invite Mercy, Store, Admin panel, database, Google auth, Paystack, emails, access control, SEO files (sitemap, robots).

### Warning: changes I did not make
Near the end of the session the user's side changed things I did not write: `src/app/(landing-page)/library/page.tsx` is now a client page with a Member / Non-member toggle (`LibraryModeToggle`, `NonMemberLibraryView`, `member/MemberLibraryView`), and a `store-page/` folder (`StoreProductCard.tsx`) exists. Read those files before touching the Library or Store. My original Library sections are still in `components/pages/library-page/`.

---

## 3. Code conventions (follow `SKILL.md`)

- **Folders:** `components/{button, icons, common-components, pages/{navbar, footer, typography, landing-page, chapters-page, chapter-audience, daily-page, daily-today, daily-week, daily-archive, academy-page, courses-page, assessments-page, teachers-page, learner-support-page, library-page}}`, `constant/`. Folders in kebab-case, components in PascalCase, data in camelCase.
- **Pages only assemble.** Text, links and image paths live in `src/constant/*Data.ts`. Each route has a `layout.tsx` with its own `metadata` (title, description). Member-only pages add `robots: { index: false }`.
- **Below-the-fold sections** load with `dynamic(() => import(...))`. The first section stays a static import.
- **File size:** target under 200 lines, hard limit 220.
- **Typography components** (`components/pages/typography/`): `HeroHeading` (h1; props `large`, `compact`), `MainHeading`, `SubHeading`, `BlockHeading`, `CardHeading`, `CardTitleSm`, `CardDesc`, `CardDescSm`, `Paragraph`, `HeroTagline`, `QuoteText`, `ScriptText`, `Eyebrow`, `StepTitle`, `SectionLabel`, `SectionSubtext`, `FooterHeading`, `FooterText`. Use these instead of raw `h1/h2/p`. All use `forwardRef`, `clsx` and accept `as`, `className`, `style`. Use `className` for colour and spacing; a few `!` overrides exist where the default colour did not fit (try to avoid adding more).
- **Buttons:** `ButtonSm` (filled, link or button) and `ButtonOutline`. Options: `shape="pill" | "rounded"`, `icon`, `iconRight`, `padding / paddingMd / paddingLg`. Colours are passed as CSS variables, e.g. `bgColor="var(--gold-bright)"`.
- **Reusable pieces** (`common-components/`): `SectionHeader` (variants `display` / `label`, `onBorder`), `BorderedSection`, `ArrowLink`, `HeroCurve`, `SimpleHero` (title + gold bar + tagline over a photo), `QuoteBand`, `Breadcrumb`, `MembersOnlyNotice`. Chapter pages share `AudienceHero`, `FocusSection`, `DailyConnectSection` (reuse them for Women and Youth; each needs a data file like `menChapterData.ts`, a photo and a colour variable).
- **Icons:** inline SVG sets in `components/icons/` using a `name` key pattern. `UiIcons` is the general set; others are per feature.
- **Colours:** defined once in `src/app/globals.css` as CSS variables, with Tailwind classes mapped (e.g. `bg-primary-green`, `text-gold-bright`, `text-text-grey`, `bg-cream`). Brand: green `#1d3d2e`, gold `#b07e0a`, nav text `#1c2721`, card heading `#012315`, grey `#969697`, black `#212326`. Extra accents: `--gold-bright`, `--primary-green-deep` (derived), `--academy-navy`, `--chapter-men`, `--field-*`, `--collection-*`, `--exam-*`.
- **Spacing:** use the `wrapper` utility on the inner element of every section (16 / 32 / 40px side margins, max 1350px at 1440+). Use `wrapper-wide` for the footer and `wrapper-narrow` for centred narrow columns. **Never** put `max-w-*` or `mx-auto` on an element that also has `wrapper` (it removes the gutters).
- **Fonts:** Playfair Display (`font-heading`), Geist (body), Dancing Script (`font-script`).
- **Responsiveness:** mobile-first. **Do not use `flex-wrap`**; use grids and fixed breakpoint layouts.
- **Equal-height cards:** when card headings can take different numbers of lines, use the subgrid pattern: grid has `gap-y-0`, each card has `row-span-N grid grid-rows-subgrid` and its own bottom margin. This keeps descriptions, links and photos on the same line.
- **Dropdown menus:** add `children` to an item in `src/constant/navData.ts`. A child with `description` becomes a rich row (`icon`, `membersOnly`, `highlight`, `tone: "gold"`).

---

## 4. Known issues and honest limits

- **All photos are placeholders.** They are small, soft crops from the design images, with baked-in text blurred out. The Men's hero is the worst (blurry patch, no clean original). Real photos are needed. The AI-generated look in the mockups is not final. The user asked me to generate images with Gemini; I cannot, so I gave a prompt for the Men's photo instead.
- **Placeholder content:** footer email, phone and all five social links are sample values from the mockup. The footer's gold "Freelancer Reference" banner (`FooterBanner.tsx`) must be changed or removed before launch. Exam badges are coloured text circles, not the real council logos.
- **Many links go to pages that do not exist:** `/join`, `/contact`, `/serve`, `/give`, `/store`, `/chapters/women`, `/chapters/youth`, `/about/founder`, and anchors like `#chapter-video`.
- **Members-only pages are only labelled.** Nothing is actually locked.
- **Dates:** Daily date and "This Week" dates are live (current date); Archive entries use fixed April 2025 sample dates from the mockup.
- **Course list** is 32 subjects from the client's guide, all marked "Coming soon". The client says not to imply every subject is available.
- **SKILL.md items not used** on purpose: GSAP, Lenis, analytics scripts, the Onest font, purple/teal colours. Not yet created: `hooks/`, `context/`, `inputField/` folders (add when needed).
- `SKILL.md` says the page `<h1>` should be a raw tag. Here `HeroHeading` renders it (the user asked for a component). Use exactly one per page.

---

## 5. How to work in this repo (practical notes)

- **Dev server:** `npm run dev` (port 3000). Check with `npx tsc --noEmit` and `npm run lint`. If TypeScript complains about missing generated route types after deleting a page, delete `.next/` and run `npx next typegen`.
- **Shell:** Windows with Git Bash. Large `node -e "…"` commands with nested quotes or `\n` often fail with "unexpected EOF". Safer: write a `.js` file with the Write tool and run it, or write component files directly with the Write tool.
- **Images:** crop from the design images with `sharp` (installed). Name new image files with a version suffix (e.g. `-v2`) when replacing them, because the browser and Next image cache the old file.
- **Visual checks:** headless Chrome works for screenshots (`chrome.exe --headless=new --screenshot=…`). For hover and clicks, drive Chrome through the DevTools protocol with `--remote-debugging-port` and a small Node script. Always check desktop (1440) and mobile (390–500) widths.
- **Don't run `taskkill /IM node.exe`**: it also stops the user's dev server.

---

## 6. Decisions waiting on the client (from `MILESTONE-1-SUMMARY.md`)

1. Are Store, Contact, FAQ, Support, legal pages, site-wide search and a full CMS part of Milestone 1? (The contract list does not include them; the later guides require them.)
2. Paystack only, or the multi-gateway setup shown on the Give page?
3. YouTube proof: screenshot upload, or WhatsApp?
4. Uniform items, sizes, prices per country (NG / JM / US); parental consent wording.
5. Official YouTube channel URL, WhatsApp link, contact email, social URLs.
6. Final header menu (the mockups differ), email provider, analytics choice.
7. Original logo (SVG / transparent) and real photos.

---

## 7. Suggested next steps

1. Build the Women's and Youth chapter pages (reuse the three shared chapter-audience components).
2. Build Serve (+ dropdown pages), Give, About / Founder / Invite Mercy.
3. **Start Milestone 1's backbone:** database schema (users, roles, members, status, orders, payments), Google sign-in, session control, Join wizard, uniform order + Paystack with verified webhooks, Member ID, Member Dashboard, admin panel. This is the larger part of the $200 milestone and nothing of it exists yet.
4. Replace placeholder photos and contact details, remove the footer reference banner.
5. Add sitemap, robots, analytics, and real access checks for member-only pages.
