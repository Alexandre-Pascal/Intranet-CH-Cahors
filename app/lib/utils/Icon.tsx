import { icons } from "lucide-react";

export type IconProps = {
    name: keyof typeof icons
    className?: string
    strokeWidth?: number
  }

const Icon = ({ name, className, strokeWidth } : IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon className={className} strokeWidth={strokeWidth || 2.5} />;
};

export default Icon;