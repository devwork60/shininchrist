import AboutIcons from "@/components/icons/AboutIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { FOUNDER_EDUCATION } from "@/constant/founderPageData";
import UniversityCard from "./UniversityCard";

const EducationService = () => (
  <div className="rounded-xl border border-primary-gold/20 bg-white-color/60 p-5">
    <div className="flex items-center gap-3">
      <AboutIcons
        name="graduation"
        className="h-12 w-12 shrink-0 rounded-full bg-primary-green p-3 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
      />
      <div className="flex-1">
        <h2 className="font-heading text-xl font-semibold text-primary-green">
          {FOUNDER_EDUCATION.title}
        </h2>
        <span
          aria-hidden="true"
          className="mt-1 block h-px w-3/4 bg-primary-gold"
        />
      </div>
    </div>

    <CardDescSm className="mt-4 !leading-6 !text-text-dark">
      {FOUNDER_EDUCATION.segments.map(({ text, bold }) =>
        bold ? (
          <strong key={text} className="font-semibold">
            {text}
          </strong>
        ) : (
          <span key={text}>{text}</span>
        ),
      )}
    </CardDescSm>

    <CardDescSm className="mt-3 !leading-6 !text-text-dark">
      {FOUNDER_EDUCATION.closing}
    </CardDescSm>

    <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
      {FOUNDER_EDUCATION.universities.map(({ id, ...uni }) => (
        <UniversityCard key={id} {...uni} />
      ))}
    </ul>
  </div>
);

export default EducationService;
