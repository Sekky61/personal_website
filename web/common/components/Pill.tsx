// Pill component, used for tags
export function Pill({ text }: { text: string }) {
  return <div className="tag-pill">{text}</div>;
}

// Pills component,
export function Pills({ texts }: { texts: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {texts.map((text: string) => {
        return <Pill key={text} text={text} />;
      })}
    </div>
  );
}
