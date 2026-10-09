import ButtonOutline from "@/components/button/ButtonOutline";
import ButtonSm from "@/components/button/ButtonSm";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";

interface MembersGateProps {
  title: string;
  breadcrumb: { label: string; href: string }[];
  message: string;
}

/** Locked screen for public visitors: explains the access rule, reveals no entries. */
const MembersGate = ({ title, breadcrumb, message }: MembersGateProps) => (
  <section className="bg-cream py-12 lg:py-16">
    <div className="wrapper-narrow text-center">
      <div className="flex justify-center">
        <Breadcrumb items={breadcrumb} />
      </div>
      <UiIcons
        name="lock"
        className="mt-8 flex justify-center text-primary-gold [&>svg]:h-12 [&>svg]:w-12"
      />
      <MainHeading
        as="h1"
        className="mt-4 !text-primary-green lg:!leading-tight"
      >
        {title}
      </MainHeading>
      <CardDescSm className="mx-auto mt-3 max-w-md !text-base !text-text-dark">
        {message}
      </CardDescSm>
      <div className="mx-auto mt-8 grid max-w-md gap-3 sm:grid-cols-2">
        <ButtonSm
          url="/join"
          text="Join ShininChrist"
          bgColor="var(--primary-green)"
          textColor="var(--white-color)"
          shape="rounded"
        />
        <ButtonOutline
          url="/login"
          text="Member Login"
          borderColor="var(--primary-green)"
          shape="rounded"
        />
      </div>
    </div>
  </section>
);

export default MembersGate;
