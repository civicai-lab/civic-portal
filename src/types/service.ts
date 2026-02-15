export interface ServiceData {
  slug: string;
  serviceId: string;
  displayName: string;
  tagline: string;
  description: string;
  category: "saas" | "thinktank";
  subcategory: string;
  priority: "S" | "A" | "B" | "C";
  audience: "public" | "internal" | "mixed";
  targetCustomers: string[];
  uiTemplate: "chat" | "avatar" | "dashboard" | "none";
  riskProfile: "low" | "medium" | "high";
  features: ServiceFeature[];
  pricing: PricingPlan[];
  kpi: string[];
  useCases: UseCase[];
  faqs: FAQ[];
  thumbnail?: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface UseCase {
  persona: string;
  problem: string;
  solution: string;
  result: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
