import { Users, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import type { UseCase } from "@/types/service";

interface UseCaseSectionProps {
  title: string;
  cases: UseCase[];
}

export function UseCaseSection({ title, cases }: UseCaseSectionProps) {
  return (
    <section className="py-16 md:py-24" aria-label="導入事例">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>

        {/* タイムライン風レイアウト */}
        <div className="mx-auto max-w-4xl space-y-12">
          {cases.map((useCase, index) => (
            <div
              key={index}
              className="relative border-l-2 border-primary/20 pl-8 md:pl-12"
            >
              {/* タイムラインドット */}
              <div className="absolute -left-3 top-0 flex size-6 items-center justify-center rounded-full bg-primary">
                <span className="text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
              </div>

              <div className="space-y-4">
                {/* ペルソナ */}
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {useCase.persona}
                  </span>
                </div>

                {/* 課題 */}
                <div className="rounded-lg bg-destructive/5 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <AlertCircle className="size-4 text-destructive" />
                    <span className="text-xs font-semibold tracking-wide text-destructive uppercase">
                      課題
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {useCase.problem}
                  </p>
                </div>

                {/* ソリューション */}
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Lightbulb className="size-4 text-primary" />
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                      ソリューション
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {useCase.solution}
                  </p>
                </div>

                {/* 効果 */}
                <div className="rounded-lg bg-accent/50 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <TrendingUp className="size-4 text-accent-foreground" />
                    <span className="text-xs font-semibold tracking-wide text-accent-foreground uppercase">
                      効果
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-accent-foreground">
                    {useCase.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
