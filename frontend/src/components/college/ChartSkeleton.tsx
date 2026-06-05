export function ChartSkeleton({ className = 'h-64' }: { className?: string }) {
  return (
    <div
      className={`w-full animate-pulse rounded-xl bg-gray-100 ${className}`}
      role="status"
      aria-label="Loading chart"
    />
  );
}
