import { redirect } from 'next/navigation'
import { defaultLocale } from '@/lib/site-config'

export default function NotFound() {
  redirect(`/${defaultLocale}`)
}
