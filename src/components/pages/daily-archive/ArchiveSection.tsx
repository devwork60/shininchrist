import Breadcrumb from "@/components/common-components/Breadcrumb";
import MembersOnlyNotice from "@/components/common-components/MembersOnlyNotice";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { ARCHIVE_PAGE } from "@/constant/dailyArchiveData";
import ArchiveBrowser from "./ArchiveBrowser";

const ArchiveSection = () => (
  <section className="bg-cream py-10 lg:py-14">
    <div className="wrapper-narrow">
      <MainHeading as="h1" className="!text-primary-green">
        {ARCHIVE_PAGE.title}
      </MainHeading>
      <div className="mt-3">
        <Breadcrumb items={ARCHIVE_PAGE.breadcrumb} />
      </div>
      <CardDescSm className="mt-3 !text-text-dark">
        {ARCHIVE_PAGE.description}
      </CardDescSm>

      <div className="mt-5">
        <ArchiveBrowser />
      </div>

      <MembersOnlyNotice message={ARCHIVE_PAGE.notice} cta={ARCHIVE_PAGE.cta} />
    </div>
  </section>
);

export default ArchiveSection;
