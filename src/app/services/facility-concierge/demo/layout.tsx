import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("facility-concierge");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
