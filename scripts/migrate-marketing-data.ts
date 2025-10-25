/**
 * Migration script to populate PocketBase with marketing page data
 * 
 * This script creates seed data for:
 * - Compliance Items
 * - Security Features
 * - Employee Benefits (for-employees page)
 * - Employer Benefits (for-employers page)
 * - FAQs (employee category)
 * - Process Steps (employee category)
 * - Employer Stats
 * - CTA Cards
 * 
 * Run with: bun run scripts/migrate-marketing-data.ts
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@projectx.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'Admin@12345';

// Compliance Items Data
const complianceItems = [
  {
    icon: "Shield",
    title: "AML Compliance",
    description: "Full Anti-Money Laundering protocols and Know Your Customer (KYC) verification processes",
    details: [
      "Transaction monitoring and reporting",
      "Identity verification for all users",
      "Suspicious activity detection",
      "Regular compliance audits"
    ],
    order: 1
  },
  {
    icon: "Lock",
    title: "SOC 2 Type II Certified",
    description: "Independently audited security controls and operational procedures",
    details: [
      "Annual third-party security audits",
      "Comprehensive security controls",
      "Data protection measures",
      "Incident response procedures"
    ],
    order: 2
  },
  {
    icon: "FileText",
    title: "State Money Transmitter Licenses",
    description: "Licensed in all 50 states plus DC for money transmission services",
    details: [
      "Full regulatory compliance",
      "State-specific requirements met",
      "Regular license renewals",
      "Transparent reporting"
    ],
    order: 3
  },
  {
    icon: "Globe",
    title: "GDPR & CCPA Compliant",
    description: "Full compliance with global data privacy regulations",
    details: [
      "User data rights protection",
      "Right to access and deletion",
      "Data portability support",
      "Privacy by design"
    ],
    order: 4
  }
];

// Security Features Data
const securityFeatures = [
  {
    description: "256-bit AES encryption for all data at rest and in transit",
    order: 1
  },
  {
    description: "Multi-factor authentication (MFA) for all user accounts",
    order: 2
  },
  {
    description: "Real-time fraud detection and prevention systems",
    order: 3
  },
  {
    description: "Regular penetration testing by certified security firms",
    order: 4
  },
  {
    description: "24/7 security monitoring and incident response team",
    order: 5
  },
  {
    description: "Secure API endpoints with rate limiting and authentication",
    order: 6
  },
  {
    description: "Automated backup systems with disaster recovery plans",
    order: 7
  },
  {
    description: "Role-based access controls (RBAC) for all systems",
    order: 8
  }
];

// Employee Benefits Data (for-employees page)
const employeeBenefits = [
  {
    icon: "Zap",
    title: "Instant Access",
    description: "Get your earned wages in minutes, not days. Access up to 50% of your earned wages instantly.",
    order: 1
  },
  {
    icon: "Shield",
    title: "Zero Fees",
    description: "No interest, no hidden charges, no credit checks. Your earned wages are yours, completely free.",
    order: 2
  },
  {
    icon: "Heart",
    title: "Financial Wellness",
    description: "Break the payday loan cycle. Avoid overdraft fees and late payment penalties.",
    order: 3
  },
  {
    icon: "Clock",
    title: "24/7 Availability",
    description: "Access your wages anytime, anywhere through our mobile app or web platform.",
    order: 4
  },
  {
    icon: "Check",
    title: "No Credit Impact",
    description: "Using FinWage doesn't affect your credit score. No credit checks required.",
    order: 5
  },
  {
    icon: "Users",
    title: "Easy Setup",
    description: "Sign up in minutes with just your employee ID. No complicated paperwork required.",
    order: 6
  }
];

// Employer Benefits Data (for-employers page)
const employerBenefits = [
  {
    icon: "TrendingUp",
    title: "Reduce Turnover by 27%",
    description: "Employees with financial wellness benefits are significantly more likely to stay with their employer.",
    order: 1
  },
  {
    icon: "DollarSign",
    title: "Save on Recruiting Costs",
    description: "Lower turnover means less spending on recruitment, hiring, and training new employees.",
    order: 2
  },
  {
    icon: "Users",
    title: "Attract Top Talent",
    description: "Stand out from competitors by offering modern financial wellness benefits that candidates value.",
    order: 3
  },
  {
    icon: "Zap",
    title: "Boost Productivity",
    description: "Financially stressed employees are less productive. FinWage helps reduce financial anxiety.",
    order: 4
  },
  {
    icon: "Shield",
    title: "Zero Cost to Employer",
    description: "FinWage is completely free for employers. No setup fees, no monthly charges, no hidden costs.",
    order: 5
  },
  {
    icon: "Check",
    title: "Seamless Integration",
    description: "Integrates with your existing payroll system in 2-3 days. No disruption to your operations.",
    order: 6
  }
];

// FAQs Data (employee category)
const faqs = [
  {
    question: "How does FinWage work?",
    answer: "FinWage connects to your employer's payroll system to track your earned wages in real-time. You can access up to 50% of your earned wages before payday through our mobile app or website. The amount you access is automatically deducted from your next paycheck.",
    category_text: "employee",
    order: 1
  },
  {
    question: "Are there any fees for employees?",
    answer: "FinWage offers a completely free tier with no fees whatsoever. You can access your earned wages without paying any interest, subscription fees, or transaction charges. We also offer an optional premium tier with additional features for a small monthly fee.",
    category_text: "employee",
    order: 2
  },
  {
    question: "How quickly can I get my money?",
    answer: "Most transfers are completed within 1-2 business hours. In some cases, you may receive your funds instantly, depending on your bank's processing times. We work with major banks to ensure the fastest possible transfers.",
    category_text: "employee",
    order: 3
  },
  {
    question: "Is my information secure?",
    answer: "Yes, absolutely. FinWage uses bank-level 256-bit encryption to protect your data. We're SOC 2 Type II certified and comply with all major data protection regulations including GDPR and CCPA. Your employer cannot see your individual transactions or usage patterns.",
    category_text: "employee",
    order: 4
  },
  {
    question: "Will using FinWage affect my credit score?",
    answer: "No, using FinWage has no impact on your credit score. We don't perform credit checks, and we don't report to credit bureaus. This is your earned money, not a loan.",
    category_text: "employee",
    order: 5
  },
  {
    question: "What if I change jobs?",
    answer: "If you change jobs, any outstanding balance will be deducted from your final paycheck. If your new employer also offers FinWage, you can continue using the service seamlessly. If not, you can close your account once all balances are settled.",
    category_text: "employee",
    order: 6
  },
  {
    question: "How much of my wages can I access?",
    answer: "You can typically access up to 50% of your earned wages. The exact amount depends on your employer's policy and your earnings to date. The app shows you exactly how much is available at any time.",
    category_text: "employee",
    order: 7
  },
  {
    question: "Can my employer see my transactions?",
    answer: "No, your employer cannot see your individual transactions or how you use FinWage. They only see aggregate, anonymized data about program usage. Your financial privacy is completely protected.",
    category_text: "employee",
    order: 8
  }
];

// Process Steps Data (employee category)
const processSteps = [
  {
    step: "01",
    title: "Sign Up",
    description: "Download the FinWage app and create your account using your employee ID. Verification takes just minutes.",
    icon: "📱",
    category: "employee",
    order: 1
  },
  {
    step: "02",
    title: "Track Earnings",
    description: "Watch your earned wages accumulate in real-time as you work. See exactly how much you've earned and how much is available.",
    icon: "💰",
    category: "employee",
    order: 2
  },
  {
    step: "03",
    title: "Access Instantly",
    description: "Request a transfer of your available wages anytime you need them. Funds typically arrive within 1-2 hours.",
    icon: "⚡",
    category: "employee",
    order: 3
  }
];

// Employer Stats Data
const employerStats = [
  {
    value: "27%",
    label: "Reduction in Turnover",
    order: 1
  },
  {
    value: "$15K+",
    label: "Avg. Savings per Employee",
    order: 2
  },
  {
    value: "2-3 Days",
    label: "Integration Time",
    order: 3
  },
  {
    value: "99.9%",
    label: "Employee Satisfaction",
    order: 4
  }
];

// CTA Cards Data
const ctaCards = [
  {
    icon: "/assets/notification-icon.png",
    bgColor: "bg-blue-100",
    title: "For Employees",
    points: [
      "Access your earned wages instantly",
      "Zero fees and no interest charges",
      "Break free from the payday cycle"
    ],
    order: 1
  },
  {
    icon: "/assets/app-icon.png",
    bgColor: "bg-purple-100",
    title: "For Employers",
    points: [
      "Reduce turnover by up to 27%",
      "Zero cost implementation",
      "Seamless payroll integration"
    ],
    order: 2
  },
  {
    icon: "Shield",
    bgColor: "bg-green-100",
    title: "Enterprise Security",
    points: [
      "SOC 2 Type II certified",
      "Bank-level encryption",
      "24/7 security monitoring"
    ],
    order: 3
  },
  {
    icon: "Zap",
    bgColor: "bg-yellow-100",
    title: "Lightning Fast",
    points: [
      "Instant wage access in minutes",
      "Real-time earnings tracking",
      "Quick 2-3 day integration"
    ],
    order: 4
  }
];

async function main() {
  console.log('🚀 Starting marketing data migration...\n');

  const pb = new PocketBase(POCKETBASE_URL);

  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authentication successful\n');

    // Migrate Compliance Items
    console.log('📋 Migrating Compliance Items...');
    for (const item of complianceItems) {
      try {
        await pb.collection('Compliance_Items').create(item);
        console.log(`  ✓ Created: ${item.title}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create ${item.title}:`, error.message);
      }
    }
    console.log('');

    // Migrate Security Features
    console.log('🔒 Migrating Security Features...');
    for (const feature of securityFeatures) {
      try {
        await pb.collection('Security_Features').create(feature);
        console.log(`  ✓ Created: ${feature.description.substring(0, 50)}...`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create security feature:`, error.message);
      }
    }
    console.log('');

    // Migrate Employee Benefits
    console.log('👥 Migrating Employee Benefits...');
    for (const benefit of employeeBenefits) {
      try {
        await pb.collection('Employee_Benefits').create(benefit);
        console.log(`  ✓ Created: ${benefit.title}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create ${benefit.title}:`, error.message);
      }
    }
    console.log('');

    // Migrate Employer Benefits
    console.log('🏢 Migrating Employer Benefits...');
    for (const benefit of employerBenefits) {
      try {
        await pb.collection('Employer_Benefits').create(benefit);
        console.log(`  ✓ Created: ${benefit.title}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create ${benefit.title}:`, error.message);
      }
    }
    console.log('');

    // Migrate FAQs
    console.log('❓ Migrating FAQs...');
    for (const faq of faqs) {
      try {
        await pb.collection('Faqs').create(faq);
        console.log(`  ✓ Created: ${faq.question}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create FAQ:`, error.message);
      }
    }
    console.log('');

    // Migrate Process Steps
    console.log('📝 Migrating Process Steps...');
    for (const step of processSteps) {
      try {
        await pb.collection('Process_Steps').create(step);
        console.log(`  ✓ Created: Step ${step.step} - ${step.title}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create process step:`, error.message);
      }
    }
    console.log('');

    // Migrate Employer Stats
    console.log('📊 Migrating Employer Stats...');
    for (const stat of employerStats) {
      try {
        await pb.collection('Employer_Stats').create(stat);
        console.log(`  ✓ Created: ${stat.value} - ${stat.label}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create stat:`, error.message);
      }
    }
    console.log('');

    // Migrate CTA Cards
    console.log('🎯 Migrating CTA Cards...');
    for (const card of ctaCards) {
      try {
        await pb.collection('CTA_Cards').create(card);
        console.log(`  ✓ Created: ${card.title}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to create ${card.title}:`, error.message);
      }
    }
    console.log('');

    console.log('✨ Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Compliance Items: ${complianceItems.length}`);
    console.log(`  - Security Features: ${securityFeatures.length}`);
    console.log(`  - Employee Benefits: ${employeeBenefits.length}`);
    console.log(`  - Employer Benefits: ${employerBenefits.length}`);
    console.log(`  - FAQs: ${faqs.length}`);
    console.log(`  - Process Steps: ${processSteps.length}`);
    console.log(`  - Employer Stats: ${employerStats.length}`);
    console.log(`  - CTA Cards: ${ctaCards.length}`);

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

main();
