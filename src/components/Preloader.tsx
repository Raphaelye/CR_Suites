import { motion } from 'framer-motion'
import crLogo from '../assets/CRlogo.png'

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-1000 flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-bg text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-white/10 border-t-accent"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
        
        <motion.img
          src={crLogo}
          alt="CR"
          className="relative z-10 h-16 w-auto object-contain sm:h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      
    </motion.div>
  )
}

export default Preloader