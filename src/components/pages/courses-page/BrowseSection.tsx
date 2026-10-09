import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import FieldItem from "@/components/pages/academy-page/fields/FieldItem";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import { FIELDS } from "@/constant/academyData";
import { COURSES_BROWSE } from "@/constant/coursesData";
import CourseSearch from "./CourseSearch";

const BrowseSection = ({ defaultQuery = "" }: { defaultQuery?: string }) => (
  <section className="bg-cream py-10 lg:py-12">
    <div className="wrapper">
      <CourseSearch defaultValue={defaultQuery} />

      <BlockHeading className="mt-10 text-center !text-primary-green-deep">
        {COURSES_BROWSE.heading}
      </BlockHeading>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-3">
        {FIELDS.map(({ id, ...field }) => (
          <FieldItem key={id} {...field} className="mb-8" />
        ))}
      </div>

      <div id="all-courses" className="flex justify-center">
        <ButtonSm
          url={COURSES_BROWSE.cta.url}
          text={COURSES_BROWSE.cta.text}
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

export default BrowseSection;
