"use client";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isVisible: boolean;
}

export function ChatSuggestions({ suggestions, onSelect, isVisible }: ChatSuggestionsProps) {
  if (!isVisible) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-[1.02] motion-safe:active:scale-95 transition-[colors,transform] focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:outline-none"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
