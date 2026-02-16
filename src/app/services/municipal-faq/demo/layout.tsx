import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("municipal-faq");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
