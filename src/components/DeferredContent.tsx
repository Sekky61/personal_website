type DeferredContentProps = {
  title: string
  description: string
  source: string
  defaultOpen?: boolean
}

export function DeferredContent({
  title,
  description,
  source,
  defaultOpen = false,
}: DeferredContentProps) {
  return (
    <section className="surface-container-low elevation-1 shape-medium p-6">
      <h2 className="headline-small mb-3">{title}</h2>
      <p className="mb-4">{description}</p>

      <details open={defaultOpen}>
        <summary className="label-large cursor-pointer font-semibold">
          Show copied source
        </summary>
        <pre className="surface-container mt-4 overflow-x-auto rounded-xl p-4 whitespace-pre-wrap">
          {source}
        </pre>
      </details>
    </section>
  )
}
