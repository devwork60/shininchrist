import { redirect } from "next/navigation";

/** The footer links to /give/major-assets; the real page is /give/property-assets. */
const MajorAssetsRedirect = () => redirect("/give/property-assets");

export default MajorAssetsRedirect;
