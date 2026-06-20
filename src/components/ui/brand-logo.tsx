import { cn } from "@/lib/utils";
import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", compact ? "h-10 w-10" : "h-14 w-14", className)}>
      <Image
        src="/logo.png"
        alt="Automatech Global"
        width={500}
        height={500}
        className="h-full w-full object-contain"
        priority
      />
    </span>
  );
}
