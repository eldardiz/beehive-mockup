/**
 * Deterministic honeycomb field rendered as a flat-top hexagon grid.
 * No randomness at render time (SSR/hydration safe). A handful of cells are
 * filled with a faint honey wash, picked by a fixed index rule so the pattern
 * is stable between server and client.
 *
 * Drop it inside a `relative` container; it positions absolute and fills.
 * Fade it with the `maskClassName` (a CSS mask-image gradient) from the caller.
 */
export function Honeycomb({
  className = "",
  stroke = "rgba(238,185,16,0.16)",
  fill = "rgba(238,160,16,0.10)",
  side = 34,
  width = 1200,
  height = 760,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
  side?: number;
  width?: number;
  height?: number;
}) {
  const s = side;
  const colStep = 1.5 * s;
  const h = Math.sqrt(3) * s;
  const cols = Math.ceil(width / colStep) + 1;
  const rows = Math.ceil(height / h) + 1;

  const hexPoints = (cx: number, cy: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i);
      pts.push(`${(cx + s * Math.cos(a)).toFixed(1)},${(cy + s * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const hexes: { key: string; pts: string; filled: boolean }[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const cx = c * colStep;
      const cy = r * h + (c % 2 ? h / 2 : 0);
      // stable, pseudo-scattered fill rule (no Math.random)
      const filled = (c * 7 + r * 3) % 11 === 0;
      hexes.push({ key: `${c}-${r}`, pts: hexPoints(cx, cy), filled });
    }
  }

  return (
    <svg
      aria-hidden
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {hexes.map((hex) =>
        hex.filled ? (
          <polygon key={hex.key} points={hex.pts} fill={fill} stroke={stroke} strokeWidth="1" />
        ) : (
          <polygon key={hex.key} points={hex.pts} fill="none" stroke={stroke} strokeWidth="1" />
        )
      )}
    </svg>
  );
}
