import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("tourism-analytics");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
