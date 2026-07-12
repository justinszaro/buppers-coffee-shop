import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { DuoMark } from "~/components/duo-mark"
import { useDrinks } from "~/hooks/use-drinks"
import { useBeans } from "~/hooks/use-beans"

export function CoffeeOfMonth() {
  const { data: drinks, isLoading: drinksLoading } = useDrinks({ featured: true })
  const { data: beans, isLoading: beansLoading } = useBeans({ active: true })
  const drink = drinks?.[0]
  const bean = beans?.[0]

  if (drinksLoading || beansLoading || !drink) return null

  return (
    <section className="bg-teal-dark text-cream">
      <div className="max-w-[1160px] mx-auto px-7 grid items-center gap-[52px] pt-[64px] pb-[64px] grid-cols-[0.9fr_1.1fr] max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[520px]:px-[18px]">
        {drink.photo ? (
          <img
            src={drink.photo}
            alt={drink.name}
            className="w-full object-cover rounded-[20px] block h-[380px]"
          />
        ) : (
          <div className="w-full h-[380px] rounded-[20px] bg-teal flex items-center justify-center">
            <DuoMark size={120} variant="cream" />
          </div>
        )}
        <div>
          <Badge className="h-auto font-semibold text-[11.5px] tracking-[0.06em] uppercase rounded-full px-[10px] py-[4px] whitespace-nowrap bg-[#f7e3e1] text-red-deep border-transparent">Drink of the Month</Badge>
          <h2 className="font-heading font-bold text-[44px] tracking-[-0.02em] leading-[1.08] mt-[18px] mb-0 max-[900px]:text-[32px]">
            {drink.name}
          </h2>
          <p className="font-sans text-[17px] leading-[1.65] mt-[18px] mb-6 max-w-[480px] text-[#cbe3dd]">
            {drink.description}
          </p>
          <div className="flex items-center gap-[18px] flex-wrap">
            <Link to="/order" className="no-underline">
              <Button className="bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep">
                Order one →
              </Button>
            </Link>
            {bean && (
              <span className="font-sans text-[13.5px] text-[#9fc6bf]">
                Made with this week&apos;s bean, {bean.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
