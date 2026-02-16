import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("pubcom-analysis");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
