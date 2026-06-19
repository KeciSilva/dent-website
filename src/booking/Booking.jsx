import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Check, Loader2, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../seo/siteConfig'

const EASE = [0.16, 1, 0.3, 1]
const ENDPOINT = 'https://api.web3forms.com/submit'

const BookingContext = createContext(null)

/** Opens the booking modal from anywhere: `const { open } = useBooking()`. */
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within <BookingProvider>')
  return ctx
}

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  return (
    <BookingContext.Provider value={{ open, close, isOpen }}>
      {children}
      <BookingModal open={isOpen} onClose={close} />
    </BookingContext.Provider>
  )
}

function Field({ label, children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso/60">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-espresso/15 bg-white/80 px-4 py-3 text-sm text-espresso ' +
  'placeholder:text-espresso/35 outline-none transition focus:border-champagne ' +
  'focus:ring-2 focus:ring-champagne/30'

function BookingModal({ open, onClose }) {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const firstFieldRef = useRef(null)
  const dialogRef = useRef(null)

  // Lock body scroll + focus first field + reset when (re)opened.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setStatus('idle')
    setError('')
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80)
    return () => {
      document.body.style.overflow = prevOverflow
      clearTimeout(t)
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Honeypot: if filled, silently "succeed" without sending.
    if (data.botcheck) {
      setStatus('success')
      return
    }

    const payload = {
      access_key: siteConfig.web3formsAccessKey,
      subject: `New booking request — ${data.name || 'Website visitor'}`,
      from_name: siteConfig.brand,
      ...data,
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setError(
          json.message ||
            'Something went wrong. Please try again or email us directly.',
        )
      }
    } catch {
      setStatus('error')
      setError('Network error. Please check your connection and try again.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-espresso/10 bg-cream p-7 shadow-[0_40px_90px_-50px_rgba(14,59,64,0.5)] sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking form"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-espresso/10 text-espresso/60 transition hover:bg-espresso/5 hover:text-espresso"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-champagne/15 text-champagne">
                  <Check className="h-7 w-7" strokeWidth={2} />
                </div>
                <h2
                  id="booking-title"
                  className="font-display text-2xl font-bold text-espresso"
                >
                  Request received.
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-espresso/[0.65]">
                  Thank you. Our concierge will be in touch shortly to arrange
                  your private consultation.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-espresso/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 pr-8">
                  <div className="mb-2 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">
                    <span className="h-px w-8 bg-champagne" />
                    Book a consultation
                  </div>
                  <h2
                    id="booking-title"
                    className="font-display text-2xl font-bold leading-tight text-espresso sm:text-3xl"
                  >
                    Begin the architecture of your smile.
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                  {/* honeypot (hidden from users) */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <Field label="Full name" htmlFor="bk-name">
                    <input
                      ref={firstFieldRef}
                      id="bk-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email" htmlFor="bk-email">
                      <input
                        id="bk-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone" htmlFor="bk-phone">
                      <input
                        id="bk-phone"
                        name="phone"
                        type="tel"
                        placeholder="+41 …"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Preferred clinic" htmlFor="bk-clinic">
                      <select id="bk-clinic" name="clinic" className={inputCls} defaultValue="">
                        <option value="" disabled>
                          Select…
                        </option>
                        {siteConfig.areaServed.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Service of interest" htmlFor="bk-service">
                      <select id="bk-service" name="service" className={inputCls} defaultValue="">
                        <option value="" disabled>
                          Select…
                        </option>
                        {siteConfig.services.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Preferred date" htmlFor="bk-date">
                    <input id="bk-date" name="preferred_date" type="date" className={inputCls} />
                  </Field>

                  <Field label="Message" htmlFor="bk-message">
                    <textarea
                      id="bk-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us a little about what you're looking for…"
                      className={inputCls + ' resize-none'}
                    />
                  </Field>

                  {status === 'error' && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-espresso/90 disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Request Consultation
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  <p className="pt-1 text-center text-[11px] font-light text-espresso/[0.45]">
                    By appointment only · We reply within one business day.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
