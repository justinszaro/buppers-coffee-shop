import { Link } from "react-router"
import { Menu } from "lucide-react"
import { cn } from "~/lib/utils"
import { DuoMark } from "~/components/duo-mark"
import { Button } from "~/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

interface NavBarProps {
  active?: "home" | "order" | "admin"
}

export function NavBar({ active }: NavBarProps) {
  const links = [
    { id: "home", label: "Home", href: "/" },
    { id: "order", label: "Order", href: "/order" },
    { id: "admin", label: "Staff", href: "/admin" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/86 backdrop-blur-[12px]">
      <div className="max-w-[1160px] mx-auto flex items-center justify-between px-7 h-[70px] max-[520px]:px-[18px]">
        <Link to="/" className="no-underline">
          <div className="flex items-center gap-[11px]">
            <DuoMark size={38} variant="color" />
            <span className="font-heading font-bold text-[26px] tracking-[-0.03em] text-ink leading-none">
              Buppers
            </span>
          </div>
        </Link>

        {/* Desktop nav — hidden at ≤820px */}
        <nav className="flex items-center gap-[30px] max-[820px]:hidden">
          {links.map((l) => (
            <Link
              key={l.id}
              to={l.href}
              className={cn(
                "relative no-underline font-sans font-medium text-[15px] pb-0.5",
                active === l.id ? "text-teal" : "text-ink-soft",
              )}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute left-0 right-0 block h-0.5 bg-teal -bottom-6" />
              )}
            </Link>
          ))}
          <Link to="/order" className="no-underline">
            <Button
              size="sm"
              className="rounded-full font-semibold text-[13.5px] px-4 bg-teal text-white border-none hover:bg-teal-deep"
            >
              Order ahead
            </Button>
          </Link>
        </nav>

        {/* Mobile hamburger + Sheet drawer — visible at ≤820px */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hidden max-[820px]:flex text-ink hover:bg-transparent"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="top"
            className="border-t-0 border-b border-line bg-paper/[0.98] px-5 py-6 shadow-none"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            <div className="flex flex-col">
              {links.map((l) => (
                <SheetClose key={l.id} asChild>
                  <Link
                    to={l.href}
                    className={cn(
                      "no-underline font-sans font-semibold text-base py-3 first:border-t border-b border-line-soft",
                      active === l.id ? "text-teal" : "text-ink-soft",
                    )}
                  >
                    {l.label}
                  </Link>
                </SheetClose>
              ))}

              <SheetClose asChild>
                <Link to="/order" className="no-underline mt-[14px]">
                  <Button className="w-full h-auto rounded-full font-semibold text-base px-[26px] py-[14px] bg-teal text-white border-none hover:bg-teal-deep">
                    Order ahead
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
