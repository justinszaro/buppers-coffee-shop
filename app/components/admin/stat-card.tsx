export function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color?: string
}) {
  return (
    <div
      className="flex-1 bg-white border border-line rounded-[16px] px-5 py-[18px]"
      style={{ boxShadow: "var(--shadow-brand-sm)" }}
    >
      <div className="font-sans text-[12.5px] font-semibold tracking-[0.08em] uppercase text-buppers-muted">
        {label}
      </div>
      <div
        className="font-heading font-bold text-[30px] mt-[6px] tracking-[-0.02em]"
        style={{ color: color ?? "#17171a" }}
      >
        {value}
      </div>
    </div>
  )
}
