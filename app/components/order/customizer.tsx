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
import { Badge } from "~/components/badge"
import { Stepper } from "~/components/stepper"
import { SIZES } from "~/lib/menu-data"
import type { DrinkDef } from "~/lib/menu-data"
import type { CartItem } from "~/lib/order-store"

type Option = { id: string; label: string }

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
        "font-sans text-left cursor-pointer rounded-[12px] px-[15px] py-3 border-[1.5px] transition-all duration-[120ms] text-[14.5px] font-semibold",
        active
          ? "border-teal bg-teal-wash text-teal-deep"
          : "border-line bg-white text-ink-soft",
      )}
    >
      {children}
    </button>
  )
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-[22px]">
      <div className="font-sans font-bold text-[12.5px] tracking-[0.12em] uppercase text-buppers-muted mb-[11px]">
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
  drink: DrinkDef
  milkOptions: Option[]
  extraOptions: Option[]
  beanName: string
  onClose: () => void
  onAdd: (item: CartItem) => void
}) {
  const [size, setSize] = useState("M")
  const [milk, setMilk] = useState(milkOptions[0]?.id ?? "")
  const [extras, setExtras] = useState<string[]>([])
  const [qty, setQty] = useState(1)

  const toggleExtra = (id: string) =>
    setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]))

  const detail = [
    SIZES.find((s) => s.id === size)?.label.split(" · ")[0],
    drink.milk ? milkOptions.find((m) => m.id === milk)?.label : null,
    ...extras.map((e) => "+" + extraOptions.find((x) => x.id === e)?.label),
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="p-0 gap-0 max-w-[540px] flex flex-col max-h-[90vh] rounded-[22px] border-line ring-0 shadow-[0_30px_80px_rgba(0,0,0,.3)]"
      >
        {/* Header */}
        <DialogHeader className="px-7 pt-[26px] pb-5 border-b border-line flex-row items-start justify-between space-y-0 flex-shrink-0">
          <div>
            {drink.seasonal && (
              <div className="mb-2">
                <Badge tone="red">Seasonal</Badge>
              </div>
            )}
            <DialogTitle className="font-heading font-bold text-[26px] text-ink tracking-[-0.02em] leading-tight">
              {drink.name}
            </DialogTitle>
            <DialogDescription className="font-sans text-[14.5px] text-buppers-muted mt-[6px]">
              {drink.desc} · Made with {beanName}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button className="border-none bg-white w-[34px] h-[34px] rounded-full cursor-pointer text-[19px] text-buppers-muted flex items-center justify-center flex-shrink-0 shadow-[var(--shadow-brand-sm)]">
              ×
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Options */}
        <div className="px-7 py-[22px] overflow-y-auto flex-1">
          <FieldLabel label="Size">
            <div className="grid grid-cols-3 gap-[10px]">
              {SIZES.map((s) => (
                <Chip key={s.id} active={size === s.id} onClick={() => setSize(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </div>
          </FieldLabel>

          {drink.milk && (
            <FieldLabel label="Milk">
              <div className="grid grid-cols-4 gap-[10px]">
                {milkOptions.map((m) => (
                  <Chip key={m.id} active={milk === m.id} onClick={() => setMilk(m.id)}>
                    {m.label}
                  </Chip>
                ))}
              </div>
            </FieldLabel>
          )}

          <FieldLabel label="Add-ons">
            <div className="flex flex-wrap gap-[10px]">
              {extraOptions.map((x) => (
                <button
                  key={x.id}
                  onClick={() => toggleExtra(x.id)}
                  className={cn(
                    "font-sans text-sm font-medium cursor-pointer rounded-full px-4 py-[9px] border-[1.5px] transition-colors",
                    extras.includes(x.id)
                      ? "border-teal bg-teal-wash text-teal-deep"
                      : "border-line bg-white text-ink-soft",
                  )}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </FieldLabel>
        </div>

        {/* Footer */}
        <DialogFooter className="px-7 pt-[18px] pb-[26px] border-t border-line flex-row items-center justify-between flex-shrink-0 bg-paper">
          <Stepper value={qty} onChange={setQty} />
          <Button
            className="bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep"
            onClick={() =>
              onAdd({
                uid: Math.random().toString(36).slice(2),
                drinkId: drink.id,
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
