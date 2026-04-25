import { type ReactNode, useEffect, useState } from "react";
import "lsp-code-sample/style.css";
import {
  type CodeSampleObject,
  CodeSample as LspCodeSample,
  plain,
} from "lsp-code-sample";

type Token = {
  type: "error" | "warning" | "info" | "highlight";
  line: number;
  message: string;
};

type CodeProps = {
  children?: ReactNode;
  language: string;
  fileName?: string;
  lineStart?: number;
  highlights?: Token[];
  output?: string;
  codeSample?: CodeSampleObject;
};

type LspCodeProps = {
  codeSample: CodeSampleObject | string;
};

function readTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return `${node}`;
  }

  if (Array.isArray(node)) {
    return node.map(readTextContent).join("");
  }

  return "";
}

function CodeSampleFrame({ codeSample }: { codeSample: CodeSampleObject }) {
  return (
    <div className="my-6 w-full max-w-full overflow-x-auto">
      <LspCodeSample codeSample={codeSample} />
    </div>
  );
}

function CodeSampleStatus({ message }: { message: string }) {
  return (
    <div className="surface-container-high elevation-1 shape-medium my-6 p-4">
      <p className="mb-0">{message}</p>
    </div>
  );
}

export function MarkdownCode(props: CodeProps) {
  const code =
    props.codeSample ??
    plain(readTextContent(props.children), {
      ...(props.lineStart === undefined
        ? {}
        : { start_line: props.lineStart }),
      ...(props.fileName === undefined ? {} : { file_name: props.fileName }),
    });

  return <CodeSampleFrame codeSample={code} />;
}

export function LspCode({ codeSample }: LspCodeProps) {
  const [resolvedCodeSample, setResolvedCodeSample] =
    useState<CodeSampleObject | null>(
      typeof codeSample === "string" ? null : codeSample,
    );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof codeSample !== "string") {
      return;
    }

    let cancelled = false;

    void fetch(codeSample)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${codeSample}`);
        }

        return response.json() as Promise<CodeSampleObject>;
      })
      .then((data) => {
        if (!cancelled) {
          setResolvedCodeSample(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [codeSample]);

  if (error) {
    return <CodeSampleStatus message="Code sample failed to load." />;
  }

  if (!resolvedCodeSample) {
    return <CodeSampleStatus message="Loading code sample..." />;
  }

  return <CodeSampleFrame codeSample={resolvedCodeSample} />;
}
