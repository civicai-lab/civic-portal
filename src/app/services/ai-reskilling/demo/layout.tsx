import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("ai-reskilling");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
