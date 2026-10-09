import ButtonOutline from "@/components/button/ButtonOutline";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";

interface MembersOnlyNoticeProps {
  message: string;
  cta: { text: string; url: string };
}

/** Lock message + "Join ShininChrist" button shown under member-only lists. */
const MembersOnlyNotice = ({ message, cta }: MembersOnlyNoticeProps) => (
  <div className="mt-8 flex flex-col items-center gap-4 text-center">
    <p className="flex items-center gap-3">
      <UiIcons name="lock" className="text-text-dark [&>svg]:h-6 [&>svg]:w-6" />
      <CardDescSm as="span" className="!text-text-dark">
        {message}
      </CardDescSm>
    </p>
    <ButtonOutline
      url={cta.url}
      text={cta.text}
      borderColor="var(--collection-music)"
      defaultTextColor="var(--collection-music)"
      textColor="var(--white-color)"
      shape="rounded"
      className="w-full max-w-md !py-4"
      iconRight={<UiIcons name="arrowRight" />}
    />
  </div>
);

export default MembersOnlyNotice;
