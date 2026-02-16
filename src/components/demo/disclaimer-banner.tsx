import { AlertTriangle, Info } from "lucide-react";

interface DisclaimerBannerProps {
  message?: string;
  variant?: "warning" | "info";
}

export function DisclaimerBanner({
  message = "デモ版 - 実際のデータは使用していません",
  variant = "warning",
}: DisclaimerBannerProps) {
  const isWarning = variant === "warning";
  const Icon = isWarning ? AlertTriangle : Info;

  return (
    <div
      className={`px-4 py-2 text-center border-b ${
        isWarning
          ? "bg-warning/10 border-warning/30 text-warning-foreground"
          : "bg-primary/5 border-primary/20 text-primary"
      }`}
      role="status"
    >
      <p className="text-sm flex items-center justify-center gap-2">
        <Icon className="size-4 shrink-0" />
        {message}
      </p>
    </div>
  );
}
