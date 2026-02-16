import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("assembly-archive");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
