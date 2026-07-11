import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { DuoMark } from "~/components/duo-mark"
import { Eyebrow } from "~/components/eyebrow"
import { useDrinks } from "~/hooks/use-drinks"
import { useOrders } from "~/hooks/use-orders"

export function Hero() {
  const { data: drinks } = useDrinks({ active: true, $limit: 100 })
  const activeDrinks = drinks?.length ?? 0
  const { total: drinksServed } = useOrders({ status: "complete", $limit: 0 })

  const stats: [string, string][] = [
    ["7am–1pm", "Open daily"],
    [activeDrinks > 0 ? String(activeDrinks) : "—", "Drinks on the menu"],
    [
      drinksServed != null ? drinksServed.toLocaleString() : "—",
      "Drinks served",
    ],
  ]

  return (
    <section className="mx-auto grid max-w-[1160px] grid-cols-[1.05fr_0.95fr] items-center gap-14 px-7 pt-[64px] pb-[72px]">
      <div>
        <Eyebrow>Basement coffee bar · Est. 2026</Eyebrow>
        <h1 className="mt-[22px] mb-0 font-heading text-[58px] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
          Two woolly regulars,
          <br />
          one very good cup.
        </h1>
        <p className="mt-[22px] mb-[34px] max-w-[460px] font-sans text-[18px] leading-relaxed text-ink-soft">
          Beans from our local community, pulled slow and served warm —
          downstairs, where it&apos;s quiet. Come take a seat!
        </p>

        <div className="flex flex-wrap gap-[14px]">
          <Link to="/order" className="no-underline">
            <Button className="h-auto rounded-full border-none bg-teal px-[26px] py-[14px] text-base font-semibold text-white hover:bg-teal-deep">
              Order →
            </Button>
          </Link>
          <a href="#beans" className="no-underline">
            <Button
              variant="outline"
              className="h-auto rounded-full border-line bg-transparent px-[26px] py-[14px] text-base font-semibold text-ink"
            >
              See this month&apos;s beans
            </Button>
          </a>
        </div>

        <div className="mt-10 flex gap-7">
          {stats.map(([a, b]) => (
            <div key={b}>
              <div className="font-heading text-[26px] font-bold text-teal">
                {a}
              </div>
              <div className="mt-0.5 font-sans text-[13px] text-buppers-muted">
                {b}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: photo */}
      <div className="relative">
        <img
          src="/img-bar.jpg"
          alt="The bar, down in the basement"
          className="block h-[420px] w-full rounded-[20px] object-cover shadow-[var(--shadow-brand)]"
        />
        {/* Barista callout */}
        <Card className="absolute -bottom-[26px] left-[-26px] flex-row items-center gap-[14px] rounded-[18px] border border-line px-5 py-4 shadow-[var(--shadow-brand)] ring-0 [--card-spacing:0px]">
          <DuoMark size={42} variant="color" />
          <div className="whitespace-nowrap">
            <div className="font-heading text-[15px] font-semibold text-ink">
              Jack &amp; Jill
            </div>
            <div className="mt-0.5 font-sans text-[12.5px] text-buppers-muted">
              your baristas
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
