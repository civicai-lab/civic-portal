import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("rfp-support");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
