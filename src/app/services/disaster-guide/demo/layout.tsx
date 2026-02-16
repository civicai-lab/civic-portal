import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("disaster-guide");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
