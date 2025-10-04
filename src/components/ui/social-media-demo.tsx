import React from 'react'
import { SocialTooltip, SocialItem } from './social-media'

const socialLinks: SocialItem[] = [
  { href: 'https://instagram.com/', ariaLabel: 'Instagram', tooltip: 'Instagram', color: '#E4405F' },
  { href: 'https://www.linkedin.com/', ariaLabel: 'LinkedIn', tooltip: 'LinkedIn', color: '#0A66C2' },
  { href: 'https://github.com/', ariaLabel: 'GitHub', tooltip: 'GitHub', color: '#181717' },
  { href: 'https://x.com/', ariaLabel: 'X', tooltip: 'X', color: '#1DA1F2' },
  { href: 'https://wa.me/', ariaLabel: 'WhatsApp', tooltip: 'WhatsApp', color: '#25D366' },
]

const SocialTooltipDemo = () => (
  <div className="flex items-center justify-center">
    <SocialTooltip items={socialLinks} />
  </div>
)

export default SocialTooltipDemo
