import { Link } from "react-router"
import { cn } from "~/lib/utils"
import { DuoMark } from "~/components/duo-mark"
import { Button } from "~/components/ui/button"

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
      <div className="max-w-[1160px] mx-auto flex items-center justify-between px-7 h-[70px]">
        <Link to="/" className="no-underline">
          <div className="flex items-center gap-[11px]">
            <DuoMark size={38} variant="color" />
            <span className="font-heading font-bold text-[26px] tracking-[-0.03em] text-ink leading-none">
              Buppers
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-[30px]">
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
      </div>
    </header>
  )
}
