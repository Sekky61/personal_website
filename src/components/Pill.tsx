import type { ReactNode } from 'react'

export function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="primary-container label-medium rounded-lg px-2.5 py-1 font-semibold">
      {children}
    </div>
  )
}

export function Pills({ texts }: { texts: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {texts.map((text) => (
        <Pill key={text}>{text}</Pill>
      ))}
    </div>
  )
}
