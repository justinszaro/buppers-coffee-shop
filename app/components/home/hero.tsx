import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { DuoMark } from "~/components/duo-mark"
import { Eyebrow } from "~/components/eyebrow"

const STATS: [string, string][] = [
  ["7am–6pm", "Open daily"],
  ["One", "Bean this week"],
  ["Basement", "Pull up a stool"],
]

export function Hero() {
  return (
    <section
      className="mx-auto px-7 grid items-center gap-14"
      style={{
        maxWidth: 1160,
        paddingTop: 64,
        paddingBottom: 72,
        gridTemplateColumns: "1.05fr 0.95fr",
      }}
    >
      {/* Left: copy */}
      <div>
        <Eyebrow>Basement coffee bar · Est. 2026</Eyebrow>
        <h1 className="font-heading font-bold text-ink mt-[22px] mb-0 leading-[1.04] tracking-[-0.03em] text-[58px]">
          Two woolly regulars,
          <br />
          one very good cup.
        </h1>
        <p className="font-sans text-[18px] leading-relaxed text-ink-soft max-w-[460px] mt-[22px] mb-[34px]">
          Beans from roasters we love, pulled slow and served warm — downstairs,
          where it&apos;s quiet. Buppers and Maple keep the bar — you keep the
          booth.
        </p>

        <div className="flex gap-[14px] flex-wrap">
          <Link to="/order" className="no-underline">
            <Button className="bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep">
              Order ahead →
            </Button>
          </Link>
          <a href="#beans" className="no-underline">
            <Button
              variant="outline"
              className="bg-transparent text-ink rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-line"
            >
              See this month&apos;s beans
            </Button>
          </a>
        </div>

        <div className="flex gap-7 mt-10">
          {STATS.map(([a, b]) => (
            <div key={b}>
              <div className="font-heading font-bold text-[26px] text-teal">{a}</div>
              <div className="font-sans text-[13px] text-buppers-muted mt-0.5">{b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: photo */}
      <div className="relative">
        <img
          src="/img-bar.jpg"
          alt="The bar, down in the basement"
          className="w-full object-cover rounded-[20px] block"
          style={{ height: 420, boxShadow: "var(--shadow-brand)" }}
        />
        {/* Barista callout */}
        <div
          className="absolute flex items-center gap-[14px] bg-white rounded-[18px] px-5 py-4 border border-line"
          style={{ left: -26, bottom: -26, boxShadow: "var(--shadow-brand)" }}
        >
          <DuoMark size={42} variant="color" />
          <div className="whitespace-nowrap">
            <div className="font-heading font-semibold text-[15px] text-ink">
              Buppers &amp; Maple
            </div>
            <div className="font-sans text-[12.5px] text-buppers-muted mt-0.5">
              your baristas
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
