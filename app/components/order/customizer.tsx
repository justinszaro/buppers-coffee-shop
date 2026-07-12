import { Coffee, Snowflake } from "lucide-react"
import { useState } from "react"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog"
import { Badge } from "~/components/ui/badge"
import { Stepper } from "~/components/stepper"
import type { CartItem } from "~/hooks/use-orders"
import type { Drink } from "~/hooks/use-drinks"
import type { Milk } from "~/hooks/use-milks"
import type { Addon } from "~/hooks/use-addons"

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-[12px] border-[1.5px] px-[15px] py-3 text-left font-sans text-[14.5px] font-semibold whitespace-nowrap transition-all duration-[120ms]",
        active
          ? "border-teal bg-teal-wash text-teal-deep"
          : "border-line bg-white text-ink-soft"
      )}
    >
      {children}
    </button>
  )
}

function FieldLabel({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-[22px]">
      <div className="mb-[11px] font-sans text-[12.5px] font-bold tracking-[0.12em] text-buppers-muted uppercase">
        {label}
      </div>
      {children}
    </div>
  )
}

export function Customizer({
  drink,
  milkOptions,
  extraOptions,
  beanName,
  onClose,
  onAdd,
}: {
  drink: Drink
  milkOptions: Milk[]
  extraOptions: Addon[]
  beanName: string
  onClose: () => void
  onAdd: (item: CartItem) => void
}) {
  const [milk, setMilk] = useState<number>(milkOptions[0]?.milkId ?? 0)
  const [extras, setExtras] = useState<number[]>([])
  const [qty, setQty] = useState(1)
  const [isHot, setIsHot] = useState<boolean>(drink.temp !== "cold")

  const toggleExtra = (id: number) =>
    setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]))

  const detail = [
    isHot ? "Hot" : "Iced",
    milkOptions.length > 0
      ? milkOptions.find((m) => m.milkId === milk)?.name
      : null,
    ...extras.map((e) => "+" + extraOptions.find((x) => x.addonId === e)?.name),
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] max-w-[540px] flex-col gap-0 rounded-[22px] border-line p-0 shadow-[0_30px_80px_rgba(0,0,0,.3)] ring-0"
      >
        {/* Header */}
        <DialogHeader className="flex-shrink-0 flex-row items-start justify-between space-y-0 border-b border-line px-7 pt-[26px] pb-5">
          <div>
            {drink.featured && (
              <div className="mb-2">
                <Badge className="h-auto rounded-full border-transparent bg-[#f7e3e1] px-[10px] py-[4px] text-[11.5px] font-semibold tracking-[0.06em] whitespace-nowrap text-red-deep uppercase">
                  Seasonal
                </Badge>
              </div>
            )}
            <DialogTitle className="font-heading text-[26px] leading-tight font-bold tracking-[-0.02em] text-ink">
              {drink.name}
            </DialogTitle>
            <DialogDescription className="mt-[6px] font-sans text-[14.5px] text-buppers-muted">
              {drink.description} · Made with {beanName}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button className="flex h-[34px] w-[34px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-white text-[19px] text-buppers-muted shadow-[var(--shadow-brand-sm)]">
              ×
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Options */}
        <div className="flex-1 overflow-y-auto px-7 py-[22px]">
          {drink.temp === null ? (
            <FieldLabel label="Temperature">
              <div className="flex flex-wrap gap-[10px]">
                <Chip active={isHot} onClick={() => setIsHot(true)}>
                  <Coffee className="inline" size={11} /> Hot
                </Chip>
                <Chip active={!isHot} onClick={() => setIsHot(false)}>
                  <Snowflake className="inline" size={11} /> Iced
                </Chip>
              </div>
            </FieldLabel>
          ) : null}

          {milkOptions.length > 0 && (
            <FieldLabel label="Milk">
              <div className="flex flex-wrap gap-[10px]">
                {milkOptions.map((m) => (
                  <Chip
                    key={m.milkId}
                    active={milk === m.milkId}
                    onClick={() => setMilk(m.milkId)}
                  >
                    {m.name}
                  </Chip>
                ))}
              </div>
            </FieldLabel>
          )}

          <FieldLabel label="Add-ons">
            <div className="flex flex-wrap gap-[10px]">
              {extraOptions.map((x) => (
                <button
                  key={x.addonId}
                  onClick={() => toggleExtra(x.addonId)}
                  className={cn(
                    "cursor-pointer rounded-full border-[1.5px] px-4 py-[9px] font-sans text-sm font-medium transition-colors",
                    extras.includes(x.addonId)
                      ? "border-teal bg-teal-wash text-teal-deep"
                      : "border-line bg-white text-ink-soft"
                  )}
                >
                  {x.name}
                </button>
              ))}
            </div>
          </FieldLabel>
        </div>

        {/* Footer */}
        <DialogFooter className="flex-shrink-0 flex-row items-center justify-between border-t border-line bg-paper px-7 pt-[18px] pb-[26px]">
          <Stepper value={qty} onChange={setQty} />
          <Button
            className="h-auto rounded-full border-none bg-teal px-[26px] py-[14px] text-base font-semibold text-white hover:bg-teal-deep"
            onClick={() =>
              onAdd({
                uid: Math.random().toString(36).slice(2),
                drinkId: String(drink.drinkId),
                milkId: milkOptions.length > 0 ? milk : null,
                addonIds: extras,
                isHot,
                name: drink.name,
                detail,
                qty,
              })
            }
          >
            Add {qty} to order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
