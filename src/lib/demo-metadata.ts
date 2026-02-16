import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";

export function generateDemoMetadata(slug: string): Metadata {
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: "デモ",
      description: "サービスデモページ",
    };
  }
  return {
    title: `${service.displayName} デモ`,
    description: `${service.displayName}のインタラクティブデモ。${service.tagline}`,
    openGraph: {
      title: `${service.displayName} デモ | Civic AI`,
      description: `${service.tagline} — 実際の操作感をお試しいただけます。`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
