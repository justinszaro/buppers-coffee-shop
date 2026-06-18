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
      <button
        className="w-[30px] h-[30px] rounded-lg border border-line bg-white cursor-pointer text-[17px] text-ink flex items-center justify-center leading-none"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        –
      </button>
      <span className="font-heading font-semibold text-base min-w-[18px] text-center">
        {value}
      </span>
      <button
        className="w-[30px] h-[30px] rounded-lg border border-line bg-white cursor-pointer text-[17px] text-ink flex items-center justify-center leading-none"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  )
}
