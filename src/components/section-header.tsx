import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  label,
  marker = "//",
  className,
}: {
  label: string;
  marker?: string;
  className?: string;
}) {
  return (
    <Reveal>
      <div className={cn("flex items-center gap-3", className)}>
        <span className="font-mono text-sm text-accent">{marker}</span>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{label}</h2>
      </div>
    </Reveal>
  );
}
