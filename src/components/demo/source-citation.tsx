"use client";

import { useState } from "react";
import {
  ChevronDown,
  FileText,
  ExternalLink,
  Scale,
  BookOpen,
  HelpCircle,
  File,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Source {
  title: string;
  url?: string;
  type: "法令" | "通知" | "FAQ" | "内部文書" | "外部資料";
  relevance: number;
}

interface SourceCitationProps {
  sources: Source[];
  defaultExpanded?: boolean;
  className?: string;
}

const TYPE_ICONS: Record<Source["type"], React.ReactNode> = {
  法令: <Scale className="size-3.5" />,
  通知: <FileText className="size-3.5" />,
  FAQ: <HelpCircle className="size-3.5" />,
  内部文書: <BookOpen className="size-3.5" />,
  外部資料: <File className="size-3.5" />,
};

const TYPE_COLORS: Record<Source["type"], string> = {
  法令: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50",
  通知: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50",
  FAQ: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50",
  内部文書: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50",
  外部資料: "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/50",
};

export function SourceCitation({
  sources,
  defaultExpanded = false,
  className,
}: SourceCitationProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (sources.length === 0) return null;

  return (
    <div className={cn("mt-2", className)}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <FileText className="size-3.5" />
        根拠文書 ({sources.length}件)
        <ChevronDown
          className={cn(
            "size-3 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-1.5 animate-slide-down">
          {sources.map((source, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs p-2 rounded-md bg-muted/50"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
                  TYPE_COLORS[source.type]
                )}
              >
                {TYPE_ICONS[source.type]}
                {source.type}
              </span>
              <span className="flex-1 truncate text-foreground">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    {source.title}
                    <ExternalLink className="size-3 shrink-0" />
                  </a>
                ) : (
                  source.title
                )}
              </span>
              <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-primary/60 rounded-full"
                  style={{ width: `${source.relevance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
