import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("staff-knowledge");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
