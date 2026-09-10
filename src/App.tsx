
import { lazy, Suspense, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"

const Home = lazy(() => import("./components/Home"))
const Navbar = lazy(() => import("./components/Navbar"))
const TopNavbar = lazy(() => import("./components/TopNavbar"))
const Tools = lazy(() => import("./components/Tools"))
const Projects = lazy(() => import("./components/Projects"))
const Preloader = lazy(() => import("./components/Preloader"))
const ContactModal = lazy(() => import("./components/ContactModal"))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const minimumDisplayTime = new Promise((resolve) => window.setTimeout(resolve, 1100))
    const assetsReady = document.fonts?.ready ?? Promise.resolve()

    Promise.all([minimumDisplayTime, assetsReady]).then(() => {
      if (isMounted) setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      <ScrollToTop />
      <main className="overflow-x-hidden bg-bg text-white" inert={isLoading} aria-busy={isLoading}>
        <Suspense fallback={null}>
          <TopNavbar onOpenContact={() => setIsContactOpen(true)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
          <Navbar />
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </Suspense>
      </main>
    </BrowserRouter>
  )
}

export default App;