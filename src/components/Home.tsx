import bgAvatar from '../assets/bgavatar.png'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  IoArrowDown,
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from 'react-icons/io5';

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const titleWord: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function Home() {
  return (
    <>
      <section
        id="home"
        className="relative isolate flex h-dvh min-h-0 flex-col overflow-hidden bg-bg page-padding "
      >
        <img
          src={bgAvatar}
          alt=""
          className="pointer-events-none absolute bottom-0 right-[-55%] z-0 h-[90vh] max-w-none object-cover object-bottom opacity-65 sm:right-[-20%] sm:h-[90vh] lg:right-[4%] lg:h-[95vh]"
        />
        <div className="pointer-events-none absolute inset-0 z-1 bg-[rgba(0,0,0,0.55)]" />

        <motion.div
          className="relative z-10 flex min-h-0 flex-1 items-center py-10 pt-28 sm:py-16 sm:pt-32"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-6xl">
            <motion.p
              className="font-body mb-5 text-sm font-medium uppercase tracking-[0.28em] text-accent sm:text-md"
              variants={heroItem}
            >
              Plan | Design | Code
            </motion.p>
            <h1 className="font-display max-w-4xl text-4xl leading-[0.98] uppercase sm:text-7xl lg:text-8xl">
              <span className="mr-2 inline-block overflow-hidden pb-1 align-bottom sm:mr-4">
                <motion.span className="inline-block" variants={titleWord}>
                  Clever
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span className="inline-block text-accent" variants={titleWord}>
                  Raph.
                </motion.span>
              </span>
            </h1>
            <motion.p
              className="font-body mt-4 max-w-xl text-sm leading-relaxed text-white sm:text-lg "
              variants={heroItem}
            >
              Make your difference feel visible.
              We shape distinct brands and digital experiences for people building what comes next.
            </motion.p>


            <motion.div
              className="font-body mt-15 text-sm gap-6 flex flex-col text-white/80 sm:text-base"
              variants={heroItem}
            >
              <div className="flex-row gap-5 flex flex-wrap justify-start items-center">
                <a
                  className="flex items-center gap-1 transition-colors hover:text-accent"
                  href="tel:+23400000000"
                >
                  <IoCallOutline size={22} className="shrink-0 text-accent" aria-hidden="true" />
                  <span>+234 000- 000- 00</span>
                </a>
                <a
                  className="flex items-center gap-1 transition-colors hover:text-accent"
                  href="mailto:cleveraph27@gmail.com"
                >
                  <IoMailOutline size={22} className="shrink-0 text-accent" aria-hidden="true" />
                  <span>cleveraph27@gmail.com</span>
                </a>
              </div>
              <div className="flex items-center gap-1">
                <IoLocationOutline size={22} className="shrink-0 text-accent" aria-hidden="true" />
                <span>Akwa Ibom, Nigeria</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div
          className="absolute bottom-6 left-(--page-padding) hidden items-center transition-colors lg:flex"
          aria-label="Continue scrolling"
        >
          <motion.div
            className="flex h-15 w-8 shrink-0 items-center justify-center rounded-xl border border-muted p-2 text-2xl leading-none"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <IoArrowDown className="shrink-0" size={18} color="#b0b0b0" />
          </motion.div>
         
        </div>


        {/* <div className="flex items-center justify-between pb-6 font-body text-xs uppercase tracking-[0.16em] text-white/50">
          <span>Independent creative studio</span>
          <span>01 / 04</span>
        </div> */}
      </section>


{/* ABOUT SECTION ========================================================================*/}
      <section className="relative isolate flex h-dvh min-h-0 flex-col items-center overflow-hidden page-padding ">
        <div className="absolute inset-x-0 top-22 flex justify-center items-center pt-10 sm:pt-10 lg:pt-14 sm:top-26 " >
          <h1 className="absolute text-6xl uppercase font-display text-muted/20 sm:text-7xl md:text-8xl lg:text-9xl">
            About me
          </h1>
          <h3 className="absolute z-10 text-2xl font-body text-accent/90 sm:text-3xl md:text-4xl lg:text-5xl">
            who I am
          </h3>
        </div>
      </section>
    </>
  )
}

export default Home