interface Part {
  label: string;
  value: string;
  share: number; // 0..1
  tone: "mint" | "dim";
}

/** 8px two-part bar with a legend. */
export function SplitBar({ parts, label }: { parts: [Part, Part]; label: string }) {
  return (
    <div>
      <div role="img" aria-label={label} className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full">
        {parts.map((p) => (
          <span
            key={p.label}
            className={`h-full rounded-full transition-[flex-grow] duration-500 ease-out-expo ${p.tone === "mint" ? "bg-mint" : "bg-white/25"}`}
            style={{ flexGrow: Math.max(p.share, 0.001), flexBasis: 0 }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-white/70">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <span aria-hidden className={`size-2 rounded-full ${p.tone === "mint" ? "bg-mint" : "bg-white/25"}`} />
            {p.label} <span className="num text-white/90 tracking-normal">{p.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
