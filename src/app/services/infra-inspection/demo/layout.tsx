import { generateDemoMetadata } from "@/lib/demo-metadata";

export const metadata = generateDemoMetadata("infra-inspection");

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
