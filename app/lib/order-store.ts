import { useState, useEffect } from "react"

// ── Types ─────────────────────────────────────────────────────────────
export interface Order {
  id: number
  name: string
  items: { name: string; detail: string; qty: number }[]
  status: string
  placedAt: number
}

export interface CartItem {
  uid: string
  drinkId: string
  name: string
  detail: string
  qty: number
}

export interface PlacedOrder {
  id: number
  name: string
  items: { name: string; detail: string; qty: number }[]
  status: string
  placedAt: number
}

// ── Status config ─────────────────────────────────────────────────────
export const STATUS: Record<string, { label: string; tone: string; next: string | null }> = {
  new: { label: "New", tone: "red", next: "brewing" },
  brewing: { label: "Brewing", tone: "amber", next: "ready" },
  ready: { label: "Ready", tone: "green", next: "done" },
  done: { label: "Picked up", tone: "grey", next: null },
}

export const ACTION: Record<string, string> = {
  new: "Start brewing →",
  brewing: "Mark ready →",
  ready: "Hand off →",
}

// ── Seed data ─────────────────────────────────────────────────────────
const SEED_NAMES = ["Wren", "Tobias", "Marisol", "Dev", "Priya", "Sam", "Elena", "Hugo", "Nadia", "Beau"]
const SEED_DRINKS = [
  { id: "snowdrift", name: "The Snowdrift Latte", milk: true },
  { id: "espresso", name: "Espresso", milk: false },
  { id: "latte", name: "Latte", milk: true },
  { id: "coldbrew", name: "Cold Brew", milk: false },
  { id: "pourover", name: "Pour-Over", milk: false },
]

// ── Store ─────────────────────────────────────────────────────────────
const OKEY = "buppers.orders.v2"

export function seedOrders(): Order[] {
  const now = Date.now()
  return [
    {
      id: 1042,
      name: "Marisol",
      items: [{ name: "The Snowdrift Latte", detail: "Large · Oat · +Maple", qty: 1 }],
      status: "brewing",
      placedAt: now - 3 * 60000,
    },
    {
      id: 1041,
      name: "Dev",
      items: [{ name: "Cold Brew", detail: "Medium · No milk", qty: 2 }],
      status: "new",
      placedAt: now - 1 * 60000,
    },
    {
      id: 1040,
      name: "Wren",
      items: [
        { name: "Cortado", detail: "Small · Whole", qty: 1 },
        { name: "Pour-Over", detail: "Hand pour", qty: 1 },
      ],
      status: "ready",
      placedAt: now - 8 * 60000,
    },
    {
      id: 1039,
      name: "Priya",
      items: [{ name: "Latte", detail: "Medium · Almond", qty: 1 }],
      status: "done",
      placedAt: now - 24 * 60000,
    },
  ]
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return seedOrders()
  try {
    const r = JSON.parse(localStorage.getItem(OKEY) ?? "")
    if (Array.isArray(r)) return r
  } catch {}
  const s = seedOrders()
  localStorage.setItem(OKEY, JSON.stringify(s))
  return s
}

export function saveOrders(list: Order[]) {
  localStorage.setItem(OKEY, JSON.stringify(list))
  window.dispatchEvent(new Event("buppers-orders"))
}

export function addOrder(order: {
  name: string
  items: { name: string; detail: string; qty: number }[]
}): PlacedOrder {
  const list = getOrders()
  const id = Math.max(1042, ...list.map((o) => o.id)) + 1
  const full: Order = { id, status: "new", placedAt: Date.now(), ...order }
  saveOrders([full, ...list])
  return full as PlacedOrder
}

export function advance(id: number) {
  const list = getOrders().map((o) => {
    if (o.id !== id) return o
    const nx = STATUS[o.status]?.next
    return nx ? { ...o, status: nx } : o
  })
  saveOrders(list)
}

export function simulateOrder() {
  const d = SEED_DRINKS[Math.floor(Math.random() * SEED_DRINKS.length)]
  const qty = 1 + Math.floor(Math.random() * 2)
  const name = SEED_NAMES[Math.floor(Math.random() * SEED_NAMES.length)]
  const list = getOrders()
  const id = Math.max(1042, ...list.map((o) => o.id)) + 1
  const detail = d.milk ? "Medium · Oat" : "Medium"
  const full: Order = { id, name, items: [{ name: d.name, detail, qty }], status: "new", placedAt: Date.now() }
  saveOrders([full, ...list])
}

// ── Hook ──────────────────────────────────────────────────────────────
export function useOrders(): Order[] {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return seedOrders()
    return getOrders()
  })

  useEffect(() => {
    const h = () => setOrders(getOrders())
    window.addEventListener("buppers-orders", h)
    window.addEventListener("storage", h)
    const iv = setInterval(h, 5000)
    return () => {
      window.removeEventListener("buppers-orders", h)
      window.removeEventListener("storage", h)
      clearInterval(iv)
    }
  }, [])

  return orders
}

// ── Utilities ─────────────────────────────────────────────────────────
export function timeAgo(t: number) {
  const m = Math.round((Date.now() - t) / 60000)
  if (m < 1) return "just now"
  if (m < 60) return m + " min ago"
  return Math.round(m / 60) + " hr ago"
}
