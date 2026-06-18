import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/badge"
import { Stepper } from "~/components/stepper"
import { SIZES, MILKS, EXTRAS, CURRENT_BEAN } from "~/lib/menu-data"
import type { DrinkDef } from "~/lib/menu-data"
import type { CartItem } from "~/lib/order-store"

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
      className="font-sans text-left cursor-pointer rounded-[12px] px-[15px] py-3 border-[1.5px] transition-all duration-[120ms] text-[14.5px] font-semibold"
      style={{
        border: `1.5px solid ${active ? "#00786f" : "#e9e6df"}`,
        background: active ? "#eef6f4" : "#fff",
        color: active ? "#005650" : "#3a3a40",
      }}
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
  onClose,
  onAdd,
}: {
  drink: DrinkDef
  onClose: () => void
  onAdd: (item: CartItem) => void
}) {
  const [size, setSize] = useState("M")
  const [milk, setMilk] = useState(drink.milk ? "whole" : "none")
  const [extras, setExtras] = useState<string[]>([])
  const [qty, setQty] = useState(1)

  const toggleExtra = (id: string) =>
    setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]))

  const detail = [
    SIZES.find((s) => s.id === size)?.label.split(" · ")[0],
    drink.milk ? MILKS.find((m) => m.id === milk)?.label : null,
    ...extras.map((e) => "+" + EXTRAS.find((x) => x.id === e)?.label),
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(20,28,26,.5)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[540px] max-w-full max-h-[90vh] overflow-y-auto bg-paper rounded-[22px]"
        style={{ boxShadow: "0 30px 80px rgba(0,0,0,.3)" }}
      >
        {/* Header */}
        <div className="px-7 pt-[26px] pb-5 border-b border-line flex justify-between items-start">
          <div>
            {drink.seasonal && (
              <div className="mb-2">
                <Badge tone="red">Seasonal</Badge>
              </div>
            )}
            <h3 className="font-heading font-bold text-[26px] text-ink m-0 tracking-[-0.02em]">
              {drink.name}
            </h3>
            <p className="font-sans text-[14.5px] text-buppers-muted mt-[6px] mb-0">
              {drink.desc} · Made with {CURRENT_BEAN.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="border-none bg-white w-[34px] h-[34px] rounded-full cursor-pointer text-[19px] text-buppers-muted flex items-center justify-center"
            style={{ boxShadow: "var(--shadow-brand-sm)" }}
          >
            ×
          </button>
        </div>

        {/* Options */}
        <div className="px-7 py-[22px]">
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
                {MILKS.map((m) => (
                  <Chip key={m.id} active={milk === m.id} onClick={() => setMilk(m.id)}>
                    {m.label}
                  </Chip>
                ))}
              </div>
            </FieldLabel>
          )}

          <FieldLabel label="Add-ons">
            <div className="flex flex-wrap gap-[10px]">
              {EXTRAS.map((x) => (
                <button
                  key={x.id}
                  onClick={() => toggleExtra(x.id)}
                  className="font-sans text-sm font-medium cursor-pointer rounded-full px-4 py-[9px] border-[1.5px] transition-colors"
                  style={{
                    border: `1.5px solid ${extras.includes(x.id) ? "#00786f" : "#e9e6df"}`,
                    background: extras.includes(x.id) ? "#eef6f4" : "#fff",
                    color: extras.includes(x.id) ? "#005650" : "#3a3a40",
                  }}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </FieldLabel>
        </div>

        {/* Footer */}
        <div className="px-7 pt-[18px] pb-[26px] border-t border-line flex items-center justify-between sticky bottom-0 bg-paper">
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
        </div>
      </div>
    </div>
  )
}
