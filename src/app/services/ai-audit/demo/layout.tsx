import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("ai-audit");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
