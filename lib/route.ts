/**
 * Route paths and URLs
 * Centralized management of all application routes
 */

/**
 * Landing page routes
 * Includes all main sections and navigation paths
 */
export const ROUTES = {
  // Home
  HOME: "/",

  // Landing page sections
  SECTIONS: {
    HEADER: "#header",
    HERO: "#hero",
    PLATFORM: "#platform",
    HOW_IT_WORKS: "#how-it-works",
    PARTNERS: "#partners",
    BENEFITS: "#benefits",
    TESTIMONIALS: "#testimonials",
    ENGAGE: "#engage",
    GLOBAL_RECOGNITION: "#global-recognition",
    IMPLEMENTATION: "#implementation",
    INSIGHTS: "#insights",
    CTA: "#cta",
    FOOTER: "#footer",
  },

  // Authentication routes
  AUTH: {
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Dashboard routes
  DASHBOARD: {
    HOME: "/dashboard",
    PAYROLL: "/dashboard/payroll",
    EMPLOYEES: "/dashboard/employees",
    REPORTS: "/dashboard/reports",
    SETTINGS: "/dashboard/settings",
  },

  // Company routes
  COMPANY: {
    ABOUT: "/about",
    BLOG: "/blog",
    CAREERS: "/careers",
    PRESS: "/press",
    CONTACT: "/contact",
  },

  // Legal routes
  LEGAL: {
    PRIVACY_POLICY: "/legal/privacy",
    TERMS_OF_SERVICE: "/legal/terms",
    COOKIE_POLICY: "/legal/cookies",
  },

  // Resources
  RESOURCES: {
    DOCUMENTATION: "/docs",
    API_REFERENCE: "/docs/api",
    HELP_CENTER: "/help",
    SUPPORT: "/support",
  },
} as const;
