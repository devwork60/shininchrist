import SearchIcon from "@/components/icons/UiIconsSearch";
import { COURSES_BROWSE } from "@/constant/coursesData";

/** GET form: submits ?q=… to the courses page. */
const CourseSearch = ({ defaultValue = "" }: { defaultValue?: string }) => (
  <form
    action="/academy/courses"
    method="get"
    role="search"
    className="relative mx-auto max-w-3xl"
  >
    <input
      type="search"
      name="q"
      defaultValue={defaultValue}
      placeholder={COURSES_BROWSE.searchPlaceholder}
      aria-label={COURSES_BROWSE.searchLabel}
      className="w-full rounded-xl border border-primary-green/20 bg-white-color px-4 py-3.5 pr-14 font-sans text-sm text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-primary-green"
    />
    <button
      type="submit"
      aria-label="Search"
      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-text-dark transition-colors hover:text-primary-green"
    >
      <SearchIcon />
    </button>
  </form>
);

export default CourseSearch;
