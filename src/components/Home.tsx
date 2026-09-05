import bgAvatar from '../assets/bgavatar.png'
import aboutImage from '../assets/aboutimg.png'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  IoArrowDown,
  IoCallOutline,
  IoPeopleOutline,
  IoLocationOutline,
  IoMailOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { LuArrowUpRight, LuAward } from 'react-icons/lu'

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

const achievementStats: Array<{ number: string; title: string; icon: IconType }> = [
  { number: '10+', title: 'Satisfied clients', icon: IoPeopleOutline },
  { number: '4yrs+', title: 'Experience', icon: IoTimeOutline },
  { number: '5+', title: 'Awards', icon: LuAward },
];

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
          className="pointer-events-none absolute bottom-0 right-[-55%] z-0 h-[90vh] max-w-none object-cover object-bottom opacity-65 sm:right-[-20%] sm:h-[90vh] lg:right-[10%] lg:h-[95vh]"
        />
        <div className="pointer-events-none absolute inset-0 z-1 bg-[rgba(0,0,0,0.45)]" />

        <motion.div
          className="relative z-10 flex min-h-0 flex-1 items-center py-10 pt-28 sm:py-16 sm:pt-32"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-9xl">
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
              I specialize in creating fullstack and responsive websites, web applications, and mobile apps that meet the needs of businesses and individuals alike.
            </motion.p>


            <motion.div
              className="font-body mt-15 text-sm gap-6 flex flex-col text-white/80 sm:text-base"
              variants={heroItem}
            >
              <div className="flex-row gap-5 flex flex-wrap justify-start items-center">
                <a
                  className="flex items-center gap-1 transition-colors hover:text-accent"
                  href="https://wa.me/+2348083044373"
                >
                  <IoCallOutline size={22} className="shrink-0 text-accent" aria-hidden="true" />
                  <span>+234 808-3044-373</span>
                </a>
                <a
                  className="flex items-center gap-1 transition-colors hover:text-accent"
                  href="mailto:cleveraph@gmail.com"
                >
                  <IoMailOutline size={22} className="shrink-0 text-accent" aria-hidden="true" />
                  <span>cleveraph@gmail.com</span>
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


        <div className="flex items-center justify-between pb-6 font-body text-xs uppercase tracking-[0.16em] text-white/50">
          <span>Independent creative studio</span>
          <span>01 / 04</span>
        </div>
      </section>


{/* ABOUT SECTION ========================================================================*/}
      <section id="about" className="relative isolate min-h-dvh overflow-hidden bg-bg page-padding py-28 md:py-27 sm:py-25 lg:py-40 ">
        <div className="pointer-events-none absolute -right-24 top-2 h-72 w-72 rounded-full border border-accent/20 sm:h-100 sm:w-100" />

        <motion.div
          className="relative z-10 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={heroContainer}
        >
          <motion.div className="mb-12 flex items-end justify-between border-b border-white/15 pb-5 sm:mb-16" variants={heroItem}>
            <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-accent sm:text-sm">01 / The person behind the work</p>
            <span className="font-body hidden text-xs uppercase tracking-[0.2em] text-muted sm:block">About me</span>
          </motion.div>

          <div className="flex flex-col items-center gap-12 mx-auto max-w-7xl lg:flex-row lg:items-center lg:gap-30">
            <motion.div className="relative mx-auto w-full max-w-md shrink-0 lg:mx-0 lg:w-[42%]" variants={heroItem}>
              <div className="absolute -left-5 -top-5 h-full w-full border border-accent/40 sm:-left-7 sm:-top-7" />
              <div className="relative aspect-639/723 overflow-hidden bg-[#151515]">
                <img src={aboutImage} alt="CleverRaph seated in a black suit" className="h-full w-full object-cover object-top grayscale" />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-5 pt-20 sm:p-7 sm:pt-24">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-white/65">CleverRaph</p>
                  <p className="font-display mt-1 text-xl uppercase text-white sm:text-2xl">Creative developer</p>
                </div>
              </div>
              <div className="absolute -bottom-7 -right-4 flex h-22 w-22 flex-col items-center justify-center rounded-full border border-accent">
                <a
                  href="/cv.pdf"
                  download
                  aria-label="Download CleverRaph CV"
                  className=" flex h-20 w-20 flex-col items-center justify-center rounded-full bg-accent text-center font-body text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:-right-8"
                >
                  <LuArrowUpRight size={19} className="mb-1" aria-hidden="true" />
                  <span>View<br />CV</span>
                </a>
              </div>
            </motion.div>

            <motion.div className="w-full" variants={heroItem}>
              <p className="font-body mb-4 text-sm uppercase tracking-[0.2em] text-accent">Who I am</p>
              <h2 className="font-display max-w-3xl text-4xl uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                I turn ideas into <span className="text-accent">realities.</span>
              </h2>
              <div className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-7 sm:flex-row sm:gap-10">
                <p className="font-body min-w-0 flex-1 text-base leading-relaxed text-white/75 sm:text-lg">
                  I am a multidisciplinary creative who moves between strategy, visual identity, and code. My work is built for people with something real to say, helping them turn a rough spark into a clear, memorable experience.
                </p>
                <p className="font-body min-w-0 flex-1 text-sm leading-relaxed text-muted">
                  Based in Akwa Ibom, Nigeria.<br />Working everywhere.<br /><br /><span className='text-accent'>Available for collaborations.</span>
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div className="mt-24 flex flex-col border-y border-white/15 sm:flex-row" variants={heroItem}>
            {achievementStats.map(({ number, title, icon: Icon }) => (
              <div key={number} className="flex flex-1 items-center  gap-4 border-b border-white/15 py-6 last:border-0 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 md:justify-center" >
                <Icon size={28} className="shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-display text-2xl uppercase text-white sm:text-3xl">{number}</p>
                  <h3 className="font-body mt-1 text-xs uppercase tracking-[0.14em] text-muted">{title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Home