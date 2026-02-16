import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("minutes-summary");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
