import Image from "next/image";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface AvatarCharacterProps {
  name: string;
  imageSrc?: string;
  size?: "sm" | "md" | "lg";
  mood?: "neutral" | "happy" | "thinking";
  speaking?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { container: "size-10", text: "text-xs", icon: "size-5" },
  md: { container: "size-14", text: "text-sm", icon: "size-7" },
  lg: { container: "size-20", text: "text-base", icon: "size-10" },
};

const MOOD_COLORS = {
  neutral: "ring-primary/30",
  happy: "ring-green-400/50",
  thinking: "ring-amber-400/50",
};

export function AvatarCharacter({
  name,
  imageSrc,
  size = "md",
  mood = "neutral",
  speaking = false,
  className,
}: AvatarCharacterProps) {
  const sizeClasses = SIZE_MAP[size];

  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <div className="relative">
        {/* 発話中パルスリング */}
        {speaking && (
          <div
            className={cn(
              "absolute inset-0 rounded-full ring-4 motion-safe:animate-ping",
              MOOD_COLORS[mood]
            )}
            style={{ animationDuration: "1.5s" }}
          />
        )}

        {/* アバター本体 */}
        <div
          className={cn(
            "relative rounded-full overflow-hidden ring-2 bg-primary/10 flex items-center justify-center",
            sizeClasses.container,
            MOOD_COLORS[mood],
            speaking && "ring-4"
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${name}のアバター`}
              fill
              className="object-cover"
              sizes={size === "lg" ? "80px" : size === "md" ? "56px" : "40px"}
            />
          ) : (
            <Bot className={cn("text-primary", sizeClasses.icon)} />
          )}
        </div>

        {/* ムードインジケーター */}
        {mood === "thinking" && (
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            <span className="size-1.5 bg-amber-400 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="size-1.5 bg-amber-400 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="size-1.5 bg-amber-400 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>

      {/* 名前ラベル */}
      <span className={cn("font-medium text-foreground", sizeClasses.text)}>
        {name}
      </span>
    </div>
  );
}
