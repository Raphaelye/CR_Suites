
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { IoArrowForward } from 'react-icons/io5'
import { allTools, disciplines } from '../constants/tools'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Tools() {
  return (
    <main id="tools" className="relative isolate overflow-hidden bg-bg page-padding pb-32 pt-32 sm:pt-40 lg:pb-48">
      <div className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full border border-accent/20 sm:h-112 sm:w-md" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          className="flex flex-col gap-8 border-b border-white/15 pb-10 sm:gap-12 sm:pb-14 lg:flex-row lg:items-end lg:justify-between"
          initial="hidden"
          animate="visible"
          variants={reveal}
        >
          <div className="max-w-4xl">
            <p className="font-body mb-5 text-xs font-medium uppercase tracking-[0.28em] text-accent sm:text-sm">02 / How I build</p>
            <h1 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-7xl lg:text-6x">
              Ideas into <span className="text-accent">interfaces.</span>
            </h1>
          </div>
          <p className="font-body max-w-xs text-sm leading-relaxed text-muted sm:text-base lg:pb-1">
            A small, deliberate toolkit for turning thoughtful ideas into useful digital spaces.
          </p>
        </motion.header>

        <section className="mt-16 sm:mt-24" aria-labelledby="experience-heading">
          <div className="mb-7 flex items-center justify-between sm:mb-10">
            <h2 id="experience-heading" className="font-body text-xs font-medium uppercase tracking-[0.28em] text-accent sm:text-sm">Experience</h2>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">Plan / Design / Code</span>
          </div>

          <div className="flex flex-col border-y border-white/15">
            {disciplines.map(({ number, title, description, tools, icon: Icon }, index) => (
              <motion.article
                key={title}
                className="group flex flex-col gap-7 border-b border-white/15 py-8 last:border-b-0 sm:gap-10 sm:py-10 lg:flex-row lg:items-center lg:gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between lg:w-[31%] lg:shrink-0">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-body text-xs text-accent">{number}</span>
                    <Icon size={28} className="text-white transition-colors group-hover:text-accent" aria-hidden="true" />
                    <h3 className="font-display text-2xl uppercase text-white sm:text-3xl">{title}</h3>
                  </div>
                  <IoArrowForward className="text-muted transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent lg:hidden" size={22} aria-hidden="true" />
                </div>
                <p className="font-body max-w-sm text-sm leading-relaxed text-white/70 sm:text-base lg:flex-1">{description}</p>
                <div className="flex flex-wrap gap-2 lg:w-[29%] lg:justify-end">
                  {tools.map((tool) => (
                    <span key={tool} className="font-body font-medium border border-white/15 px-3 py-2 text-[12px] uppercase tracking-[0.08em] text-muted transition-colors group-hover:border-accent/50 group-hover:text-white">{tool}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          className="mt-24 border-t border-white/15 pt-7 sm:mt-36 sm:pt-10"
          aria-labelledby="tools-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
        >
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 id="tools-heading" className="font-display text-3xl uppercase text-white sm:text-5xl">The toolkit</h2>
              <p className="font-body mt-3 max-w-sm text-sm leading-relaxed text-muted">The tools change with the problem. The attention to detail stays.</p>
            </div>
            <div className="flex max-w-3xl flex-wrap gap-2 sm:justify-end">
              {allTools.map((tool, index) => (
                <span key={tool} className={`font-body font-bold px-4 py-3 text-xs uppercase tracking-widest ${index % 4 === 0 ? 'bg-accent text-black' : 'border border-white/20 text-white'}`}>{tool}</span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default Tools