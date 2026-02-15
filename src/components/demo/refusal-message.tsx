import { ShieldAlert, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RefusalMessageProps {
  topic: string;
  suggestedAction?: string;
  contactInfo?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function RefusalMessage({
  topic,
  suggestedAction = "専門の窓口へご相談ください",
  contactInfo,
  className,
}: RefusalMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-amber-200 bg-amber-50 p-4",
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-amber-900">
            この質問にはお答えできません
          </p>
          <p className="text-sm text-amber-800">
            「{topic}」に関するご質問は、AI による回答が適切でない分野です。
            {suggestedAction}
          </p>
          {contactInfo && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-xs h-8 border-amber-300 text-amber-800 hover:bg-amber-100"
              asChild
            >
              <a
                href={contactInfo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="size-3 mr-1.5" />
                {contactInfo.label}
                <ExternalLink className="size-3 ml-1.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
