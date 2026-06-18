import { Link } from "react-router"
import { DuoMark } from "~/components/duo-mark"

export function Footer() {
  return (
    <footer className="bg-teal-dark text-cream mt-0">
      <div className="mx-auto flex flex-wrap justify-between gap-8 px-7" style={{ maxWidth: 1160, paddingTop: 52, paddingBottom: 40 }}>
        <div style={{ maxWidth: 320 }}>
          <div className="flex items-center gap-[11px]">
            <DuoMark size={38} variant="cream" />
            <span className="font-heading font-bold text-[26px] tracking-[-0.03em] text-cream leading-none">
              Buppers
            </span>
          </div>
          <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: "#bcd9d3" }}>
            A little coffee bar in the basement, run by two woolly regulars.
            Good beans, warm cups, no rush.
          </p>
        </div>

        <div className="flex flex-wrap gap-14">
          <FooterCol
            title="Visit"
            items={["Basement · 142 Birch Lane", "Open 7am – 6pm", "Daily"]}
          />
          <FooterCol
            title="More"
            items={[
              { label: "Order ahead", href: "/order" },
              { label: "Staff portal", href: "/admin" },
            ]}
          />
        </div>
      </div>

      <div
        className="font-sans text-center"
        style={{
          borderTop: "1px solid rgba(255,255,255,.12)",
          padding: "18px 28px",
          fontSize: 12.5,
          color: "#8fb8b1",
        }}
      >
        © 2026 Buppers Coffee Co. · Est. 2026
      </div>
    </footer>
  )
}

interface FooterColItem {
  label: string
  href: string
}

function FooterCol({
  title,
  items,
}: {
  title: string
  items: (string | FooterColItem)[]
}) {
  return (
    <div>
      <div className="font-heading font-semibold text-sm text-white mb-[14px]">
        {title}
      </div>
      <div className="flex flex-col gap-[9px]">
        {items.map((item, i) =>
          typeof item === "string" ? (
            <span key={i} className="font-sans text-sm" style={{ color: "#bcd9d3" }}>
              {item}
            </span>
          ) : (
            <Link
              key={i}
              to={item.href}
              className="font-sans text-sm no-underline"
              style={{ color: "#bcd9d3" }}
            >
              {item.label}
            </Link>
          ),
        )}
      </div>
    </div>
  )
}
