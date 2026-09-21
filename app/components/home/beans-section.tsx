import { useState } from "react"
import { Eyebrow } from "~/components/eyebrow"
import { Badge } from "~/components/ui/badge"
import { useBeans } from "~/hooks/use-beans"

function BeanPhoto({ bean }: { bean: any }) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src={`https://storage.googleapis.com/justinszarodotcom-public/${bean.beanId}.jpeg`}
        alt={bean.name}
        className="w-full h-full object-cover min-h-[360px]"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div className="bg-bean-bag flex items-center justify-center min-h-[360px]">
      <span className="font-mono text-[12px] tracking-[0.04em] bg-white/70 px-[11px] py-[5px] rounded-[6px] text-[#9c8a6f]">
        bag · {bean.name.toLowerCase()}
      </span>
    </div>
  )
}

export function BeansSection() {
  const { data: beans, isLoading: loading } = useBeans({ active: true, $limit: 1 })

  const currentBean = beans?.[0]
  const notes = currentBean?.notes
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean) ?? []

  return (
    <section id="beans" className="max-w-[1160px] mx-auto px-7 pt-[76px] pb-6 max-[520px]:px-[18px]">
      <div className="flex justify-between items-end mb-9 flex-wrap gap-4 max-[640px]:flex-col max-[640px]:items-start">
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
        <div className="bg-white rounded-[22px] border border-line overflow-hidden grid grid-cols-[0.85fr_1.15fr] shadow-[var(--shadow-brand)] max-[860px]:grid-cols-1">
          <BeanPhoto bean={currentBean} />

          {/* Bean details */}
          <div className="p-[40px_44px] max-[520px]:p-[28px_24px]">
            <div className="flex items-center gap-3 mb-[10px]">
              <h3 className="font-heading font-bold text-[32px] text-ink m-0 tracking-[-0.02em]">
                {currentBean.name}
              </h3>
              <Badge className="h-auto font-semibold text-[11.5px] tracking-[0.06em] uppercase rounded-full px-[10px] py-[4px] whitespace-nowrap bg-[#f7eddc] text-[#8a5a1e] border-transparent">{currentBean.roast} roast</Badge>
            </div>

            <div className="font-sans text-[15px] text-buppers-muted mb-[18px]">
              From {currentBean.roaster}
            </div>

            {currentBean.description ? (
              <p className="font-sans text-base leading-[1.65] text-ink-soft m-0 mb-[22px] max-w-[480px]">
                {currentBean.description}
              </p>
            ): null}

            {notes.length > 0 ? (
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
            ) : null}

          </div>
        </div>
      ) : null}
    </section>
  )
}
