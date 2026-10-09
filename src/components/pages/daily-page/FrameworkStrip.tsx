import { DAILY_FRAMEWORK } from "@/constant/dailyData";
import FrameworkStripItem from "./FrameworkStripItem";

/** "In My Heart · Home · Community · Nation" band under the Daily hero. */
const FrameworkStrip = () => (
  <section
    aria-label="ShininChrist framework"
    className="border-b border-primary-green/10 bg-[#f1f4f2]"
  >
    <ul className="wrapper grid grid-cols-2 lg:grid-cols-4">
      {DAILY_FRAMEWORK.map(({ id, ...item }, index) => (
        <FrameworkStripItem
          key={id}
          {...item}
          className={
            index === 0
              ? ""
              : index === 2
                ? "lg:border-l lg:border-primary-green/20"
                : "border-l border-primary-green/20"
          }
        />
      ))}
    </ul>
  </section>
);

export default FrameworkStrip;
