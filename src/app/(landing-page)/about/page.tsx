import { redirect } from "next/navigation";

/** There is no separate About overview in the approved designs; About opens the Founder page. */
const AboutPage = () => redirect("/about/founder");

export default AboutPage;
