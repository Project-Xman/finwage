import {
  ArrowRight,
  Award,
  Building2,
  Check,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Heart,
  Lock,
  type LucideIcon,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

/**
 * Map of icon names to Lucide React icon components
 */
const iconMap: Record<string, LucideIcon> = {
  Shield,
  Lock,
  FileText,
  Globe,
  Award,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Check,
  Building2,
  ArrowRight,
};

/**
 * Get the icon component for a given icon name
 * @param iconName - The name of the icon (e.g., "Shield", "Lock")
 * @param defaultIcon - The fallback icon component to use if iconName is not found
 * @returns The icon component
 */
export function getIconComponent(
  iconName: string,
  defaultIcon: LucideIcon = Heart,
): LucideIcon {
  return iconMap[iconName] || defaultIcon;
}

/**
 * Render an icon component with the given class name
 * @param iconName - The name of the icon (e.g., "Shield", "Lock")
 * @param className - CSS classes to apply to the icon
 * @param defaultIcon - The fallback icon component to use if iconName is not found
 * @returns The rendered icon component
 */
export function renderIcon(
  iconName: string,
  className: string = "w-8 h-8",
  defaultIcon?: LucideIcon,
): React.ReactNode {
  const IconComponent = getIconComponent(iconName, defaultIcon);
  return <IconComponent className={className} />;
}
