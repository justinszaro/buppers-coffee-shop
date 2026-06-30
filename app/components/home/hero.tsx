import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { DuoMark } from "~/components/duo-mark"
import { Eyebrow } from "~/components/eyebrow"
import { useDrinks } from "~/hooks/use-drinks"
import { client } from "~/lib/feathers-client"

export function Hero() {
  const { total: activeDrinks } = useDrinks()
  const [drinksServed, setDrinksServed] = useState<number | null>(null)

  useEffect(() => {
    client
      .service("orders")
      .find({ query: { status: "complete", $limit: 0 } })
      .then((result: { total: number }) => setDrinksServed(result.total))
      .catch(() => {})
  }, [])

  const stats: [string, string][] = [
    ["7am–1pm", "Open daily"],
    [activeDrinks > 0 ? String(activeDrinks) : "—", "Drinks on the menu"],
    [drinksServed !== null ? drinksServed.toLocaleString() : "—", "Drinks served"],
  ]

  return (
    <section className="max-w-[1160px] mx-auto px-7 grid items-center gap-14 pt-[64px] pb-[72px] grid-cols-[1.05fr_0.95fr]">
      <div>
        <Eyebrow>Basement coffee bar · Est. 2026</Eyebrow>
        <h1 className="font-heading font-bold text-ink mt-[22px] mb-0 leading-[1.04] tracking-[-0.03em] text-[58px]">
          Two woolly regulars,
          <br />
          one very good cup.
        </h1>
        <p className="font-sans text-[18px] leading-relaxed text-ink-soft max-w-[460px] mt-[22px] mb-[34px]">
          Beans from our local community, pulled slow and served warm — downstairs,
          where it&apos;s quiet. Come take a seat!
        </p>

        <div className="flex gap-[14px] flex-wrap">
          <Link to="/order" className="no-underline">
            <Button className="bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep">
              Order →
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
          {stats.map(([a, b]) => (
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
          className="w-full object-cover rounded-[20px] block h-[420px] shadow-[var(--shadow-brand)]"
        />
        {/* Barista callout */}
        <Card
          className="absolute flex-row items-center gap-[14px] rounded-[18px] px-5 py-4 border border-line ring-0 [--card-spacing:0px] left-[-26px] -bottom-[26px] shadow-[var(--shadow-brand)]"
        >
          <DuoMark size={42} variant="color" />
          <div className="whitespace-nowrap">
            <div className="font-heading font-semibold text-[15px] text-ink">
              Jack &amp; Jill
            </div>
            <div className="font-sans text-[12.5px] text-buppers-muted mt-0.5">
              your baristas
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
