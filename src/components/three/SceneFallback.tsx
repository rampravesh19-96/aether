type SceneFallbackProps = {
  className?: string
}

export function SceneFallback({ className = '' }: SceneFallbackProps) {
  return (
    <svg
      className={`scene-fallback ${className}`}
      viewBox="0 0 640 640"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="studio-halo" cx="50%" cy="46%" r="54%">
          <stop offset="0" stopColor="#7187c0" stopOpacity=".28" />
          <stop offset=".58" stopColor="#27324d" stopOpacity=".13" />
          <stop offset="1" stopColor="#08090d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chrome-body" x1=".12" y1=".08" x2=".89" y2=".94">
          <stop offset="0" stopColor="#f4f5f7" />
          <stop offset=".12" stopColor="#657080" />
          <stop offset=".27" stopColor="#e5e9ee" />
          <stop offset=".38" stopColor="#28303b" />
          <stop offset=".51" stopColor="#aeb9c8" />
          <stop offset=".65" stopColor="#303846" />
          <stop offset=".79" stopColor="#e7ebef" />
          <stop offset="1" stopColor="#596474" />
        </linearGradient>
        <linearGradient id="chrome-edge" x1=".18" y1="0" x2=".78" y2="1">
          <stop stopColor="#c8d9ff" />
          <stop offset=".32" stopColor="#65728a" />
          <stop offset=".65" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#53617c" />
        </linearGradient>
        <filter id="metal-shadow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="13" result="blur" />
          <feOffset dy="13" result="offset" />
          <feComponentTransfer><feFuncA type="linear" slope=".52" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="blue-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse cx="320" cy="320" rx="286" ry="286" fill="url(#studio-halo)" />
      <ellipse cx="321" cy="490" rx="147" ry="22" fill="#4c659a" opacity=".12" filter="url(#blue-glow)" />
      <g filter="url(#metal-shadow)" transform="rotate(-12 320 320)">
        <path d="M328 112c86-17 169 40 175 118 5 67-50 93-98 138-44 41-58 95-119 124-65 31-147-1-167-65-19-59 25-101 69-143 47-44 53-91 91-133 14-16 29-32 49-39Z" fill="none" stroke="url(#chrome-edge)" strokeWidth="58" strokeLinecap="round" />
        <path d="M328 112c86-17 169 40 175 118 5 67-50 93-98 138-44 41-58 95-119 124-65 31-147-1-167-65-19-59 25-101 69-143 47-44 53-91 91-133 14-16 29-32 49-39Z" fill="none" stroke="url(#chrome-body)" strokeWidth="48" strokeLinecap="round" />
        <path d="M304 139c31 46 68 86 116 117M195 406c44-28 95-47 145-63" fill="none" stroke="#f0f4fc" strokeWidth="4" strokeLinecap="round" opacity=".62" />
        <path d="M474 227c-7 46-48 75-91 111M189 347c27-48 67-84 94-121" fill="none" stroke="#7b9dff" strokeWidth="3" strokeLinecap="round" opacity=".72" />
        <ellipse cx="454" cy="196" rx="34" ry="10" fill="#dbe6ff" opacity=".46" transform="rotate(43 454 196)" />
        <ellipse cx="214" cy="432" rx="40" ry="8" fill="#dce3ee" opacity=".38" transform="rotate(-31 214 432)" />
      </g>
    </svg>
  )
}
