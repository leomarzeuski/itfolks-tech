import { cn } from "@/lib/utils";
import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", compact ? "h-10 w-10" : "h-12 w-[220px]", className)}>
      {compact ? (
        <Image
          src="/favicon.png"
          alt="Automatech Global"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl"
          priority
        />
      ) : (
        <Image
          src="/logoDark.jpeg"
          alt="Automatech Global"
          width={220}
          height={72}
          className="h-12 w-auto object-contain"
          priority
        />
      )}
    </span>
  );
}
