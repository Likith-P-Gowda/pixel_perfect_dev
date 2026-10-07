export function Logo() {
  return (
    <span className="flex items-center gap-2 text-primary">
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M16 29V14" />
        <path d="M16 15C16 9 11 5 4 5c0 6 5 10 12 10Z" fill="currentColor" fillOpacity=".12" />
        <path d="M16 13c0-5 4-9 12-9 0 6-5 10-12 9Z" fill="currentColor" fillOpacity=".12" />
      </svg>
      <span className="font-serif text-2xl leading-none text-foreground">
        Little <em className="text-primary">Leaf</em>
      </span>
    </span>
  );
}
