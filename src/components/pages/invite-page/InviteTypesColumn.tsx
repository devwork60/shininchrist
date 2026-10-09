import AboutIcons from "@/components/icons/AboutIcons";
import CardHeading from "@/components/pages/typography/CardHeading";
import QuoteText from "@/components/pages/typography/QuoteText";
import { INVITE_TYPES, INVITE_VERSE } from "@/constant/inviteMercyData";

const InviteTypesColumn = () => (
  <aside className="grid content-start gap-6">
    <div className="rounded-xl border border-primary-green/10 bg-white-color/70 p-5">
      <CardHeading className="!text-primary-green">
        Types of Invitations
      </CardHeading>
      <ul className="mt-4 grid gap-3">
        {INVITE_TYPES.map(({ icon, text }) => (
          <li
            key={text}
            className="grid grid-cols-[auto_1fr] items-center gap-3"
          >
            <AboutIcons
              name={icon}
              className="h-7 w-7 text-primary-green [&>svg]:h-full [&>svg]:w-full"
            />
            <span className="text-sm leading-snug text-text-dark">{text}</span>
          </li>
        ))}
      </ul>
    </div>

    <figure className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-xl border border-primary-green/10 bg-primary-green/10 p-5">
      <AboutIcons
        name="sprout"
        className="h-10 w-10 text-primary-green [&>svg]:h-full [&>svg]:w-full"
      />
      <div>
        <QuoteText className="!text-sm !text-card-heading">
          {INVITE_VERSE.text}
        </QuoteText>
        <figcaption className="mt-2 text-center font-heading text-sm italic text-text-dark">
          {INVITE_VERSE.ref}
        </figcaption>
      </div>
    </figure>
  </aside>
);

export default InviteTypesColumn;
