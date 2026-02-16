import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("ai-lab");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
