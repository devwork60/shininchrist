import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import {
  TEACHERS_CTA,
  TEACHERS_INTRO,
  TEACHER_POINTS,
} from "@/constant/teachersData";
import TeacherPoint from "./TeacherPoint";

const TeachersIntroSection = () => (
  <section id="teacher-profiles" className="bg-cream py-10 lg:py-14">
    <div className="wrapper-narrow">
      <div className="text-center">
        <BlockHeading className="!text-[var(--academy-navy)]">
          {TEACHERS_INTRO.heading}
        </BlockHeading>
        <CardDescSm className="mx-auto mt-2 max-w-md !text-text-dark">
          {TEACHERS_INTRO.description}
        </CardDescSm>
      </div>

      <ul className="mx-auto mt-8 grid max-w-xl gap-6">
        {TEACHER_POINTS.map(({ id, ...point }) => (
          <TeacherPoint key={id} {...point} />
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <ButtonSm
          url={TEACHERS_CTA.url}
          text={TEACHERS_CTA.text}
          bgColor="var(--gold-bright)"
          textColor="var(--primary-green-deep)"
          shape="rounded"
          className="w-auto"
          padding="px-8 py-3"
          paddingMd="md:px-8 md:py-3"
          paddingLg="lg:px-10 lg:py-3.5"
          iconRight={<UiIcons name="arrowRight" />}
        />
      </div>
    </div>
  </section>
);

export default TeachersIntroSection;
