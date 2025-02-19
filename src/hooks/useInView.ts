import { useEffect, useState, useRef } from 'react'

export const useInView = (options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry?.isIntersecting ?? false)
    }, { threshold: 0.3, ...options })

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options])

  return [elementRef, isInView] as const
}
