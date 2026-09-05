import { useCallback, useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IoArrowForward, IoCloseOutline, IoMailOutline } from 'react-icons/io5'

import emailjs from '@emailjs/browser';

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}


function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const form = useRef<HTMLFormElement>(null)
  const dialog = useRef<HTMLElement>(null)
  const trigger = useRef<HTMLElement | null>(null)

  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSent, setIsSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submissionId = useRef(0)

  const handleClose = useCallback(() => {
    submissionId.current += 1
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
    setIsSent(false)
    setErrorMessage('')
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusFrame = requestAnimationFrame(() => {
      const focusableElements = dialog.current?.querySelectorAll<HTMLElement>(focusableSelector)
      focusableElements?.[0]?.focus()
      if (!focusableElements?.length) dialog.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()

      if (event.key !== 'Tab' || !dialog.current) return

      const focusableElements = dialog.current.querySelectorAll<HTMLElement>(focusableSelector)
      if (!focusableElements.length) {
        event.preventDefault()
        dialog.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const currentElement = document.activeElement
      const focusIsInsideDialog = dialog.current.contains(currentElement)

      if (event.shiftKey && (!focusIsInsideDialog || currentElement === firstElement)) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && (!focusIsInsideDialog || currentElement === lastElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      trigger.current?.focus()
      trigger.current = null
    }
  }, [isOpen, handleClose])

  const service_id = import.meta.env.VITE_SERVICE_ID;
  const template_id = import.meta.env.VITE_TEMPLATE_ID;
  const public_key = import.meta.env.VITE_PUBLIC_KEY;

  const sendEmail: NonNullable<React.ComponentProps<'form'>['onSubmit']> = (event) => {
    event.preventDefault()

    if (!form.current || isSubmitting) return

    const currentSubmissionId = submissionId.current + 1
    submissionId.current = currentSubmissionId
    setIsSubmitting(true)
    setErrorMessage('')

    emailjs.sendForm(service_id, template_id, form.current, { publicKey: public_key })
      .then(() => {
        if (submissionId.current !== currentSubmissionId) return

        setFormData({ name: '', email: '', message: '' })
        setIsSent(true)
      })
      .catch(() => {
        if (submissionId.current !== currentSubmissionId) return

        setErrorMessage('Something went wrong. Please try again.')
        setIsSent(false)
      })
      .finally(() => {
        if (submissionId.current !== currentSubmissionId) return

        setIsSubmitting(false)
      })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 flex justify-end bg-black/70 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(event) => event.target === event.currentTarget && handleClose()}
        >
          <motion.aside
            ref={dialog}
            className="relative flex h-full w-full flex-col overflow-y-auto border-l border-white/15 bg-[#0b0b0b] px-6 py-7 text-white shadow-2xl shadow-black/60 sm:px-10 sm:py-9 lg:w-[46vw] lg:px-14"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            tabIndex={-1}
          >
            <div className="flex items-start justify-between pb-6">
              <div>
                <p className="font-body mb-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">Let&apos;s make something</p>
                <h2 id="contact-modal-title" className="font-display max-w-lg text-4xl uppercase leading-[0.95] sm:text-5xl">Have a project in mind?</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-muted/10 cursor-pointer text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label="Close contact form"
              >
                <IoCloseOutline size={25} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-10 pt-8">
              {isSent ? (
                <div className="flex flex-1 flex-col justify-center py-10">
                  <IoMailOutline className="mb-5 text-accent" size={32} aria-hidden="true" />
                  <h3 className="font-display text-3xl uppercase">Message sent successfully </h3>
                  <p className="font-body mt-4 max-w-sm text-base leading-relaxed text-white/65">Your message has been received. I&apos;ll get back to you soon.</p>
                  <button type="button" onClick={handleClose} className="group font-body mt-8 flex w-fit items-center gap-3 border-b border-accent cursor-pointer pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                    Close
                    <IoArrowForward size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2"/>
                  </button>
                </div>
              ) : (
                <form ref={form} className="flex flex-col gap-7" onSubmit={sendEmail}>

                  <label className="font-body flex flex-col gap-2 text-sm text-white/60">
                    Your name
                    <input required type="text" name="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent" placeholder="Jane Smith" />
                  </label>

                  <label className="font-body flex flex-col gap-2 text-sm text-white/60">
                    Email address
                    <input required type="email" name="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent" placeholder="jane@company.com" />
                  </label>

                  <label className="font-body flex flex-col gap-2 text-sm text-white/60">
                    Tell me about it
                    <textarea required name="message" rows={4} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="resize-none border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent" placeholder="A few words about what you are building..." />
                  </label>

                  {errorMessage && <p className="font-body text-sm text-red-400" role="alert">{errorMessage}</p>}

                  <button type="submit" disabled={isSubmitting} className="group mt-2 flex w-full items-center justify-between bg-accent px-5 py-4 font-body text-sm font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60">
                    Start a conversation
                    <IoArrowForward className="transition-transform duration-300 group-hover:translate-x-2" size={20} aria-hidden="true" />
                  </button>


                </form>
              )} 

              <div className="flex flex-col gap-2 border-t border-white/15 pt-5 font-body text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
                <span>Usually replies within 24 hours</span>
                <p className="text-accent transition-colors">&copy; Cleveraph 2026.</p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal