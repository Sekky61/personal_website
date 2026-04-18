import type { ReactNode } from 'react'

type PlaceholderProps = {
  language?: string
  fileName?: string
  codeSample?: string
  children?: ReactNode
}

function Placeholder({ language, fileName, codeSample, children }: PlaceholderProps) {
  return (
    <div className="surface-container-high elevation-1 shape-medium my-6 p-4">
      <div className="title-medium mb-2">Code sample placeholder</div>
      <p className="mb-3">
        Rich MDX code rendering is deferred to the next migration iteration.
      </p>
      <ul className="body-medium m-0 list-disc pl-5">
        {language ? <li>Language: {language}</li> : null}
        {fileName ? <li>File: {fileName}</li> : null}
        {codeSample ? <li>Source asset: {codeSample}</li> : null}
        {children ? <li>Inline code content is already preserved in the copied source.</li> : null}
      </ul>
    </div>
  )
}

export function MarkdownCode(props: PlaceholderProps) {
  return <Placeholder {...props} />
}

export function LspCode(props: PlaceholderProps) {
  return <Placeholder {...props} />
}
