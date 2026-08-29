
import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import TopNavbar from "./components/TopNavbar"
import Tools from "./components/Tools"
import Projects from "./components/Projects"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="overflow-x-hidden bg-bg text-white ">
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Navbar />
      </main>
    </BrowserRouter>
  )
}

export default App;