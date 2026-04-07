import { cn } from "@/lib/utils";
import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", compact ? "h-10 w-10" : "h-14 w-[320px]", className)}>
      {compact ? (
        <Image
          src="/Logo Automatech-13.png"
          alt="Automatech Global"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
          priority
        />
      ) : (
        <Image
          src="/Logo Automatech-10.png"
          alt="Automatech Global"
          width={320}
          height={96}
          className="h-14 w-auto object-contain"
          priority
        />
      )}
    </span>
  );
}
