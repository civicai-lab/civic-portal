import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Zap,
  Users,
  BarChart3,
  MessageSquare,
  BookOpen,
  Building2,
  Heart,
  Globe,
  Lightbulb,
  FileText,
  Search,
  Bell,
  Settings,
  TrendingUp,
  Award,
  Clock,
  Lock,
  type LucideIcon,
} from "lucide-react";

// アイコン名からコンポーネントへのマッピング
const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  zap: Zap,
  users: Users,
  "bar-chart-3": BarChart3,
  "message-square": MessageSquare,
  "book-open": BookOpen,
  "building-2": Building2,
  heart: Heart,
  globe: Globe,
  lightbulb: Lightbulb,
  "file-text": FileText,
  search: Search,
  bell: Bell,
  settings: Settings,
  "trending-up": TrendingUp,
  award: Award,
  clock: Clock,
  lock: Lock,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

export function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-16 md:py-24" aria-label="特長">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* グリッド */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card
                key={index}
                className="transition-shadow duration-200 hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    {IconComponent ? (
                      <IconComponent className="size-6 text-primary" />
                    ) : (
                      <Lightbulb className="size-6 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
