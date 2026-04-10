export function LiveBadge({ running }: { running: boolean }) {
  if (!running) return null;
  return (
    <span style={{fontSize:'0.65rem',color:'var(--green)',fontWeight:'normal',textTransform:'none',letterSpacing:0}}> live</span>
  );
}
