import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface SocialItem {
  href: string
  ariaLabel: string
  tooltip: string
  svgUrl?: string
  color: string
  icon?: React.ReactElement
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[]
}

// Stroked/outline SVG icons (stroke=currentColor, fill=none) for a light-outline style
const ICONS: Record<string, JSX.Element> = {
  instagram: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3} y={3} width={18} height={18} rx={5} />
      <circle cx={12} cy={12} r={3.5} />
      <circle cx={17.5} cy={6.5} r={0.6} />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.98 8.5V20.5" />
      <path d="M4.98 4.5a2 2 0 100 4 2 2 0 000-4z" />
      <path d="M11 8.5v12M11 8.5h3.5a3 3 0 013 3v6.5" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.69-3.88-1.55-3.88-1.55-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52" />
      <path d="M16.75 11.25c-1.75 0-2.25 1.5-2.25 3.25V20" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7l10 10M17 7L7 17" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 3.5A11.8 11.8 0 0012 .5 11.7 11.7 0 001.5 12c0 2 0.5 4 1.6 5.7L.5 23.5l5.4-2.1A11.8 11.8 0 0012 23.5 11.8 11.8 0 0023.5 12 11.8 11.8 0 0020.5 3.5z" />
      <path d="M16.2 14.3c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.1.2-.2.3-.5.1" />
    </svg>
  ),
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    const [hovered, setHovered] = useState<number | null>(null)

    return (
      <ul
        ref={ref}
        className={cn('flex items-center justify-center gap-3', className)}
        {...props}
      >
        {items.map((item, index) => {
          const isHovered = hovered === index
          const bgStyle: React.CSSProperties = isHovered ? { backgroundColor: item.color, boxShadow: '0 6px 18px rgba(0,0,0,0.25)' } : { backgroundColor: 'transparent' }
          const iconColor = isHovered ? '#fff' : item.color

          // pick built-in icon key by ariaLabel lowercased match or fallback to github
          const key = item.ariaLabel.toLowerCase().includes('instagram')
            ? 'instagram'
            : item.ariaLabel.toLowerCase().includes('linkedin')
            ? 'linkedin'
            : item.ariaLabel.toLowerCase().includes('github')
            ? 'github'
            : item.ariaLabel.toLowerCase().includes('whatsapp')
            ? 'whatsapp'
            : item.ariaLabel.toLowerCase().includes('x') || item.ariaLabel.toLowerCase().includes('twitter')
            ? 'x'
            : 'github'

          const Icon = ICONS[key]

          return (
            <li key={index} className="flex flex-col items-center">
              <a
                href={item.href}
                aria-label={item.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border transition-transform transform hover:scale-110 focus:scale-110 focus:outline-none overflow-hidden"
                style={bgStyle}
              >
                <span style={{ color: iconColor }} className="w-5 h-5 flex items-center justify-center">
                  {item.icon ? (
                    React.cloneElement(item.icon, { className: 'w-5 h-5 text-current' })
                  ) : item.svgUrl ? (
                    <img src={item.svgUrl} alt={item.ariaLabel} className="w-5 h-5" />
                  ) : (
                    React.cloneElement(Icon, { className: 'w-5 h-5', stroke: 'currentColor' })
                  )}
                </span>
              </a>
              {/* simple tooltip below icon */}
              <span
                className="mt-2 text-xs text-gray-300 transition-opacity duration-150"
                style={{ opacity: isHovered ? 1 : 0, transform: `translateY(${isHovered ? '0' : '4px'})` }}
              >
                {item.tooltip}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }
)

SocialTooltip.displayName = 'SocialTooltip'

export { SocialTooltip }
