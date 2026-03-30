import { cn } from "@/lib/utils";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", compact ? "gap-0" : "gap-2.5", className)}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/30 bg-[#06172d] shadow-[0_0_22px_rgba(6,182,212,0.25)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(6,182,212,0.35),transparent_65%)]" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="relative"
        >
          <defs>
            <linearGradient id="brand-mark-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path
            d="M12 3L20 21H16.7L15.2 17.5H8.8L7.3 21H4L12 3ZM10.1 14.6H13.9L12 10.1L10.1 14.6Z"
            fill="url(#brand-mark-gradient)"
          />
        </svg>
      </span>

      {!compact && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-white">Automa</span>
          <span className="gradient-text-blue">TechGlobal</span>
        </span>
      )}
    </span>
  );
}
