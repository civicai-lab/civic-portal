import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("guideline-service");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
