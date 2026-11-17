export type MarketCode = "NP" | "IN" | "GLOBAL";

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  desc: string;
  badge?: string;
  features: string[];
  cta: string;
}

export interface MarketConfig {
  code: MarketCode;
  routePrefix: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  currency: "NPR" | "INR" | "USD";
  currencySymbol: string;
  locale: string;
  timezone: string;
  phone: string | null;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: string | null;
  paymentGateway: "esewa" | "razorpay" | null;
  heroTagline: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDesc: string;
  budgets: string[];
  pricingTiers: PricingTier[];
}

export const MARKETS: Record<MarketCode, MarketConfig> = {
  NP: {
    code: "NP",
    routePrefix: "/np",
    name: "Nepal",
    nativeName: "नेपाल",
    flag: "🇳🇵",
    region: "Nepal",
    currency: "NPR",
    currencySymbol: "रू",
    locale: "en-NP",
    timezone: "Asia/Kathmandu",
    phone: "+977-9769294624",
    whatsapp: "9779769294624",
    whatsappDisplay: "+977 9769294624",
    email: "hello@ozeonix.com",
    address: "Opposite Gyankoop School, 13 Ward, Janakpur, Madhesh Province 45600, Nepal",
    paymentGateway: "esewa",
    heroTagline: "Powering Nepalese Startups, Colleges, and Growing Enterprises",
    heroSubtitle:
      "Enterprise-grade CRM, School & College ERP, custom web platforms and Flutter mobile apps crafted for Nepal's fastest-growing institutions and businesses.",
    metaTitle: "Software Development Company in Nepal | Ozeonix Infinity",
    metaDesc:
      "Leading custom software, CRM, ERP, and mobile app development company in Nepal. We build reliable digital platforms for schools, enterprises, and ambitious startups.",
    budgets: [
      "Under NPR 50,000",
      "NPR 50,000 – NPR 2,00,000",
      "NPR 2,00,000 – NPR 5,00,000",
      "NPR 5,00,000 – NPR 15,00,000",
      "NPR 15,00,000+",
      "Not sure yet",
    ],
    pricingTiers: [
      {
        name: "Starter Digital",
        price: "रू 35,000",
        period: "one-time",
        desc: "Ideal for local businesses, schools, and professional practices establishing a modern online presence.",
        features: [
          "Custom responsive web application",
          "Fast performance & mobile-first UI",
          "Inquiry & lead capture forms",
          "Basic on-page SEO & Google indexing",
          "WhatsApp & local contact integration",
          "3 months dedicated technical support",
        ],
        cta: "Get Started in Nepal",
      },
      {
        name: "Business Growth",
        price: "रू 85,000",
        period: "one-time",
        desc: "Designed for expanding SMEs, colleges, and e-commerce platforms requiring dynamic backend operations.",
        badge: "Most Popular",
        features: [
          "Full-stack React / TanStack web platform",
          "Custom CMS / administrative control panel",
          "eSewa payment gateway integration",
          "Cross-platform Flutter mobile app base",
          "Role-based access & automated notifications",
          "6 months maintenance & SLA warranty",
        ],
        cta: "Scale Your Business",
      },
      {
        name: "Enterprise ERP / LMS",
        price: "रू 2,20,000+",
        period: "custom quote",
        desc: "Tailored for large colleges, multi-branch corporations, and institutions needing full operational automation.",
        features: [
          "Custom ERP / LMS architecture",
          "Student/Staff portal & exam workflows",
          "Integrated accounting, billing & inventory",
          "High-concurrency cloud database setup",
          "Native iOS & Android mobile applications",
          "12 months enterprise support & onsite training",
        ],
        cta: "Request Enterprise Proposal",
      },
    ],
  },

  IN: {
    code: "IN",
    routePrefix: "/in",
    name: "India",
    nativeName: "India",
    flag: "🇮🇳",
    region: "India",
    currency: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
    timezone: "Asia/Kolkata",
    phone: null,
    whatsapp: "9779769294624",
    whatsappDisplay: "+977 9769294624",
    email: "hello@ozeonix.com",
    address: null,
    paymentGateway: "razorpay",
    heroTagline: "Engineering Scalable Software Solutions for Indian Startups & SMEs",
    heroSubtitle:
      "Full-stack web applications, cross-platform mobile apps, cloud-native ERPs, and automated CRM pipelines built with technical precision.",
    metaTitle: "Custom Software & Web Development Company in India | Ozeonix Infinity",
    metaDesc:
      "High-performance custom software, React web apps, Flutter development, and business automation engineering tailored for Indian startups and growing digital enterprises.",
    budgets: [
      "Under ₹50,000",
      "₹50,000 – ₹2,00,000",
      "₹2,00,000 – ₹8,00,000",
      "₹8,00,000 – ₹20,00,000",
      "₹20,00,000+",
      "Not sure yet",
    ],
    pricingTiers: [
      {
        name: "Startup Launchpad",
        price: "₹25,000",
        period: "one-time",
        desc: "Engineered for early-stage Indian founders and direct-to-consumer ventures moving fast to validate product-market fit.",
        features: [
          "Production-ready React 19 web application",
          "Responsive across all Indian mobile devices",
          "Lead capture & CRM intake pipeline",
          "Core Web Vitals & technical SEO setup",
          "WhatsApp Business integration",
          "90 days post-launch warranty",
        ],
        cta: "Launch Your MVP",
      },
      {
        name: "Growth & Scale",
        price: "₹65,000",
        period: "one-time",
        desc: "For funded startups, established SMEs, and service businesses requiring high-availability custom software.",
        badge: "Recommended",
        features: [
          "Full-stack custom application development",
          "Admin analytics dashboard & data reporting",
          "Razorpay / UPI payment pipeline architecture",
          "Flutter iOS & Android app synchronization",
          "Automated email & transactional notifications",
          "6 months dedicated SLA support",
        ],
        cta: "Accelerate Growth",
      },
      {
        name: "Enterprise Automation",
        price: "₹1,75,000+",
        period: "custom quote",
        desc: "Bespoke ERP, CRM, and logistics platforms designed for complex multi-tier operations and compliance.",
        features: [
          "High-volume transaction architectures",
          "Microservices & scalable cloud infrastructure",
          "Custom API integrations & legacy migration",
          "Enterprise authentication & granular RBAC",
          "Dedicated technical architect & team",
          "Annual enterprise support & maintenance",
        ],
        cta: "Consult Enterprise Team",
      },
    ],
  },

  GLOBAL: {
    code: "GLOBAL",
    routePrefix: "/global",
    name: "International",
    nativeName: "Global",
    flag: "🌐",
    region: "International",
    currency: "USD",
    currencySymbol: "$",
    locale: "en",
    timezone: "UTC",
    phone: null,
    whatsapp: "9779769294624",
    whatsappDisplay: "+977 9769294624",
    email: "hello@ozeonix.com",
    address: null,
    paymentGateway: null,
    heroTagline: "World-Class Software Engineering for Ambitious Global Brands",
    heroSubtitle:
      "Modern full-stack web platforms, Flutter mobile apps, custom cloud ERP/CRM architectures, and intelligent digital workflows delivered worldwide.",
    metaTitle: "International Software Development & Technology Solutions | Ozeonix Infinity",
    metaDesc:
      "Global software engineering studio providing bespoke web applications, Flutter mobile apps, enterprise cloud systems, and AI automation for ambitious brands worldwide.",
    budgets: [
      "Under $1,000",
      "$1,000 – $3,000",
      "$3,000 – $10,000",
      "$10,000 – $25,000",
      "$25,000+",
      "Not sure yet",
    ],
    pricingTiers: [
      {
        name: "Global Essentials",
        price: "$450",
        period: "one-time",
        desc: "Essential digital presence and web application built with clean architecture and modern UX for international founders.",
        features: [
          "Modern high-speed web application",
          "Responsive, accessible (WCAG AA) design",
          "International contact & inquiry pipeline",
          "Clean SEO foundation & metadata",
          "Global CDN caching & fast worldwide load",
          "3 months engineering warranty",
        ],
        cta: "Start Global Project",
      },
      {
        name: "Full-Stack Product",
        price: "$1,200",
        period: "one-time",
        desc: "Comprehensive product development for startups and companies seeking agile, world-class engineering execution.",
        badge: "Preferred",
        features: [
          "Custom full-stack web & API development",
          "Cross-platform Flutter mobile applications",
          "Secure authentication & database integration",
          "Automated transactional notification workflows",
          "Global cloud deployment (Vercel / Netlify / AWS)",
          "6 months dedicated support & sprint iterations",
        ],
        cta: "Build Your Product",
      },
      {
        name: "Custom Enterprise",
        price: "$3,500+",
        period: "custom quote",
        desc: "End-to-end cloud platforms, multi-tenant SaaS, custom CRM/ERP architectures, and specialized AI automation.",
        features: [
          "Distributed cloud architecture & data modeling",
          "Dedicated senior full-stack development team",
          "Enterprise security, RBAC & compliance",
          "Continuous integration & automated deployment",
          "Tailored SLAs & 24/7 incident monitoring",
          "Long-term engineering partnership",
        ],
        cta: "Schedule Architecture Call",
      },
    ],
  },
};

export const MARKET_CODES: MarketCode[] = ["NP", "IN", "GLOBAL"];

export function isValidMarketCode(code: unknown): code is MarketCode {
  return typeof code === "string" && MARKET_CODES.includes(code.toUpperCase() as MarketCode);
}

export function normalizeMarketCode(code: unknown): MarketCode {
  if (typeof code === "string") {
    const upper = code.toUpperCase();
    if (upper === "NP" || upper === "NEPAL") return "NP";
    if (upper === "IN" || upper === "INDIA") return "IN";
    if (upper === "GLOBAL" || upper === "INTERNATIONAL") return "GLOBAL";
  }
  return "GLOBAL";
}

export function getMarketConfig(code: unknown): MarketConfig {
  const norm = normalizeMarketCode(code);
  return MARKETS[norm];
}
