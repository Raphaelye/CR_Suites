import { Link } from 'react-router'
import { motion } from 'framer-motion'

function TopNavbar() {
  return (
    <nav
      className="fixed left-1/2 top-5 w-[90%] z-50 flex justify-between -translate-x-1/2 items-center gap-10 rounded-full px-4 py-3 backdrop-blur-xl sm:top-6 sm:gap-20 sm:px-6 sm:py-4"
      aria-label="Site navigation"
    >
      <Link
        className="group flex items-end gap-0"
        to="/"
        aria-label="CleverRaph home"
      >
        <img src="./src/assets/CRlogo.png" alt="CR Logo" className="h-10 w-auto md:h-11 lg:h-15" />
        <span className="font-body max-w-0 overflow-hidden whitespace-nowrap text-xl font-medium text-muted opacity-0 transition-all duration-500 ease-out group-hover:ml-3 group-hover:max-w-32 group-hover:opacity-100">
          CleverRaph
        </span>
      </Link>

      <div className="flex flex-row items-center gap-2">
        <motion.div
          className="rounded-full bg-active p-1"
          animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <Link
          className="font-body text-sm font-medium text-white transition-colors hover:text-accent md:text-md lg:text-base"
          to="/"
        >
          Open to Work
        </Link>
      </div>
    </nav>
  )
}

export default TopNavbar
