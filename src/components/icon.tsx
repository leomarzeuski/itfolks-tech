import {
  Table,
  Repeat,
  Unplug,
  EyeOff,
  MessageCircle,
  Clock,
  Code,
  Bot,
  LayoutDashboard,
  Plug,
  Workflow,
  Boxes,
  Truck,
  Bus,
  Stethoscope,
  Factory,
  ShoppingBag,
  Briefcase,
  Package,
  HardHat,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  table: Table,
  repeat: Repeat,
  unplug: Unplug,
  "eye-off": EyeOff,
  "message-circle": MessageCircle,
  clock: Clock,
  code: Code,
  bot: Bot,
  "layout-dashboard": LayoutDashboard,
  plug: Plug,
  workflow: Workflow,
  boxes: Boxes,
  truck: Truck,
  bus: Bus,
  stethoscope: Stethoscope,
  factory: Factory,
  "shopping-bag": ShoppingBag,
  briefcase: Briefcase,
  package: Package,
  "hard-hat": HardHat,
};

export function Icon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Cmp = (name && ICONS[name]) || Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
