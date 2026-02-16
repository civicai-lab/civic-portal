import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("book-selection");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
