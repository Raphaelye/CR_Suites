import { Link, useLocation } from "react-router"
import { motion } from "framer-motion"
import  { IoHomeOutline, IoFlashOutline, IoBriefcaseOutline } from "react-icons/io5"

function Navbar() {
  const location = useLocation()

  const isHome = location.pathname === "/"
  const isTools = location.pathname === "/tools"
  const isProjects = location.pathname === "/projects"

  return (
    <nav
      className="fixed bottom-8 left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-108 -translate-x-1/2 items-center rounded-full border border-white/20 bg-glass-bg p-1 shadow-2xl shadow-black/50 backdrop-blur-sm lg:bottom-8"
      aria-label="Primary navigation"
    >
      <Link
        className={`font-body relative flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-bold transition-colors sm:gap-2 sm:px-5 sm:text-sm ${isHome ? "text-black" : "text-white hover:bg-white/10 hover:text-accent"}`}
        to="/"
        aria-current={isHome ? "page" : undefined}
      >
        {isHome && <motion.span className="absolute inset-0 z-0 rounded-full bg-white" layoutId="active-nav" transition={{ type: "spring", stiffness: 450, damping: 32 }} />}
        <IoHomeOutline className="shrink-0 z-1" size={18} aria-hidden="true" />
        <span className="relative z-10">Home</span>
      </Link>


      <Link
        className={`font-body relative flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-bold transition-colors sm:gap-2 sm:px-5 sm:text-sm ${isTools ? "text-black" : "text-white hover:bg-white/10 hover:text-accent"}`}
        to="/tools"
        aria-current={isTools ? "page" : undefined}
      >
        {isTools && <motion.span className="absolute inset-0 z-0 rounded-full bg-white" layoutId="active-nav" transition={{ type: "spring", stiffness: 450, damping: 32 }} />}
        <IoFlashOutline className="shrink-0 bg-blend-difference z-1" size={18} aria-hidden="true" />
        <span className="relative z-10">Tools</span>
      </Link>


      <Link
        className={`font-body relative flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-bold transition-colors bg-blend-difference sm:gap-2 sm:px-5 sm:text-sm ${isProjects ? "text-black" : "text-white hover:bg-white/10 hover:text-accent"}`}
        to="/projects"
        aria-current={isProjects ? "page" : undefined}
      >
        {isProjects && <motion.span className="absolute inset-0 z-0 rounded-full bg-white" layoutId="active-nav" transition={{ type: "spring", stiffness: 450, damping: 32 }} />}
        <IoBriefcaseOutline className="shrink-0 z-1" size={18} aria-hidden="true" />
        <span className="relative z-10">Projects</span>
      </Link>
    </nav>
  )
}

export default Navbar