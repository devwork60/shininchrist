import Image from "next/image";
import CardDescSm from "@/components/pages/typography/CardDescSm";

interface UniversityCardProps {
  name: string;
  note: string;
  degree: string;
  logo: string;
}

/** Logo, name, optional note and degree. Subgrid keeps the degree on one line across cards. */
const UniversityCard = ({ name, note, degree, logo }: UniversityCardProps) => (
  <li className="row-span-3 grid grid-rows-subgrid gap-y-0 rounded-lg border border-primary-gold/40 bg-white-color px-2 py-3 text-center">
    <div className="relative mx-auto h-14 w-full">
      <Image src={logo} alt="" fill sizes="150px" className="object-contain" />
    </div>
    <div className="pt-2">
      <p className="font-heading text-sm font-semibold leading-tight text-card-heading">
        {name}
      </p>
      {note && (
        <CardDescSm className="!text-[11px] !leading-4">{note}</CardDescSm>
      )}
    </div>
    <CardDescSm className="pt-1 !text-xs italic">{degree}</CardDescSm>
  </li>
);

export default UniversityCard;
