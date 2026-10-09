import QuoteText from "@/components/pages/typography/QuoteText";

interface QuoteBandProps {
  quote: string;
  author: string;
}

/** Full-width dark band with a centred quotation and its author. */
const QuoteBand = ({ quote, author }: QuoteBandProps) => (
  <section className="bg-[var(--academy-navy)] py-10 text-center text-white-color lg:py-12">
    <figure className="wrapper-narrow">
      <blockquote>
        <QuoteText className="lg:!text-2xl">{quote}</QuoteText>
      </blockquote>
      <figcaption className="mt-3">
        <QuoteText as="span" className="block !not-italic lg:!text-lg">
          — {author}
        </QuoteText>
      </figcaption>
    </figure>
  </section>
);

export default QuoteBand;
