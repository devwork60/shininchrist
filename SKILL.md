# OI-SaaS-Frontend — Architecture & Convention Reference

> Exact patterns, naming conventions, and component structures from this codebase. Use this to scaffold a new project that mirrors this one precisely.

---

## 1. Project Structure

```
OI-SaaS-Frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout: fonts, analytics, providers, Navbar
│   │   ├── globals.css                   # Tailwind v4 theme + CSS vars + utility overrides
│   │   ├── not-found.tsx
│   │   ├── robots.ts                     # MetadataRoute.Robots
│   │   ├── sitemap.ts                    # Dynamic XML sitemap
│   │   └── (landing-page)/               # Route group — all public pages, no URL segment
│   │       ├── layout.tsx                # Group metadata + LandingPageClientWrapper
│   │       ├── page.tsx                  # Home page
│   │       ├── about/page.tsx
│   │       ├── pricing/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── features/
│   │       │   ├── page.tsx              # Features hub
│   │       │   └── [feature-slug]/
│   │       │       ├── layout.tsx        # SEO metadata only — returns <>{children}</>
│   │       │       └── page.tsx          # Data-driven: imports data, assembles components
│   │       └── industries/
│   │           ├── Page.tsx              # Industries hub
│   │           └── [industry-slug]/
│   │               ├── layout.tsx        # SEO metadata only — returns <>{children}</>
│   │               └── page.tsx          # JSON-LD + component assembly
│   ├── components/
│   │   ├── button/                       # ButtonSm, ButtonLg, ButtonOutline
│   │   ├── common-components/            # HeroSection2, TrustedBySection, HeroImageSlider
│   │   ├── icons/                        # Inline SVG sets + IndustryIconRegistry.tsx
│   │   ├── inputField/                   # InputField, PhoneInputField, SelectField, TextArea
│   │   ├── models/                       # ContactModal, ModalLayout
│   │   ├── pages/
│   │   │   ├── about-us/
│   │   │   ├── contact-us/
│   │   │   ├── features-page/
│   │   │   ├── footer/
│   │   │   ├── industries-page/
│   │   │   ├── landing-page/             # All home page section components
│   │   │   ├── lenisProvider/
│   │   │   ├── navbar/
│   │   │   │   └── dropdownItems/        # Featureslist, IndustryItemslist, Companylist, ResourceItemlist
│   │   │   ├── Pricings/                 # Pricing page sub-components + local data
│   │   │   ├── search-page/
│   │   │   └── typography/               # MainHeading, SubHeading, Paragraph, CardHeading, CardDesc
│   │   ├── slider/                       # BrandsSwiper, CustomSwiper, FeaturesMainSwiper
│   │   ├── tabs/SmallTabs.tsx
│   │   ├── toolTip/Tooltip.tsx
│   │   ├── wrappers/LandingPageClientWrapper.tsx
│   │   └── ScrollToTop.tsx
│   ├── constant/
│   │   ├── subfeatures/                  # One .ts data file per feature page (16 files)
│   │   ├── subindustries/                # One .ts data file per industry page (29 files)
│   │   ├── landingPage/                  # unifiedPlatformData.ts etc.
│   │   ├── blogData/
│   │   ├── caseStudiesData/
│   │   ├── landingPageData.ts
│   │   ├── aboutData.tsx
│   │   ├── contactData.tsx
│   │   └── pricingFaqData.ts
│   ├── context/
│   │   └── ScrollLockContext.tsx
│   ├── hooks/                            # 8 custom hooks (all "use client")
│   └── utils/
│       ├── contactSchema.ts              # Zod validation schema
│       └── videoCache.ts                 # Browser-side S3 video cache
├── public/
│   └── assets/                           # Static files; one subfolder per page/industry
│       ├── industries-pages/[slug]/      # hero-banner.webp, why-chose-banner.webp
│       ├── features-page/
│       └── icons-section/
├── next.config.ts
├── tsconfig.json
└── package.json
```

### Structural Rules

- **Route group `(landing-page)`** wraps all public pages without affecting the URL. It exists solely to share the Footer layout via `LandingPageClientWrapper`.
- **Sub-route `layout.tsx` files only export `metadata`** and return `<>{children}</>`. No wrapping UI lives here.
- **`page.tsx` files contain zero business logic** — they import data constants and assemble pre-built shared components.
- **Naming:** folders → `kebab-case`, component files → `PascalCase.tsx`, data/utility files → `camelCase.ts`.
- **Path alias:** `@/*` → `./src/*` configured in `tsconfig.json`.

---

## 2. Component Size Rule

**Target: under 200 lines per file. Hard limit: 220 lines.** If a file grows past that, it must be split into smaller, single-responsibility components.

```
// BAD — one file doing everything
BigSection.tsx (400+ lines)
  → form state + animation refs + card map + testimonial + CTA

// GOOD — split by responsibility
BigSection.tsx       (~80 lines)  layout shell + imports
SectionHeader.tsx    (~40 lines)  heading + description
CardGrid.tsx         (~60 lines)  maps over cards
CardItem.tsx         (~70 lines)  single card
SectionCTA.tsx       (~50 lines)  call-to-action block
```

**When to split:**
- The component handles more than one logical responsibility
- There are multiple unrelated `useEffect` calls in the same file
- You scroll inside the file to find a specific section
- The JSX nesting is deeper than 4 levels with unrelated concerns

**Exception:** `src/components/icons/*.tsx` files are exempt. They are pure SVG data objects with no logic. Files like `posFurnitureStorePageIcons.tsx` (1316 lines) are acceptable because every line is raw SVG markup — no conditionals, no hooks, no composition.

---

## 3. Typography & Heading Hierarchy

Every text element uses one of five dedicated typography components. Raw `<h1>/<h2>/<h3>/<p>` tags are never written directly in page or section components — except for `<h1>` inside hero components (see below).

### Heading Hierarchy Table

| Semantic level | HTML tag | Component | Where it appears |
|---------------|----------|-----------|-----------------|
| Page title | `<h1>` | **Inline in hero** (no wrapper component) | Once per page, only in the hero section |
| Section heading | `<h2>` | `MainHeading` | Primary section titles below the hero |
| Section heading (lighter) | `<h2>` | `SubHeading` | Two-column feature cards, secondary sections |
| Card title | `<h3>` | `CardHeading` | Inside any repeating card pattern |
| Body text | `<p>` | `Paragraph` | Section descriptions, hero subtitles |
| Card body text | `<p>` | `CardDesc` | Card descriptions, FAQ answers |

### The h1 Rule

`<h1>` appears exactly once per page and only inside the hero component. It is written as a raw `<h1>` tag — not via `MainHeading` (which renders `<h2>`). This keeps the semantic hierarchy correct for SEO.

```tsx
// CORRECT — subIndustriesHero.tsx and HeroSection2.tsx both write h1 directly
<h1 className="text-center xl:text-[64px] lg:text-5xl md:text-[40px] text-4xl
  xl:leading-[76px] lg:leading-[60px] leading-[48px]
  font-semibold text-[#231F20] font-['Onest']
  lg:mt-[70px] xl:mb-8 lg:mb-6 mb-5">
  {title}
</h1>

// CORRECT — all sections below the hero use MainHeading (renders h2)
<MainHeading className="text-[var(--white-color)] lg:mb-10 md:mb-6 mb-5">
  {title}
</MainHeading>

// WRONG — do not put MainHeading inside a hero (creates two h2 before any h1)
// WRONG — do not use <h1> anywhere except hero components
```

### The Five Typography Components

All five follow the same pattern: `clsx` merges base classes with an optional `className` override. The `className` prop is only for spacing and color — never for overriding font-size or font-weight.

#### MainHeading — `src/components/pages/typography/MainHeading.tsx`

```tsx
import React from "react";
import clsx from "clsx";

interface MainHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const MainHeading: React.FC<MainHeadingProps> = ({ children, className }) => (
  <h2
    className={clsx(
      "font-semibold text-[var(--text-dark)] font-['Onest']",
      "xl:text-[64px] lg:text-5xl md:text-[40px] text-[32px]",
      "xl:leading-[76px] lg:leading-[60px] leading-[130%]",
      className
    )}
  >
    {children}
  </h2>
);

export default MainHeading;
```

- Size: `32px` → `40px` (md) → `48px` (lg) → `64px` (xl)
- Default color: `var(--text-dark)` = `#231F20`
- Usage: CTA banners, section intros, testimonial headings

```tsx
// Color override via className — base size and weight are preserved
<MainHeading className="text-[var(--white-color)] lg:mb-10 md:mb-6 mb-5">
  {title}
</MainHeading>
```

#### SubHeading — `src/components/pages/typography/SubHeading.tsx`

```tsx
const SubHeading: React.FC<SubHeadingProps> = ({ children, className }) => (
  <h2
    className={clsx(
      "font-semibold text-[var(--text-dark)] font-['Onest']",
      "lg:text-[48px] md:text-[32px] text-[32px]",
      "lg:leading-[60px] leading-[48px]",
      className
    )}
  >
    {children}
  </h2>
);
```

- Size: `32px` → `32px` (md) → `48px` (lg) — one step smaller than MainHeading
- Usage: two-column feature cards, blog post titles

```tsx
// IndustriesFeatureCard.tsx
<SubHeading className="mb-4 min-h-[50px]">{title}</SubHeading>
```

#### Paragraph — `src/components/pages/typography/Paragraph.tsx`

```tsx
const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => (
  <p
    className={clsx(
      "font-normal text-[var(--text-grey)] font-['Onest']",
      "lg:text-xl md:text-base text-base",
      "lg:leading-9 md:leading-6 leading-[170%]",
      className
    )}
  >
    {children}
  </p>
);
```

- Default color: `var(--text-grey)` = `#666666` — always secondary, never dark
- Size: `16px` → `20px` (lg)
- Usage: hero descriptions, section subtitles, CTA body text

```tsx
// Spacing override
<Paragraph className="mb-4 text-center mx-auto">{description}</Paragraph>

// Color override for dark CTA background
<Paragraph className="text-[var(--white-color)] mb-10 md:mb-8 lg:mb-14">
  {description}
</Paragraph>
```

#### CardHeading — `src/components/pages/typography/CardHeading.tsx`

```tsx
const CardHeading: React.FC<SubHeadingProps> = ({ children, className }) => (
  <h3
    className={clsx(
      "font-semibold text-[var(--text-dark)] font-['Onest']",
      "lg:text-2xl md:text-xl text-2xl",
      "md:leading-[130%] leading-[140%]",
      className
    )}
  >
    {children}
  </h3>
);
```

- Uses `<h3>` — semantic level below section headings
- Size: `20px` (md) → `24px` mobile/desktop
- Usage: pricing cards, feature cards, FAQ items, any repeating card

#### CardDesc — `src/components/pages/typography/CardDesc.tsx`

```tsx
const CardDesc: React.FC<SubHeadingProps> = ({ children, className }) => (
  <p
    className={clsx(
      "font-normal text-[var(--text-grey)] font-['Onest']",
      "lg:text-lg text-base",
      "lg:leading-[28px] leading-[170%]",
      className
    )}
  >
    {children}
  </p>
);
```

- Slightly smaller than `Paragraph` — `18px` desktop vs `20px`
- Usage: card body text, FAQ answers, feature bullet descriptions

### Typography Rules

- `clsx` merges base and override classes — the base font-size/weight always wins
- `className` prop is optional and only for spacing, color, and alignment
- Font is always `font-['Onest']` — never Inter for headings or body copy
- Colors are always CSS variables (`var(--text-dark)`, `var(--text-grey)`) — never hardcoded hex inside a component

---

## 4. Button Components

Three variants, all in `src/components/button/`. All use a CSS-variable trick to safely pass dynamic colors without breaking Tailwind's JIT purge.

**The color trick (used in all three):**
```tsx
// Color passed as "[#1AD1B9]" (Tailwind arbitrary syntax) or "#1AD1B9" (raw hex)
// Strip brackets if present:
const parsedBgColor = bgColor.startsWith("[") ? bgColor.slice(1, -1) : bgColor;

// Inject into inline CSS vars:
style={{ "--btn-bg": parsedBgColor } as React.CSSProperties }

// Reference in className — Tailwind sees a static string, not a dynamic value:
className="bg-[var(--btn-bg)] hover:bg-transparent hover:text-[var(--btn-bg)]"
```

### ButtonSm — `src/components/button/ButtonSm.tsx`

The primary button. Renders `<Link>` by default; if `onClick` is passed, renders `<button>`.

```tsx
interface ButtonProps {
  url?: string;
  text: string;
  bgColor: string;          // "[#1AD1B9]" or "#1AD1B9"
  textColor: string;
  isBorder?: boolean;       // 1px border matching bgColor; enables ghost-on-hover
  icon?: ReactNode;
  onClick?: () => void;     // triggers <button> render instead of <Link>
  padding?: string;         // default "px-3 py-2.5"
  paddingMd?: string;       // default "md:px-5 md:py-3"
  paddingLg?: string;       // default "lg:px-[30px] lg:py-4"
  className?: string;
  type?: "button" | "submit" | "reset";
}
```

```tsx
// Teal fill — most common CTA
<ButtonSm url="https://app.ownersinventory.com/sign-up?app=OG"
  text="Get Started for Free" bgColor="[#1AD1B9]" textColor="white" isBorder />

// Purple fill
<ButtonSm url="/contact" text="Request a Free Demo"
  bgColor="[#795CF5]" textColor="white"
  paddingLg="md:px-[38px] lg:px-[38px] lg:py-4" isBorder />

// Modal trigger — renders <button>, no url
<ButtonSm text="Book a Demo" bgColor="[#1AD1B9]" textColor="white"
  onClick={() => setOpenModal(true)} isBorder />

// Full-width on mobile
<ButtonSm url="/contact" text="Contact Sales" bgColor="[#795CF5]" textColor="white"
  className="w-full md:w-fit" isBorder />
```

### ButtonLg — `src/components/button/ButtonLg.tsx`

Larger CTA, link only. Hover is handled via `onMouseEnter`/`onMouseLeave` (not Tailwind `hover:`) because hover color is dynamic.

```tsx
interface ButtonLgProps {
  text: string;
  bgColor: string;
  url: string;
  textColor?: string;       // default "white"
  isBorder?: boolean;
  hoverBgColor?: string;    // custom hover fill
  className?: string;
}
```

```tsx
// Two adjacent buttons — fill + ghost pattern
<ButtonLg text="Start for Free" bgColor="[#1AD1B9]"
  url="https://app.ownersinventory.com/sign-up?app=OG" />
<ButtonLg text="Contact Sales" bgColor="transparent" textColor="[#795CF5]"
  isBorder hoverBgColor="[#795CF5]" url="/contact" />
```

### ButtonOutline — `src/components/button/ButtonOutline.tsx`

Ghost button only. Always transparent background; fills with `borderColor` on hover.

```tsx
interface ButtonOutlineProps {
  text: string;
  borderColor: string;   // border color AND default text color
  url: string;
  textColor?: string;    // hover text color (default "white")
}
```

```tsx
<ButtonOutline text="Learn More" borderColor="[#795CF5]" url="/features" />
```

### Which Button to Use

| Situation | Button |
|-----------|--------|
| Primary CTA, needs `onClick` | `ButtonSm` |
| Primary CTA, link only, custom hover | `ButtonLg` |
| Secondary / ghost CTA, link only | `ButtonOutline` |
| Full-width on mobile | `ButtonSm` + `className="w-full md:w-fit"` |
| Form submit inside modal | Raw `<button>` with inline Tailwind |

---

## 5. Input Field Components

All form fields live in `src/components/inputField/`. Every component follows the same three-part structure:

1. **Label row** — `<p>` tag with optional red `*` for required fields
2. **Input element** — `register` spread from `react-hook-form`
3. **Error message** — red `<p>` rendered only when an `error` string is present

Shared visual constants across all fields:
- Default border: `border-[#D9D9D9]`
- Focus border: `border-[#795CF5]` (brand purple)
- Error border: `border-red-500`
- Border radius: `rounded-[14px]`
- Placeholder color: `#9A9A9A`
- Font: `font-['Onest']`

### InputField — `src/components/inputField/InputField.tsx`

```tsx
interface InputFieldProps {
  placeHolder?: string;
  type?: string;                    // "text" | "email" | "password" | "number" etc.
  label?: string;
  readOnly?: boolean;
  register?: UseFormRegisterReturn; // spread directly onto <input>
  error?: string;                   // from formState.errors.field?.message
  required?: boolean;               // shows red asterisk in label
  variant?: "default" | "signup";   // "signup" hides the asterisk
}
```

- `type="password"` automatically renders an eye-toggle icon (`HiOutlineEye`/`HiOutlineEyeOff`)
- Spinner arrows hidden for number inputs via `[&::-webkit-inner-spin-button]:appearance-none`

```tsx
<InputField label="Full Name" placeHolder="Enter Your Name"
  required register={register("name")} error={errors.name?.message} />

<InputField label="Company Email" type="email" placeHolder="Enter Your Company Email"
  required register={register("email")} error={errors.email?.message} />
```

### PhoneInputField — `src/components/inputField/PhoneInputField.tsx`

```tsx
interface PhoneInputFieldProps {
  label?: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;  // controlled — NOT UseFormRegisterReturn
  placeHolder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}
```

Wraps `react-phone-number-input` with a custom `CustomCountrySelect.tsx`. Because the library uses a controlled `value`/`onChange` API instead of a ref, it **must** be wired via `<Controller>` — never `register()`.

```tsx
<Controller
  name="phone"
  control={control}
  render={({ field }) => (
    <PhoneInputField
      label="Phone Number" placeHolder="Enter Your Phone Number" required
      value={field.value}
      onChange={(val) => field.onChange(val ?? "")}
      error={errors.phone?.message}
    />
  )}
/>
```

### SelectField — `src/components/inputField/SelectField.tsx`

```tsx
interface SelectFieldProps {
  label?: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;          // renders as a disabled first option
  register?: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  variant?: "default" | "signup";
  value?: string | number;       // for controlled use via <Controller>
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
```

- Native `<select>` arrow hidden via `appearance-none`; custom `HiChevronDown` icon positioned absolutely
- Placeholder shown in grey (`#9A9A9A`); selected value in dark (`#231F20`)

```tsx
<Controller
  name="companySize"
  control={control}
  render={({ field }) => (
    <SelectField
      label="Company Size" placeholder="Select Your Company Size" required
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      options={[
        { label: "Less than 5 employees", value: "Less than 5 employees" },
        { label: "5-20 employees", value: "5-20 employees" },
        { label: "50-250 employees", value: "50-250 employees" },
      ]}
      error={errors.companySize?.message}
    />
  )}
/>
```

### TextArea — `src/components/inputField/TextArea.tsx`

```tsx
interface TextAreaProps {
  placeHolder?: string;
  label?: string;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  rows?: number;   // default 4
}
```

- `resize-none` — users cannot resize; `rows` prop controls height
- Identical styling to `InputField`

```tsx
<TextArea label="Message" placeHolder="How can we assist you today?"
  required rows={4} register={register("message")} error={errors.message?.message} />
```

### Full Form Composition (ContactModal)

```tsx
// src/components/models/ContactModal.tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <div className="grid md:grid-cols-2 gap-x-4 gap-y-4">
    <InputField label="Full Name" placeHolder="Enter Your Name" required
      register={register("name")} error={errors.name?.message} />
    <Controller name="phone" control={control} render={({ field }) => (
      <PhoneInputField label="Phone Number" value={field.value}
        onChange={(val) => field.onChange(val ?? "")} error={errors.phone?.message} />
    )} />
  </div>
  <div className="grid md:grid-cols-2 gap-x-4 gap-y-4 mt-4">
    <InputField label="Company Email" type="email" required
      register={register("email")} error={errors.email?.message} />
    <InputField label="Company Name" required
      register={register("company")} error={errors.company?.message} />
  </div>
  <div className="grid md:grid-cols-2 gap-x-4 gap-y-4 mt-4">
    <Controller name="companySize" control={control} render={({ field }) => (
      <SelectField label="Company Size" placeholder="Select Your Company Size" required
        value={field.value} onChange={(e) => field.onChange(e.target.value)}
        options={companySizeOptions} error={errors.companySize?.message} />
    )} />
    <InputField label="Subject" placeHolder="Enter the Subject" required
      register={register("subject")} error={errors.subject?.message} />
  </div>
  <div className="mt-4">
    <TextArea label="Message" placeHolder="How can we assist you today?"
      required rows={4} register={register("message")} error={errors.message?.message} />
  </div>
  <button type="submit" className="w-full bg-[var(--primary-purple)] ...">
    Send a request
  </button>
</form>
```

---

## 6. SVG Icons — Inline Code Pattern

All custom icons are written as **inline SVG JSX** inside `src/components/icons/`. This gives full control over gradients and colors with no extra file request.

### Icon File Structure

Each industry has one icon file. It exports a single component that takes a `name` key and returns the matching SVG from an object map.

```tsx
// src/components/icons/posThriftStorePageIcons.tsx
import React from "react";

interface IconProps {
  name: keyof typeof icons;
  className?: string;
}

const icons = {
  workflowIcon1: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gradient ring border */}
      <rect x="2.265" y="2.265" width="75.47" height="75.47" rx="37.735"
        stroke="url(#paint0_linear)" strokeWidth="4.53" />
      {/* White inner circle */}
      <rect x="7.059" y="7.059" width="65.882" height="65.882" rx="32.941" fill="white" />
      {/* Icon path — brand purple fill */}
      <path d="M45.15..." fill="#795CF5" />
      <defs>
        <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06919D" />
          <stop offset="0.541667" stopColor="#B28CFF" />
          <stop offset="1" stopColor="#1CEADD" />
        </linearGradient>
      </defs>
    </svg>
  ),
  UnifiedIcon1: ( <svg>...</svg> ),
  whychoseIcon1: ( <svg>...</svg> ),
  // ... all icons for this industry
};

const ThriftStorePosIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default ThriftStorePosIcons;
```

### Standard SVG Design Pattern

Every icon in this project follows the same structure:

| Layer | Element | Value |
|-------|---------|-------|
| Outer ring | `<rect stroke="url(#gradient)">` | 80×80, `rx="37.735"` (circle) |
| Inner background | `<rect fill="white">` | 65.88×65.88, `rx="32.941"` |
| Icon path | `<path fill="#795CF5">` | Brand purple, or gradient for decorative |
| Gradient | `linearGradient` | `#06919D` → `#B28CFF` → `#1CEADD` |

### Icon Key Naming Convention

- Workflow steps: `workflowIcon1`, `workflowIcon2`, ...
- Unified platform cards: `UnifiedIcon1` – `UnifiedIcon6`
- Why-choose cards: `whychoseIcon1` – `whychoseIcon6`
- Testimonial profiles: `testimonialIcon1`, `testimonialIcon2`

### Data → Registry → Component Flow

```
Step 1 — Data file stores icon as a string key:
  // src/constant/subindustries/thriftStorePosData.ts
  export const THRIFT_STORE_UNIFIED_CARDS: UnifiedPlatformCard[] = [
    { id: "1", icon: "UnifiedIcon1", title: "...", description: "..." },
  ];

Step 2 — Registry maps industry name → icon component:
  // src/components/icons/IndustryIconRegistry.tsx
  import ThriftStorePosIcons from "./posThriftStorePageIcons";
  const registry = {
    thriftStore: ThriftStorePosIcons,
    bakery: BakeryPosIcons,
    // ...
  };

Step 3 — Page passes iconSet to shared section component:
  <IndustryUnifiedPlatform cards={THRIFT_STORE_UNIFIED_CARDS} iconSet="thriftStore" />

Step 4 — Shared component resolves and renders:
  const IconComponent = registry[iconSet];
  <IconComponent name={card.icon} />   // → renders UnifiedIcon1 SVG
```

### When to Use Inline SVG vs next/image vs Library Icons

| Asset | Approach |
|-------|----------|
| Custom brand icons (workflow, unified platform, why-choose) | Inline SVG JSX in `src/components/icons/` |
| Simple decorative toggles (plus, minus, arrow) | `next/image` from `/public/assets/*.svg` |
| Hero banners, product screenshots, section backgrounds | `next/image` with `.webp` format |
| Generic UI icons (search, close, eye, chevron) | `lucide-react` or `react-icons` imports |

```tsx
// Inline SVG — brand gradient arrow icon used in feature lists
<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M4.674 11.999..." />
  <defs>
    <linearGradient id="arrow-gradient">
      <stop stopColor="#1AD1B9" />
      <stop offset="0.293" stopColor="#38ACCC" />
      <stop offset="0.649" stopColor="#5588DF" />
      <stop offset="1" stopColor="#795CF5" />
    </linearGradient>
  </defs>
</svg>

// next/image — simple static icon from public/
<Image src="/assets/plus-icon.svg" alt="" width={18} height={18} loading="lazy" />

// react-icons — generic UI chrome
import { HiChevronDown } from "react-icons/hi";
<HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
```

---

## 7. Data-Driven Pages

Industry and feature pages contain zero logic. All content comes from one data file per page.

```ts
// src/constant/subindustries/thriftStorePosData.ts
import { UnifiedPlatformCard } from "@/components/pages/landing-page/UnifiedPlatform";

// Exports follow SCREAMING_SNAKE_CASE prefixed with the page name
export const THRIFT_STORE_UNIFIED_HEADING = "Challenges Faced by Today's Thrift Stores";
export const THRIFT_STORE_UNIFIED_PARAGRAPH = "...";

export const THRIFT_STORE_UNIFIED_CARDS: UnifiedPlatformCard[] = [
  { id: "1", icon: "UnifiedIcon1", title: "Constantly Changing Inventory", description: "..." },
];

export const THRIFT_STORE_FAQS = [
  { question: "Can I track donated inventory?", answer: "..." },
];
// Also exports: WHY_CHOOSE_CARDS, KEY_FEATURES_CARDS, WORKFLOW_DATA,
//               TESTIMONIALS, TESTIMONIAL_DATA, TOOLS_DATA
```

```tsx
// src/app/(landing-page)/industries/thrift-store-pos-system/page.tsx
// The page does nothing but import data and compose components
import heroBanner from "../../../../../public/assets/industries-pages/thrift-store-pos/hero-banner.webp";
import {
  THRIFT_STORE_UNIFIED_CARDS, THRIFT_STORE_WHY_CHOOSE_CARDS,
  THRIFT_STORE_FAQS, // ...
} from "@/constant/subindustries/thriftStorePosData";

const Page = () => (
  <>
    <Script id="schema-thrift-store" type="application/ld+json" strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [...] }) }}
    />
    <SubIndustriesHero title="..." description="..." image={heroBanner} variant="animation2" />
    <IndustryUnifiedPlatform cards={THRIFT_STORE_UNIFIED_CARDS} iconSet="thriftStore" />
    <WhyChoosePOS cards={THRIFT_STORE_WHY_CHOOSE_CARDS} mainImage={whyChoseBanner} iconSet="thriftStore" />
    <FaqSection faqs={THRIFT_STORE_FAQS} />
  </>
);
export default Page;
```

---

## 8. Shared Hero Components

All 29 industry pages share `SubIndustriesHero`. All 16 feature pages share `SubFeaturesHero`. Variation is through props, not new components.

```tsx
// src/components/pages/industries-page/subIndustriesHero.tsx
interface SubIndustriesHeroProps {
  title?: string;
  description?: string;
  image?: StaticImageData;
  ctaDesc?: string;
  variant?: "animation1" | "animation2" | "none";
  imageClassName?: string;
}
```

Key implementation details:
- Calls `useHeaderAnimation()` and `useHeroAnimations(variant)` internally — the page never manages this
- Initial state: `style={{ clipPath: "inset(0% 0% 100% 0%)" }}`, animated to `inset(0% 0% 0% 0%)` via GSAP timeline
- The `<h1>` tag is written directly inside with the full Tailwind class string
- Safety fallback: `setTimeout` at 2500ms forces the element visible if GSAP fails
- Exported as `React.memo(SubIndustriesHero)`

---

## 9. Dynamic Imports (Below-fold Optimization)

```tsx
// src/app/(landing-page)/page.tsx
// Above fold — static imports, in the initial bundle
import HeroSection2 from "@/components/common-components/HeroSection2";
import TrustedBySection from "@/components/common-components/TrustedBySection";

// Below fold — separate JS chunks, load after hero is interactive
const TurningChaos = dynamic(() => import("@/components/pages/landing-page/TurningChaos"));
const FeaturesTabSection = dynamic(() => import("@/components/pages/landing-page/FeaturesTabSection"));
const SmartWaytoSyncndSellSection = dynamic(() => import("@/components/pages/landing-page/SmartWaytoSyncndSellSection"));
// ...

// Browser-only libs: ssr: false
const ContactModal = dynamic(() => import("@/components/models/ContactModal"), { ssr: false });
```

**Rule:** the first two visible sections are static imports. Everything below the fold is `dynamic()`. SSR is kept by default for SEO. Only set `ssr: false` for browser-only libraries (Leaflet, Lenis, ContactModal).

---

## 10. Styling Conventions

### Tailwind v4 + CSS Variables

```css
/* src/app/globals.css */
@import "tailwindcss";  /* v4 syntax — no @tailwind directives */

@theme {
  --breakpoint-3xl: 1500px;
  --color-primary-purple: #795CF5;
  --color-primary-teal: #1AD1B9;
  --color-primary-blue: #5588DF;
}

:root {
  /* Text */
  --text-dark: #231F20;
  --text-grey: #666666;

  /* Brand */
  --primary-purple: #795CF5;
  --primary-teal: #1AD1B9;
  --primary-blue: #5588DF;

  /* Backgrounds */
  --background-halfwhite: #F3F4F6;
  --white-color: #FFFFFF;
}
```

Colors are defined twice:
- `@theme` tokens → for Tailwind utilities like `text-primary-purple`
- `:root` CSS vars → for `style` props and component-level CSS references

### Responsive Breakpoints

| Name | Width | Tailwind prefix |
|------|-------|----------------|
| Mobile | < 768px | (default) |
| Tablet | 768–1023px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| XL | ≥ 1280px | `xl:` |
| 3XL (custom) | ≥ 1500px | `3xl:` |

**Always mobile-first.** `lg:hidden` and `hidden lg:flex` are the primary responsive switching pattern.

### No CSS Modules

All styling is Tailwind utility classes. The only `.css` files are:
- `globals.css` — site-wide theme
- `PhoneInputField.css` — vendor library style override
- `featureslder.css` — Swiper pagination override

---

## 11. State Management

No Redux, no Zustand. State is local (`useState`) unless it must cross component boundaries, in which case React Context is used.

The one context in the project:

```tsx
// src/context/ScrollLockContext.tsx
"use client";

interface ScrollLockContextType {
  lock: () => void;
  unlock: () => void;
  isLocked: boolean;
}

// Counter-based (not boolean) so multiple concurrent callers don't race each other
const ScrollLockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lockCount, setLockCount] = useState(0);
  const lock = useCallback(() => setLockCount(prev => prev + 1), []);
  const unlock = useCallback(() => setLockCount(prev => Math.max(0, prev - 1)), []);
  const isLocked = lockCount > 0;
  return (
    <ScrollLockContext.Provider value={{ lock, unlock, isLocked }}>
      {children}
    </ScrollLockContext.Provider>
  );
};

// Convenience hook — auto-locks on mount, auto-unlocks on unmount
export const useScrollLockEffect = (isOpen: boolean) => {
  const { lock, unlock } = useScrollLock();
  useEffect(() => {
    if (isOpen) { lock(); return () => unlock(); }
  }, [isOpen, lock, unlock]);
};
```

Used by: `ModalLayout`, `MobileMenu`, `NavDropdown`, `LenisProvider`.

---

## 12. Custom Hooks

All hooks live in `src/hooks/`. All require `"use client"`.

| Hook | Purpose |
|------|---------|
| `useDevice` | Returns `isMobile/isTablet/isDesktop/isMounted` based on `window.innerWidth` with resize listener |
| `useHeaderAnimation` | GSAP timeline that reveals navbar elements on page load |
| `useHeroAnimations` | GSAP ScrollTrigger pin/scrub for hero parallax; `variant: "animation1" \| "animation2"` |
| `useSafariDetector` | Detects Safari/iPadOS → returns `shouldShowImage` flag for video→image fallback |
| `useScrollLockEffect` | Wraps `ScrollLockContext.lock/unlock` into a mount/unmount effect |
| `useSearchAnimation` | Search bar open/close GSAP animation |
| `useTrollyAnimation` | Frame-by-frame SVG trolley animation on home page |
| `useVideoCache` | React hook wrapper for `src/utils/videoCache.ts` |

```tsx
// src/hooks/useDevice.ts — standard pattern for all device-detection hooks
"use client";
import { useState, useEffect } from "react";

export function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
      setIsDesktop(w >= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return { isMobile, isTablet, isDesktop, isMounted };
}
```

```tsx
// src/hooks/useHeaderAnimation.tsx — GSAP reveal pattern
"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHeaderAnimation() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: "power1.inOut" } });
      if (window.innerWidth >= 1024) {
        tl.to(".inventory-menu, .header-left-col, .header-right-col", { y: 0, opacity: 1 }, 0);
      } else {
        tl.delay(1).to(".mobile-iventory, .header-left-col", { y: 0, opacity: 1 }, 0);
      }
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });
    return () => ctx.revert();
  }, []);
}
```

---

## 13. Header Reveal System

Every navbar element starts hidden via inline style to prevent a flash before the hero animation fires.

```tsx
// Logo.tsx — starts hidden; class is the GSAP selector target
<div className="header-left-col" style={{ opacity: 0, transform: "translateY(-150px)" }}>
  <Image src={logo} alt="Owners Inventory" />
</div>
```

**Pages WITH a hero** → hero component calls `useHeaderAnimation()` → GSAP animates elements in.  
**Pages WITHOUT a hero** (pricing, search, resources) → `Navbar.tsx` `useEffect` fallback sets all `.header-*` elements to `{ opacity: 1, transform: "none" }` immediately.

CSS class → GSAP target mapping:
- `.header-left-col` → Logo
- `.header-right-col` → RightIcons (desktop nav)
- `.inventory-menu` → NavItems (desktop nav)
- `.mobile-iventory` → Mobileicons (hamburger)

---

## 14. Routing & Layouts

### Nesting Chain

```
src/app/layout.tsx
  → fonts, analytics scripts (lazyOnload), ScrollLockProvider, LenisProvider, Navbar, ToastContainer
  └── src/app/(landing-page)/layout.tsx
        → group metadata + LandingPageClientWrapper (injects Footer, manages pathname key)
        └── src/app/(landing-page)/industries/[slug]/layout.tsx
              → metadata export only; returns <>{children}</>
              └── src/app/(landing-page)/industries/[slug]/page.tsx
                    → JSON-LD Script + section components
```

### LandingPageClientWrapper

```tsx
// src/components/wrappers/LandingPageClientWrapper.tsx
"use client";
export default function LandingPageClientWrapper({ children }) {
  const pathname = usePathname();
  const isCaseStudyDetail =
    pathname.includes("/case-studies/") && pathname.split("/").length > 2;
  return (
    <>
      <div key={pathname}>{children}</div>  {/* key forces remount on route change */}
      {!isCaseStudyDetail && <Footer />}
    </>
  );
}
```

### Per-Page Layout Template

```tsx
// src/app/(landing-page)/industries/thrift-store-pos-system/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thrift Store POS System | Owners Inventory",
  description: "Specialized thrift store POS system...",
  keywords: ["POS system for thrift stores", "thrift store inventory management"],
  alternates: { canonical: "https://ownersinventory.com/industries/thrift-store-pos-system" },
};

export default function ThriftStoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

---

## 15. SEO Setup

### JSON-LD Schema

Every industry page inlines structured data using `next/script` with `strategy="afterInteractive"`:

```tsx
<Script
  id="schema-thrift-store"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "SoftwareApplication", name: "Owners Inventory", ... },
        { "@type": "WebPage",
          "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ownersinventory.com" },
            { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://ownersinventory.com/industries" },
            { "@type": "ListItem", "position": 3, "name": "Thrift Store POS System", "item": "..." },
          ]},
        },
        { "@type": "Organization", ... },
        { "@type": "FAQPage", "mainEntity": [ { "@type": "Question", ... } ] },
      ]
    })
  }}
/>
```

**Standard `@graph` types per page:** `SoftwareApplication`, `WebPage` (with `BreadcrumbList`), `Organization`, `FAQPage`.

### Sitemap

```ts
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ownersinventory.com";
  return [
    ...mainRoutes.map(r => ({
      url: `${baseUrl}${r}`, lastModified: new Date(),
      changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.8,
    })),
    ...industries.map(i => ({
      url: `${baseUrl}/industries/${i}`, lastModified: new Date(),
      changeFrequency: "monthly" as const, priority: 0.8,
    })),
  ];
}
```

---

## 16. Form Handling

```ts
// src/utils/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name:        z.string().min(2).max(50),
  phone:       z.string().regex(/^\+?[0-9]{8,15}$/),
  email:       z.string().email(),
  company:     z.string().min(2).max(50),
  companySize: z.string().min(2).max(50),
  subject:     z.string().min(2).max(100),
  message:     z.string().min(2),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

```tsx
// ContactModal.tsx — wiring pattern
const { register, handleSubmit, control, reset, formState: { errors } } =
  useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

const onSubmit = async (data: ContactFormData) => {
  if (!recaptchaToken) { toast.error("Complete the reCAPTCHA."); return; }
  setIsLoading(true);
  try {
    const res = await fetch("https://osbackend.ownersjungle.com/api/v1/oi/saas-leads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json())?.message ?? "Error");
    toast.success("Request sent!");
    reset();
    onClose();
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to send.");
  } finally {
    setIsLoading(false);
  }
};
```

---

## 17. Smooth Scroll (Lenis)

```tsx
// src/components/pages/lenisProvider/LenixProvider.tsx
"use client";
export default function LenisProvider({ children }: { children: ReactNode }) {
  const { isLocked } = useScrollLock();

  useEffect(() => {
    if (isLocked) return; // destroy Lenis when modal/drawer is open

    let destroyed = false;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => { destroyed = true; };
  }, [isLocked]);

  return <>{children}</>;
}
```

When a modal opens → `ScrollLockContext.lock()` → `isLocked` becomes `true` → `LenisProvider` destroys Lenis → native scroll takes over inside the modal.

---

## 18. next.config.ts

```ts
const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion", "gsap", "lucide-react", "react-icons", "@heroicons/react",
      // swiper intentionally excluded — its CSS side-effects break Turbopack HMR
    ],
  },
  turbopack: {},  // required in Next.js 16 to silence warning
  async headers() {
    return [
      { source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/features/old-name", destination: "/features/new-name", permanent: true },
    ];
  },
  async rewrites() {
    // Proxy S3 videos to avoid CORS and apply consistent cache headers
    return [
      { source: "/videos-s3/:path*",
        destination: "https://your-bucket.s3.amazonaws.com/videos/:path*" },
    ];
  },
};
```

---

## 19. Analytics (Root Layout)

All analytics fire with `strategy="lazyOnload"` — after the page is interactive, so they never block LCP.

```tsx
// src/app/layout.tsx <head>
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://connect.facebook.net" />
<link rel="dns-prefetch" href="https://www.clarity.ms" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

<Script id="gtm"      strategy="lazyOnload">{ /* GTM snippet */ }</Script>
<Script id="fb-pixel" strategy="lazyOnload">{ /* FB Pixel snippet */ }</Script>
<Script id="clarity"  strategy="lazyOnload">{ /* MS Clarity snippet */ }</Script>
```

---

## 20. Add a New Industry Page — Checklist

```
1. Data file     src/constant/subindustries/[camelCaseName]Data.ts
                 Exports: UNIFIED_HEADING, UNIFIED_PARAGRAPH, UNIFIED_CARDS,
                          WHY_CHOOSE_CARDS, KEY_FEATURES_CARDS, WORKFLOW_DATA,
                          FAQS, TESTIMONIALS, TESTIMONIAL_DATA, TOOLS_DATA
                 Icon keys: "UnifiedIcon1"–"6", "whychoseIcon1"–"6"

2. Icon file     src/components/icons/pos[Name]PageIcons.tsx
                 One inline SVG per icon key, 80×80 viewBox, gradient ring pattern

3. Registry      src/components/icons/IndustryIconRegistry.tsx
                 Import new file, add entry to registry object

4. Route files   src/app/(landing-page)/industries/[slug]/
                   layout.tsx  →  metadata (title, description, keywords, canonical)
                   page.tsx    →  JSON-LD <Script> + section components with data props

5. Assets        public/assets/industries-pages/[slug]/
                   hero-banner.webp, why-chose-banner.webp

6. Sitemap       src/app/sitemap.ts  →  add slug to industries array

7. Navbar        src/components/pages/navbar/dropdownItems/IndustryItemslist.tsx
                   add item with name, href, category
```

---

## 21. New Project Scaffold Checklist

### Install

```bash
npx create-next-app@latest my-app --typescript --tailwind --app --turbopack
cd my-app

npm i gsap @studio-freight/lenis framer-motion
npm i react-hook-form @hookform/resolvers zod
npm i clsx react-toastify lucide-react
npm i swiper react-phone-number-input          # optional
```

### Directory

```
src/
├── app/
│   ├── layout.tsx           ← fonts + analytics + providers pattern
│   ├── globals.css          ← @import tailwindcss, @theme, :root color palette
│   ├── robots.ts
│   ├── sitemap.ts
│   └── (main)/
│       └── layout.tsx       ← group metadata + ClientWrapper
├── components/
│   ├── button/              ← ButtonSm, ButtonLg, ButtonOutline
│   ├── inputField/          ← InputField, PhoneInputField, SelectField, TextArea
│   ├── icons/               ← IndustryIconRegistry + per-page SVG sets
│   ├── pages/
│   │   ├── typography/      ← MainHeading, SubHeading, Paragraph, CardHeading, CardDesc
│   │   ├── navbar/
│   │   └── footer/
│   └── wrappers/            ← ClientWrapper (Footer + pathname key)
├── constant/                ← all page text content lives here
├── context/ScrollLockContext.tsx
├── hooks/useDevice.ts
└── utils/contactSchema.ts
```

### Setup Steps

- [ ] Copy `ScrollLockContext.tsx` → wire as `<ScrollLockProvider>` in root layout
- [ ] Copy `LenixProvider.tsx` → nest inside `<ScrollLockProvider>`
- [ ] Create `ButtonSm.tsx` with the CSS-variable color trick
- [ ] Create all five typography components: `MainHeading`, `SubHeading`, `Paragraph`, `CardHeading`, `CardDesc`
- [ ] Create all four input field components: `InputField`, `PhoneInputField`, `SelectField`, `TextArea`
- [ ] Write `globals.css` with `@theme` breakpoints and `:root` color palette
- [ ] Set `"@/*": ["./src/*"]` in `tsconfig.json` paths
- [ ] Configure `next.config.ts`: AVIF+WebP images, 1-year cache headers, `optimizePackageImports`
- [ ] Add DNS prefetch + preconnect in root layout `<head>`
- [ ] Add all analytics scripts with `strategy="lazyOnload"`

### Per-Page Template

```tsx
// [slug]/layout.tsx — SEO only
export const metadata: Metadata = {
  title: "Page Title | Brand Name",
  description: "...",
  keywords: ["keyword1", "keyword2"],
  alternates: { canonical: "https://yourdomain.com/slug" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// [slug]/page.tsx — assembly only
import heroBanner from "../../../../public/assets/[section]/hero-banner.webp";
import { PAGE_FAQS, PAGE_CARDS } from "@/constant/[name]Data";
import SharedHero from "@/components/pages/.../SharedHero";
import FaqSection from "@/components/pages/landing-page/FAQSection";

const Page = () => (
  <>
    <Script id="schema-[slug]" type="application/ld+json" strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [...] }) }}
    />
    <SharedHero title="..." image={heroBanner} variant="animation2" />
    <FaqSection faqs={PAGE_FAQS} />
  </>
);
export default Page;
```

### Performance Checklist

- [ ] First 1–2 visible sections: static `import`
- [ ] Everything below fold: `dynamic(() => import(...))`
- [ ] Browser-only libs (Lenis, Leaflet, modals): `dynamic(..., { ssr: false })`
- [ ] All analytics: `strategy="lazyOnload"`
- [ ] DNS prefetch + preconnect for every third-party origin
- [ ] LCP image: `<Image priority>` with explicit `sizes` attribute
- [ ] All images: `.webp` or `.avif` format
- [ ] Videos: serve via `/videos-s3/` rewrite, `max-age=31536000`
- [ ] Safari video fallback: `useSafariDetector` → render `<Image>` instead of `<video>`
- [ ] Component files: stay under 220 lines; split if exceeded
