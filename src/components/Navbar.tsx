import  { IoHomeOutline, IoFlashOutline, IoBriefcaseOutline } from "react-icons/io5"



function Navbar() {
  return (
    <nav
      className="fixed bottom-8 left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-108 -translate-x-1/2 items-center rounded-full border border-white/20 bg-glass-bg p-1 shadow-2xl shadow-black/50 backdrop-blur-sm lg:bottom-8"
      aria-label="Primary navigation"
    >
      <a
        className="font-body flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-2 py-2.5 text-xs font-medium text-black transition-colors sm:gap-2 sm:px-5 sm:text-sm"
        href="#home"
        aria-current="page"
      >
        <IoHomeOutline className="shrink-0" size={18} aria-hidden="true" />
        <span>Home</span>
      </a>
      <a
        className="font-body flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10 hover:text-accent sm:gap-2 sm:px-5 sm:text-sm"
        href="#tools"
      >
        <IoFlashOutline className="shrink-0" size={18} aria-hidden="true" />
        <span>Tools</span>
      </a>
      <a
        className="font-body flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10 hover:text-accent sm:gap-2 sm:px-5 sm:text-sm"
        href="#projects"
      >
        <IoBriefcaseOutline className="shrink-0" size={18} aria-hidden="true" />
        <span>Projects</span>
      </a>
    </nav>
  )
}

export default Navbar