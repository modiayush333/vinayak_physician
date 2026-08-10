import { useEffect } from 'react'
import { seoData } from '../assets/Data/Seo'

/**
 * Keeps document title in sync. Meta + JSON-LD live in index.html
 * so crawlers read them on first paint without waiting for JS.
 */
export default function Seo() {
  useEffect(() => {
    document.title = seoData.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', seoData.description)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', seoData.canonical)
  }, [])

  return null
}
