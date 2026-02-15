import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface ConfidenceIndicatorProps {
  confidence: number;
  showEscalation?: boolean;
  onEscalate?: () => void;
  className?: string;
}

export function ConfidenceIndicator({
  confidence,
  showEscalation = true,
  onEscalate,
  className,
}: ConfidenceIndicatorProps) {
  const getColor = () => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLabel = () => {
    if (confidence >= 80) return "高信頼度";
    if (confidence >= 60) return "中信頼度";
    return "低信頼度";
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-muted-foreground">信頼度:</span>
        <div className="flex-1 max-w-[120px] h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {confidence}% ({getLabel()})
        </span>
      </div>
      {showEscalation && confidence < 60 && (
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 border-destructive text-destructive hover:bg-destructive hover:text-white"
            onClick={onEscalate}
          >
            <Building2 className="size-3 mr-1" />
            窓口案内を表示
          </Button>
        </div>
      )}
    </div>
  );
}
