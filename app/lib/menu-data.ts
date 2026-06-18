// ── Types ─────────────────────────────────────────────────────────────
export interface DrinkDef {
  id: string
  name: string
  tone: string
  milk: boolean
  seasonal?: boolean
  desc: string
}

export type BadgeTone = "teal" | "amber" | "red" | "green" | "grey"

export interface RecipeDef {
  id: string
  name: string
  badge: string
  tone: BadgeTone
  bean: string
  dose: string
  yield: string
  time: string
  steps: string[]
}

// ── Bean & seasonal drink ─────────────────────────────────────────────
export const CURRENT_BEAN = {
  name: "Cabin No. 7",
  origin: "Colombia · Huila",
  process: "Washed",
  roast: "Medium",
  notes: ["Cocoa", "Red apple", "Caramel"],
  blurb:
    "This week's single origin — balanced, sweet and dependable. We bring it in by the bag from a roaster we love, rest it a few days, and it pulls beautifully across espresso and batch brew.",
  brews: ["Espresso", "Batch brew", "Cold brew"],
  roastedOn: "From Ridgeline Roasters",
  nextUp: "Misty Ridge (Ethiopia)",
}

export const COFFEE_OF_MONTH = {
  name: "The Snowdrift Latte",
  bean: CURRENT_BEAN.name,
  tag: "Coffee of the Month · June",
  desc: "Double shot of this week's bean over steamed oat milk, a ribbon of real maple, and a whisper of grated nutmeg. Named after a certain scarf-wearing moose.",
  notes: ["Maple", "Oat", "Nutmeg"],
}

// ── Order menu ────────────────────────────────────────────────────────
export const DRINKS: DrinkDef[] = [
  { id: "snowdrift", name: "The Snowdrift Latte", tone: "cream", milk: true, seasonal: true, desc: "Maple, oat & nutmeg." },
  { id: "espresso", name: "Espresso", tone: "dark", milk: false, desc: "Two ounces, all business." },
  { id: "cortado", name: "Cortado", tone: "cream", milk: true, desc: "Equal parts shot & milk." },
  { id: "latte", name: "Latte", tone: "cream", milk: true, desc: "Silky microfoam classic." },
  { id: "capp", name: "Cappuccino", tone: "cream", milk: true, desc: "Dry, foamy, traditional." },
  { id: "mocha", name: "Mocha", tone: "dark", milk: true, desc: "Dark chocolate & espresso." },
  { id: "coldbrew", name: "Cold Brew", tone: "dark", milk: false, desc: "16-hour slow steep, on ice." },
  { id: "pourover", name: "Pour-Over", tone: "teal", milk: false, desc: "Made to order, by hand." },
]

export const SIZES = [
  { id: "S", label: "Small · 8oz" },
  { id: "M", label: "Medium · 12oz" },
  { id: "L", label: "Large · 16oz" },
]

export const MILKS = [
  { id: "whole", label: "Whole" },
  { id: "oat", label: "Oat" },
  { id: "almond", label: "Almond" },
  { id: "none", label: "No milk" },
]

export const EXTRAS = [
  { id: "shot", label: "Extra shot" },
  { id: "maple", label: "Maple syrup" },
  { id: "vanilla", label: "Vanilla" },
  { id: "whip", label: "Whipped cream" },
  { id: "decaf", label: "Make it decaf" },
]

// ── Recipes ───────────────────────────────────────────────────────────
export const RECIPES: RecipeDef[] = [
  {
    id: "snowdrift",
    name: "The Snowdrift Latte",
    badge: "Seasonal",
    tone: "red",
    bean: CURRENT_BEAN.name,
    dose: "18 g",
    yield: "36 g",
    time: "27 s",
    steps: [
      `Pull a double of this week's bean (18 g in, 36 g out, ~27 s).`,
      "Steam 8 oz oat milk to silky microfoam, 140°F.",
      "Add 0.75 oz maple syrup to the cup, pull shot on top.",
      "Pour milk, finish with fresh grated nutmeg.",
    ],
  },
  {
    id: "latte",
    name: "Classic Latte",
    badge: "Espresso",
    tone: "teal",
    bean: CURRENT_BEAN.name,
    dose: "18 g",
    yield: "36 g",
    time: "28 s",
    steps: [
      "Dose 18 g, distribute & tamp level.",
      "Pull 36 g in 26–30 s.",
      "Steam 6 oz milk to glossy microfoam.",
      "Pour with a steady, low hand.",
    ],
  },
  {
    id: "coldbrew",
    name: "Cold Brew",
    badge: "Batch",
    tone: "grey",
    bean: CURRENT_BEAN.name,
    dose: "200 g",
    yield: "1.6 L",
    time: "16 h",
    steps: [
      "Grind 200 g coarse.",
      "Combine with 1.6 L cold filtered water, 1:8.",
      "Steep 16 h in the walk-in.",
      "Strain twice; serve over ice.",
    ],
  },
  {
    id: "pourover",
    name: "Pour-Over · V60",
    badge: "Manual",
    tone: "amber",
    bean: CURRENT_BEAN.name,
    dose: "22 g",
    yield: "360 g",
    time: "2:45",
    steps: [
      "22 g medium-fine, rinse filter.",
      "Bloom 45 g water, 40 s.",
      "Pour in slow spirals to 360 g.",
      "Target 2:45 total draw-down, 96°C.",
    ],
  },
]
