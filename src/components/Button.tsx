import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { ArrowUpRight } from 'lucide-react'

type ButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'quiet' }>

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <a className={`button button--${variant} ${className}`} {...props}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
    </a>
  )
}
