import { Button } from "~/components/ui/button"

export function Stepper({
  value,
  onChange,
  min = 1,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
}) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-lg border-line bg-white text-[17px] leading-none"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        –
      </Button>
      <span className="font-heading font-semibold text-base min-w-[18px] text-center">
        {value}
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-lg border-line bg-white text-[17px] leading-none"
        onClick={() => onChange(value + 1)}
      >
        +
      </Button>
    </div>
  )
}
