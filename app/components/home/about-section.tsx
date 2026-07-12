import { DuoMark } from "~/components/duo-mark"
import { Eyebrow } from "~/components/eyebrow"

const VALUES: [string, string][] = [
  ["Beans we trust", "We buy small lots from roasters we actually visit — one lands on the bar each week."],
  ["Made slow", "No rushed shots. We dial in every morning and weigh every pour."],
  ["Run by regulars", "Buppers works the bar, Maple runs the till. You already know them."],
]

function StoryGraphic() {
  return (
    <svg
      viewBox="0 0 480 400"
      width="100%"
      height="400"
      style={{ display: "block", borderRadius: 20, boxShadow: "0 1px 2px rgba(20,30,28,.05), 0 4px 14px rgba(20,30,28,.05)" }}
    >
      <rect width="480" height="400" rx="20" fill="#06463f" />
      <rect x="18" y="18" width="444" height="364" rx="10" fill="none" stroke="#7fb3aa" strokeWidth="1.5" strokeDasharray="2 6" />
      <g stroke="#f8f7f2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M195 90 h90 v55 a45 45 0 0 1 -90 0 Z" />
        <path d="M285 105 h20 a18 18 0 0 1 0 36 h-20" />
        <path d="M213 68 q6 -14 0 -24 M240 68 q6 -14 0 -24 M267 68 q6 -14 0 -24" />
      </g>
      <text x="240" y="280" textAnchor="middle" fontFamily="'Instrument Sans', system-ui, sans-serif" fontWeight="700" fontSize="26" fill="#f8f7f2">Basement Bar</text>
      <text x="240" y="312" textAnchor="middle" fontFamily="'Inter', system-ui, sans-serif" fontWeight="500" fontSize="14" fill="#9fc9c2">14 steps down · open daily</text>
      <foreignObject x="180" y="328" width="120" height="54">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DuoMark size={54} variant="cream" />
        </div>
      </foreignObject>
    </svg>
  )
}

export function AboutSection() {
  return (
    <section className="max-w-[1160px] mx-auto px-7 pt-[76px] pb-[84px]">
      <div className="grid grid-cols-2 gap-14 items-center">
        {/* Story infographic */}
        <div className="relative">
          <StoryGraphic />
          <div
            className="absolute bg-teal-wash rounded-[18px] p-[18px] -right-[22px] -top-[22px] shadow-[var(--shadow-brand-sm)]"
          >
            <DuoMark size={64} variant="color" />
          </div>
        </div>

        {/* Copy */}
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="font-heading font-bold text-[38px] tracking-[-0.02em] text-ink mt-3 mb-[18px]">
            A warm corner under the stairs.
          </h2>
          <p className="font-sans text-[16.5px] leading-[1.7] text-ink-soft m-0 mb-8 max-w-[480px]">
            Buppers is a coffee bar tucked down a flight of basement stairs,
            started by a pair of stuffed animals who refused to leave the
            counter. One bean on the bar, one seasonal drink, and a strict
            no-rush policy.
          </p>

          <div className="flex flex-col gap-[18px]">
            {VALUES.map(([title, desc]) => (
              <div key={title} className="flex gap-4">
                <div className="flex-none w-[10px] h-[10px] rounded-full bg-teal mt-[7px]" />
                <div>
                  <div className="font-heading font-semibold text-[17px] text-ink">{title}</div>
                  <div className="font-sans text-[14.5px] leading-[1.55] text-buppers-muted mt-0.5">
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
