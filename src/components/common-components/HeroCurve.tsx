/** Curved gold + cream divider at the bottom of a hero, traced from the approved design. */
const HeroCurve = () => (
  <>
    <svg
      aria-hidden="true"
      viewBox="0 0 1875 271"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[14.5vw] min-h-[72px] w-full"
    >
      {/* gold stripe, left: starts at the edge, curves down, tapers off */}
      <path
        d="M0 165 C90 195 200 222 350 230 L350 233 C220 235 100 222 0 200 Z"
        fill="#b07e0a"
      />
      {/* dark green band under the right gold stripe */}
      <path
        d="M720 224 C1300 175 1680 125 1875 73 L1875 271 L680 271 Z"
        className="fill-primary-green"
      />
      {/* gold stripe, right: rises towards the top-right corner */}
      <path
        d="M720 220 C1150 165 1650 115 1875 40 L1875 73 C1680 125 1300 175 720 224 Z"
        fill="#b07e0a"
      />
      {/* cream edge: down, up, small wave, down, up */}
      <path
        d="M0 200 C100 222 220 234 350 232 C600 228 800 192 1000 170 C1150 156 1300 158 1450 164 C1600 170 1750 152 1875 138 L1875 271 L0 271 Z"
        fill="#faf6ee"
      />
    </svg>
    {/* covers the sub-pixel seam between the hero and the next section */}
    <span
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-px h-[3px] bg-cream"
    />
  </>
);

export default HeroCurve;
