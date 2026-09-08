
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { allTools, disciplines } from '../constants/tools'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Tools() {
  return (
    <main id="tools" className="content-depth relative isolate overflow-hidden page-padding pb-32 pt-32 sm:pt-40 lg:pb-48">
      <div className="tools-bubble pointer-events-none absolute -right-32 top-24 h-80 w-80 sm:h-112 sm:w-md" />
      <div className="tools-bubble pointer-events-none absolute -left-36 top-[42%] h-48 w-48 opacity-60" />
      <div className="pointer-events-none absolute right-[18%] top-[18%] h-2 w-2 rounded-full bg-accent shadow-[0_0_1.5rem_rgba(232,213,183,0.8)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          className="flex flex-col gap-8 border-b border-white/15 pb-10 sm:gap-12 sm:pb-14 lg:flex-row lg:items-end lg:justify-between"
          initial="hidden"
          animate="visible"
          variants={reveal}
        >
          <div className="max-w-4xl">
            <p className="font-body mb-5 text-xs font-medium uppercase tracking-[0.28em] text-accent sm:text-sm">02 / How I build</p>
            <h1 className="display-highlight font-display text-3xl uppercase leading-[0.95] text-white sm:text-7xl lg:text-6xl">
              Ideas into <span className="text-accent">interfaces.</span>
            </h1>
          </div>
          <p className="font-body max-w-xs text-sm leading-relaxed text-muted sm:text-base lg:pb-1">
            A small, deliberate toolkit for turning thoughtful ideas into useful digital spaces.
          </p>
        </motion.header>

        <section className="mt-12 sm:mt-24" aria-labelledby="experience-heading">
          <div className="mb-7 flex items-center justify-between sm:mb-10">
            <h2 id="experience-heading" className="font-body text-xs font-medium uppercase tracking-[0.28em] text-accent sm:text-sm">Experience</h2>
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted">Plan / Design / Code</span>
          </div>

          <div className="flex flex-col gap-4">
            {disciplines.map(({ number, title, description, tools, icon: Icon }, index) => (
              <motion.article
                key={title}
                className="tools-card group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 p-5 transition-colors duration-300 sm:gap-10 sm:p-8 lg:flex-row lg:items-center lg:gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between lg:w-[31%] lg:shrink-0">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span className="font-body text-xs font-medium tracking-[0.18em] text-accent">{number}</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl uppercase text-white sm:text-3xl">{title}</h3>
                  </div>
                  {/* <IoArrowForward className="text-muted transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent lg:hidden" size={22} aria-hidden="true" /> */}
                </div>
                <p className="font-body max-w-sm text-sm leading-relaxed text-white/70 sm:text-base lg:flex-1">{description}</p>
                <div className="flex flex-wrap gap-2 lg:w-[29%] lg:justify-end">
                  {tools.map((tool) => (
                    <span key={tool} className="font-body rounded-full border border-white/15 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted transition-colors group-hover:border-accent/50 group-hover:text-white">{tool}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          className="tools-feature mt-24 rounded-3xl border border-accent/20 px-5 py-7 sm:mt-36 sm:px-8 sm:py-10"
          aria-labelledby="tools-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
        >
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 id="tools-heading" className="display-highlight font-display text-3xl uppercase text-white sm:text-5xl">The toolkit</h2>
              <p className="font-body mt-3 max-w-sm text-sm leading-relaxed text-muted">The tools change with the problem. The attention to detail stays.</p>
            </div>
            <div className="flex max-w-3xl flex-wrap gap-2 sm:justify-end">
              {allTools.map((tool, index) => (
                <span key={tool} className={`font-body rounded-full px-4 py-3 text-xs font-bold uppercase tracking-widest ${index % 4 === 0 ? 'bg-accent text-black shadow-[0_0_1.5rem_rgba(232,213,183,0.18)]' : 'border border-white/20 bg-black/10 text-white'}`}>{tool}</span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default Tools