interface KayzLogoProps {
  className?: string;
  color?: string;
}

export function KayzLogo({ className = '', color = '#0E61FE' }: KayzLogoProps) {
  return (
    <svg viewBox="0 0 400 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* KAYZ text */}
      <text x="0" y="58" fontFamily="'DM Sans', sans-serif" fontWeight="400" fontSize="64" fill={color} letterSpacing="-2">KAYZ</text>
      {/* Brandmark - 4 overlapping diamonds */}
      <g transform="translate(330, 10)">
        <path d="M16 0L28 12L16 24L4 12Z" fill={color} opacity="0.9" />
        <path d="M32 0L44 12L32 24L20 12Z" fill={color} opacity="0.7" />
        <path d="M16 16L28 28L16 40L4 28Z" fill={color} opacity="0.7" />
        <path d="M32 16L44 28L32 40L20 28Z" fill={color} opacity="0.5" />
      </g>
    </svg>
  );
}

export function KayzBrandmark({ className = '', color = '#0E61FE' }: KayzLogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8L28 20L16 32L4 20Z" fill={color} opacity="0.9" />
      <path d="M36 8L48 20L36 32L24 20Z" fill={color} opacity="0.7" />
      <path d="M16 28L28 40L16 52L4 40Z" fill={color} opacity="0.7" />
      <path d="M36 28L48 40L36 52L24 40Z" fill={color} opacity="0.5" />
    </svg>
  );
}
