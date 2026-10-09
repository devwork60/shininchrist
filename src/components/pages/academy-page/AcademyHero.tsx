import SimpleHero from "@/components/common-components/SimpleHero";
import { ACADEMY_HERO } from "@/constant/academyData";

const AcademyHero = () => (
  <SimpleHero
    titleLines={[ACADEMY_HERO.titleLine1, ACADEMY_HERO.titleLine2]}
    taglineLines={["Learn Today. Lead Tomorrow.", "Shine for Christ."]}
    image={ACADEMY_HERO.image}
  />
);

export default AcademyHero;
