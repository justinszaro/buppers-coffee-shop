import { Eyebrow } from "~/components/eyebrow"
import { Badge } from "~/components/badge"
import { CURRENT_BEAN } from "~/lib/menu-data"

export function BeansSection() {
  const b = CURRENT_BEAN
  return (
    <section id="beans" className="mx-auto px-7 pt-[76px] pb-6" style={{ maxWidth: 1160 }}>
      <div className="flex justify-between items-end mb-9 flex-wrap gap-4">
        <div>
          <Eyebrow>On the bar right now</Eyebrow>
          <h2 className="font-heading font-bold text-[38px] tracking-[-0.02em] text-ink mt-3 mb-0">
            This week&apos;s bean
          </h2>
        </div>
        <p className="font-sans text-[15px] text-buppers-muted max-w-[320px]">
          We keep one single origin on the bar at a time and brew everything
          with it. New bean every Tuesday.
        </p>
      </div>

      <div
        className="bg-white rounded-[22px] border border-line overflow-hidden grid"
        style={{ gridTemplateColumns: "0.85fr 1.15fr", boxShadow: "var(--shadow-brand)" }}
      >
        {/* Bean bag placeholder */}
        <div className="bg-bean-bag flex items-center justify-center min-h-[360px]">
          <span className="font-mono text-[12px] tracking-[0.04em] bg-white/70 px-[11px] py-[5px] rounded-[6px]" style={{ color: "#9c8a6f" }}>
            bag · {b.name.toLowerCase()}
          </span>
        </div>

        {/* Bean details */}
        <div className="p-[40px_44px]">
          <div className="flex items-center gap-3 mb-[10px]">
            <h3 className="font-heading font-bold text-[32px] text-ink m-0 tracking-[-0.02em]">
              {b.name}
            </h3>
            <Badge tone="amber">{b.roast} roast</Badge>
          </div>

          <div className="font-sans text-[15px] text-buppers-muted mb-[18px]">
            {b.origin} · {b.process} · {b.roastedOn}
          </div>

          <p className="font-sans text-base leading-[1.65] text-ink-soft m-0 mb-[22px] max-w-[480px]">
            {b.blurb}
          </p>

          <div className="flex gap-2 flex-wrap mb-[26px]">
            {b.notes.map((n) => (
              <span
                key={n}
                className="font-sans text-[13.5px] font-medium text-teal-deep bg-teal-wash rounded-full px-[15px] py-[7px]"
              >
                {n}
              </span>
            ))}
          </div>

          <div className="flex gap-7 flex-wrap pt-[22px] border-t border-line-soft">
            <div>
              <div className="font-sans text-[11.5px] font-bold tracking-[0.1em] uppercase text-buppers-muted mb-[7px]">
                Brewing it as
              </div>
              <div className="flex gap-[7px]">
                {b.brews.map((x) => (
                  <span
                    key={x}
                    className="font-sans text-[13px] text-ink-soft border border-line rounded-full px-3 py-[5px]"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-sans text-[11.5px] font-bold tracking-[0.1em] uppercase text-buppers-muted mb-[7px]">
                Up next
              </div>
              <div className="font-heading font-semibold text-[15px] text-ink pt-1">
                {b.nextUp}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
