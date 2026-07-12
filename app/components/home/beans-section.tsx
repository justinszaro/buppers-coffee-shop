import { Eyebrow } from "~/components/eyebrow"
import { Badge } from "~/components/badge"
import { useBeans } from "~/hooks/use-beans"

export function BeansSection() {
  const { data: beans, isLoading: loading } = useBeans({ active: true, $limit: 1 })

  const currentBean = beans?.[0]
  const notes = currentBean?.notes
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean) ?? []

  return (
    <section id="beans" className="max-w-[1160px] mx-auto px-7 pt-[76px] pb-6">
      <div className="flex justify-between items-end mb-9 flex-wrap gap-4">
        <div>
          <Eyebrow>On the bar right now</Eyebrow>
          <h2 className="font-heading font-bold text-[38px] tracking-[-0.02em] text-ink mt-3 mb-0">
            This week&apos;s bean
          </h2>
        </div>
        <p className="font-sans text-[15px] text-buppers-muted max-w-[320px]">
          We keep one single origin on the bar at a time and brew everything
          with it.
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-[22px] border border-line min-h-[360px] animate-pulse" />
      ) : currentBean ? (
        <div className="bg-white rounded-[22px] border border-line overflow-hidden grid grid-cols-[0.85fr_1.15fr] shadow-[var(--shadow-brand)]">
          {/* Bean bag placeholder */}
          <div className="bg-bean-bag flex items-center justify-center min-h-[360px]">
            <span className="font-mono text-[12px] tracking-[0.04em] bg-white/70 px-[11px] py-[5px] rounded-[6px] text-[#9c8a6f]">
              bag · {currentBean.name.toLowerCase()}
            </span>
          </div>

          {/* Bean details */}
          <div className="p-[40px_44px]">
            <div className="flex items-center gap-3 mb-[10px]">
              <h3 className="font-heading font-bold text-[32px] text-ink m-0 tracking-[-0.02em]">
                {currentBean.name}
              </h3>
              <Badge tone="amber">{currentBean.roast} roast</Badge>
            </div>

            <div className="font-sans text-[15px] text-buppers-muted mb-[18px]">
              From {currentBean.roaster}
            </div>

            {currentBean.description && (
              <p className="font-sans text-base leading-[1.65] text-ink-soft m-0 mb-[22px] max-w-[480px]">
                {currentBean.description}
              </p>
            )}

            {notes.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-[26px]">
                {notes.map((n) => (
                  <span
                    key={n}
                    className="font-sans text-[13.5px] font-medium text-teal-deep bg-teal-wash rounded-full px-[15px] py-[7px]"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      ) : null}
    </section>
  )
}
