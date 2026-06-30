import { DuoMark } from "~/components/duo-mark"
import { Eyebrow } from "~/components/eyebrow"

const VALUES: [string, string][] = [
  ["Beans we trust", "We buy small lots from roasters we actually visit — one lands on the bar each week."],
  ["Made slow", "No rushed shots. We dial in every morning and weigh every pour."],
  ["Run by regulars", "Buppers works the bar, Maple runs the till. You already know them."],
]

export function AboutSection() {
  return (
    <section className="max-w-[1160px] mx-auto px-7 pt-[76px] pb-[84px]">
      <div className="grid grid-cols-2 gap-14 items-center">
        {/* Photo */}
        <div className="relative">
          <img
            src="/img-stairs.jpg"
            alt="Down the basement stairs"
            className="w-full object-cover rounded-[20px] block h-[400px] shadow-[var(--shadow-brand-sm)]"
          />
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
