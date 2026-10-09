import Image from "next/image";
import QrCode from "@/components/common-components/QrCode";
import ButtonSm from "@/components/button/ButtonSm";
import ButtonOutline from "@/components/button/ButtonOutline";
import MainHeading from "@/components/pages/typography/MainHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import Paragraph from "@/components/pages/typography/Paragraph";
import QuoteText from "@/components/pages/typography/QuoteText";
import { SERVE_CTA } from "@/constant/serveData";

const ServeCtaBanner = () => (
  <section className="bg-cream pb-10 lg:pb-14">
    <div className="wrapper grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.7fr_auto]">
      <div className="relative isolate flex min-h-[200px] flex-col justify-center overflow-hidden rounded-xl bg-[linear-gradient(90deg,#e9b970,#f6e2b6)] p-6 text-right">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 -z-10 w-[55%] [mask-image:linear-gradient(to_right,black_70%,transparent)]"
        >
          <Image
            src={SERVE_CTA.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 18vw, 55vw"
            className="object-cover object-left"
          />
        </div>
        <QuoteText className="!text-text-dark !text-xl lg:!text-2xl">
          {SERVE_CTA.scripture}
        </QuoteText>
        <p className="mt-2 text-xs font-semibold tracking-wide text-text-dark">
          {SERVE_CTA.scriptureRef}
        </p>
        <span
          aria-hidden="true"
          className="ml-auto mt-3 block h-1 w-14 bg-gold-bright"
        />
      </div>

      <div className="flex flex-col justify-center rounded-xl bg-white-color p-6 shadow-[0_2px_12px_rgba(29,61,46,0.08)]">
        <MainHeading className="!text-2xl !leading-tight !text-primary-green lg:!text-3xl lg:!leading-tight">
          {SERVE_CTA.title}
        </MainHeading>
        <Paragraph className="mt-2 lg:!text-base lg:!leading-7">
          {SERVE_CTA.description}
        </Paragraph>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-4">
          <ButtonSm
            url={SERVE_CTA.primary.url}
            text={SERVE_CTA.primary.text}
            bgColor="var(--gold-bright)"
            textColor="var(--white-color)"
            shape="rounded"
            iconRight={<span aria-hidden="true">→</span>}
          />
          <ButtonOutline
            url={SERVE_CTA.secondary.url}
            text={SERVE_CTA.secondary.text}
            borderColor="var(--primary-green)"
            shape="rounded"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:flex-col lg:justify-center lg:gap-2">
        <QrCode value={SERVE_CTA.qrUrl} label={SERVE_CTA.qrTitle} />
        <div className="lg:text-center">
          <p className="text-sm font-bold text-primary-green">
            {SERVE_CTA.qrTitle}
          </p>
          <CardDescSm>{SERVE_CTA.qrText}</CardDescSm>
        </div>
      </div>
    </div>
  </section>
);

export default ServeCtaBanner;
