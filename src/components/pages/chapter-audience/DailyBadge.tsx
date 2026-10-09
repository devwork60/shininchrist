interface DailyBadgeProps {
  top: string;
  bottom: string;
}

/** White "I AM ____" card used as the Daily stream mark. */
const DailyBadge = ({ top, bottom }: DailyBadgeProps) => (
  <div
    aria-label={`${top} ${bottom}`}
    className="flex h-[120px] w-[120px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white-color text-center text-[var(--accent)] shadow-md sm:h-[140px] sm:w-[140px]"
  >
    <span aria-hidden="true" className="mb-1 flex items-end gap-0.5">
      {[6, 12, 8, 14, 7].map((h, i) => (
        <span
          key={i}
          style={{ height: h }}
          className="w-[3px] rounded-full bg-[var(--accent)]/60"
        />
      ))}
    </span>
    <span
      aria-hidden="true"
      className="font-sans text-xl font-medium leading-none tracking-wide sm:text-2xl"
    >
      {top}
    </span>
    <span
      aria-hidden="true"
      className="font-sans text-3xl font-extrabold leading-none tracking-tight sm:text-4xl"
    >
      {bottom}
    </span>
  </div>
);

export default DailyBadge;
