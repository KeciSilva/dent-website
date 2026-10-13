import { redirect } from 'next/navigation'

export default async function BlogRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/sq/blog/${slug}`)
}
