import { NavBar } from "~/components/nav-bar"
import { Footer } from "~/components/footer"
import { Hero } from "~/components/home/hero"
import { CoffeeOfMonth } from "~/components/home/coffee-of-month"
import { BeansSection } from "~/components/home/beans-section"
import { AboutSection } from "~/components/home/about-section"

export default function Home() {
  return (
    <div className="bg-paper min-h-screen">
      <NavBar active="home" />
      <Hero />
      <CoffeeOfMonth />
      <BeansSection />
      <AboutSection />
      <Footer />
    </div>
  )
}
