/**
 * FinWage PocketBase Seed Script
 * 
 * Seeds the database with FinWage-specific content from the official documentation.
 * Usage: bun run data/seed.ts or npx tsx data/seed.ts
 */

import PocketBase from 'pocketbase';

// ============================================================
// CONFIGURATION
// ============================================================

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase.finwage.ca';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'finwage.ca@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'FinWageCasa@786';

// Initialize PocketBase client
const pb = new PocketBase(POCKETBASE_URL);

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Authenticate with PocketBase admin account
 */
async function authenticateAdmin() {
  console.log('🔐 Authenticating with PocketBase...');
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authenticated as admin successfully');
  } catch (error: any) {
    console.error('❌ Admin authentication failed:', error.message);
    throw new Error('Failed to authenticate. Please ensure PocketBase is running and admin credentials are correct.');
  }
}

/**
 * Create a record with error handling
 */
async function createRecord(collection: string, data: any, label: string) {
  try {
    const record = await pb.collection(collection).create(data);
    console.log(`  ✓ Created ${label}`);
    return record;
  } catch (error: any) {
    console.error(`  ✗ Failed to create ${label}:`, error.message);
    throw error;
  }
}

// ============================================================
// MAIN SEEDING FUNCTION
// ============================================================

async function seedData() {
  try {
    await authenticateAdmin();

    console.log('\n📊 Starting data seeding for FinWage...\n');

    // ============================================================
    // 1. SEED CATEGORIES (Independent - no dependencies)
    // ============================================================
    console.log('📁 Seeding Categories...');
    const categories = [
      {
        name: 'Financial Wellness',
        slug: 'financial-wellness',
        description: 'Tips and insights on achieving financial wellness in the workplace.',
        color: '#1d44c3',
        icon_svg: 'fa-wallet',
        count: '0'
      },
      {
        name: 'Earned Wage Access',
        slug: 'earned-wage-access',
        description: 'Everything about on-demand pay and earned wage access solutions.',
        color: '#0d2463',
        icon_svg: 'fa-money-bill-wave',
        count: '0'
      },
      {
        name: 'Employee Benefits',
        slug: 'employee-benefits',
        description: 'Modern employee benefits and compensation strategies.',
        color: '#28a745',
        icon_svg: 'fa-gift',
        count: '0'
      }
    ];
    
    const categoryRecords: any[] = [];
    for (const cat of categories) {
      const record = await createRecord('category', cat, `Category: ${cat.name}`);
      categoryRecords.push(record);
    }
    
    const financialWellnessCategoryId = categoryRecords[0]?.id;
    const ewaCategoryId = categoryRecords[1]?.id;
    const benefitsCategoryId = categoryRecords[2]?.id;

    // ============================================================
    // 2. SEED AUTHORS (Independent)
    // ============================================================
    console.log('\n👥 Seeding Authors...');
    const authors = [
      {
        name: 'Shibin Shahul',
        slug: 'shibin-shahul',
        email: 'shibin@finwage.com',
        bio: 'Founder & CEO of FinWage with extensive experience in building and scaling technology-driven businesses across the Middle East and North America. With a strong background in fintech and workforce solutions, Shibin leads FinWage with a focus on responsible innovation and operational excellence.',
        role: 'Founder & CEO',
        social_link: {
          linkedin: 'https://linkedin.com/in/shibin-shahul',
        },
        active: true
      },
      {
        name: 'Richard James',
        slug: 'richard-james',
        email: 'richard@finwage.com',
        bio: 'Chief Technology Officer leading FinWage\'s technology strategy, overseeing the design and development of secure, scalable, and high-performance platforms.',
        role: 'Chief Technology Officer',
        social_link: {
          linkedin: 'https://linkedin.com/in/richard-james-cto',
        },
        active: true
      },
      {
        name: 'Joby Varghese',
        slug: 'joby-varghese',
        email: 'joby@finwage.com',
        bio: 'Compliance Officer with strong expertise in financial services and fintech compliance, focusing on AML, KYC, data privacy, and regulatory governance.',
        role: 'Compliance Officer',
        social_link: {
          linkedin: 'https://linkedin.com/in/joby-varghese',
        },
        active: true
      }
    ];
    
    const authorRecords: any[] = [];
    for (const author of authors) {
      const record = await createRecord('authors', author, `Author: ${author.name}`);
      authorRecords.push(record);
    }
    
    const shibinAuthorId = authorRecords[0]?.id;
    const richardAuthorId = authorRecords[1]?.id;
    const jobyAuthorId = authorRecords[2]?.id;

    // ============================================================
    // 3. SEED BLOGS (Depends on authors and categories)
    // ============================================================
    console.log('\n📝 Seeding Blog Posts...');
    const blogs = [
      {
        title: 'What is Earned Wage Access and How Does It Work?',
        slug: 'what-is-earned-wage-access',
        content: '<h2>Understanding Earned Wage Access</h2><p>Earned Wage Access (EWA) is a modern financial benefit that allows employees to access their earned wages before the traditional payday. FinWage is a Canadian EWA platform that gives employees instant access to their pay helping reduce financial stress while supporting a more focused and productive workforce.</p><h3>How It Works</h3><p>The FinWage Cycle is simple:</p><ul><li><strong>Work</strong> - Employees work their scheduled hours as usual</li><li><strong>Track Earnings</strong> - Earnings are calculated in real time and updated after each workday</li><li><strong>Access When Needed</strong> - Instant access to pay no interest, no borrowing, no impact on credit</li><li><strong>Stay Steady</strong> - Manage expenses responsibly and avoid unnecessary debt</li></ul><h3>Key Benefits</h3><p>Absolutely no credit checks. No interest. No hidden fees.</p>',
        excerpt: 'Discover how Earned Wage Access revolutionizes employee financial wellness by providing instant access to earned wages without loans or interest.',
        author: shibinAuthorId,
        category: ewaCategoryId,
        tags: ['earned wage access', 'financial wellness', 'employee benefits', 'instant pay'],
        featured: true,
        published: true,
        published_date: new Date('2024-01-15').toISOString(),
        views: 2500,
        seo_title: 'What is Earned Wage Access? Complete Guide 2024 | FinWage',
        seo_description: 'Learn everything about Earned Wage Access (EWA) - how it works, benefits for employees and employers. FinWage is a Canadian EWA platform. No loans, no interest.',
        seo_keywords: 'earned wage access, EWA, instant pay, on-demand pay, financial wellness, employee benefits, Canadian EWA',
        og_image: null,
        canonical_url: null
      },
      {
        title: 'Supporting Everyday Financial Stability for Employees',
        slug: 'supporting-everyday-financial-stability',
        content: '<h2>Financial Wellness in the Workplace</h2><p>FinWage helps employees manage cash flow, cover essential expenses, and plan ahead without relying on payday loans, high-interest credit cards, or short-term borrowing.</p><h3>Smart Money Buckets</h3><p>Create smart money buckets for your goals:</p><ul><li>Vacation Fund</li><li>Car Payments</li><li>Daily Expenses</li><li>Party Wallet</li></ul><h3>Our Promise</h3><p>FinWage isn\'t about borrowing money. It\'s about accessing what you\'ve already earned. Our purpose is to improve financial wellbeing in the workplace by giving employees timely access to pay while helping employers build stronger, more resilient teams.</p>',
        excerpt: 'FinWage helps employees manage cash flow and plan ahead without relying on payday loans or high-interest credit cards.',
        author: jobyAuthorId,
        category: financialWellnessCategoryId,
        tags: ['financial wellness', 'money management', 'employee wellbeing', 'budgeting'],
        featured: true,
        published: true,
        published_date: new Date('2024-02-20').toISOString(),
        views: 1850,
        seo_title: 'Supporting Everyday Financial Stability | FinWage',
        seo_description: 'Learn how FinWage helps employees manage cash flow and cover essential expenses without payday loans or credit cards.',
        seo_keywords: 'financial stability, employee financial wellness, money management, cash flow, budgeting',
        og_image: null,
        canonical_url: null
      },
      {
        title: 'How Employers Benefit from Earned Wage Access',
        slug: 'employer-benefits-earned-wage-access',
        content: '<h2>Attract, Retain, and Empower Your Workforce</h2><p>Earned Wage Access is a proven financial wellness benefit that helps reduce financial stress, improve engagement, and strengthen retention. FinWage enables employers to offer this benefit without increasing payroll costs or disrupting payroll operations.</p><h3>Seamless Integration</h3><p>FinWage integrates directly with existing payroll, time and attendance, and HR systems ensuring accurate calculations, instant access, and a smooth experience for both employees and administrators.</p><h3>Simple to Launch</h3><p>FinWage connects with your existing payroll or workforce systems with minimal setup. Our onboarding and support teams ensure a smooth rollout and responsible employee adoption.</p><p><strong>A modern earned wage access solution without changing payroll schedules or cash flow.</strong></p>',
        excerpt: 'Earned Wage Access helps reduce financial stress, improve engagement, and strengthen retention without disrupting payroll operations.',
        author: richardAuthorId,
        category: benefitsCategoryId,
        tags: ['employer benefits', 'employee retention', 'HR solutions', 'payroll integration'],
        featured: false,
        published: true,
        published_date: new Date('2024-03-10').toISOString(),
        views: 1200,
        seo_title: 'Employer Benefits of Earned Wage Access | FinWage',
        seo_description: 'Discover how EWA helps employers attract talent, reduce turnover, and improve productivity without disrupting payroll.',
        seo_keywords: 'employer benefits, employee retention, payroll integration, HR benefits, workforce engagement',
        og_image: null,
        canonical_url: null
      }
    ];
    
    for (const blog of blogs) {
      await createRecord('blogs', blog, `Blog: ${blog.title}`);
    }

    // ============================================================
    // 4. SEED COMPANY MILESTONES
    // ============================================================
    console.log('\n🏆 Seeding Company Milestones...');
    const milestones = [
      { 
        year: 2022, 
        event: 'FinWage Founded', 
        description: 'Started our mission to transform payday for the modern workforce in Canada through responsible earned wage access.',
        order: 1, 
        featured: true 
      },
      { 
        year: 2023, 
        event: 'Platform Launch', 
        description: 'Launched our secure, scalable financial infrastructure designed for Canadian employers and employees.',
        order: 2, 
        featured: true 
      },
      { 
        year: 2024, 
        event: 'Partner Network Growth', 
        description: 'Partnered with trusted payroll, HR, and workforce technology providers to deliver secure, compliant earned wage access solutions across industries.',
        order: 3, 
        featured: true 
      }
    ];
    
    for (const milestone of milestones) {
      await createRecord('company_milestones', milestone, `Milestone: ${milestone.event}`);
    }

    // ============================================================
    // 5. SEED COMPLIANCE ITEMS
    // ============================================================
    console.log('\n🔒 Seeding Compliance Items...');
    const complianceItems = [
      {
        icon_svg: 'fa-shield-alt',
        title: 'AML & KYC Compliant',
        description: 'Full Anti-Money Laundering and Know Your Customer protocols in place.',
        details: { 
          standard: 'AML/KYC', 
          certified: true,
          description: 'Our earned wage access solution meets all regulatory guidelines for financial services in Canada.'
        },
        order: 1
      },
      {
        icon_svg: 'fa-lock',
        title: 'Data Privacy & Protection',
        description: 'Bank-level encryption and comprehensive data privacy standards.',
        details: { 
          standard: 'Data Privacy', 
          certified: true,
          description: 'Bank-level security protecting your employees\' financial data.'
        },
        order: 2
      },
      {
        icon_svg: 'fa-check-circle',
        title: 'Regulatory Governance',
        description: 'Full adherence to applicable regulations in Canada.',
        details: { 
          standard: 'Canadian Regulatory', 
          certified: true,
          description: 'FinWage is built with compliance, transparency, and responsible financial access at its core.'
        },
        order: 3
      }
    ];
    
    for (const item of complianceItems) {
      await createRecord('compliance_items', item, `Compliance: ${item.title}`);
    }

    // ============================================================
    // 6. SEED CONTACT OPTIONS
    // ============================================================
    console.log('\n📞 Seeding Contact Options...');
    const contactOptions = [
      { 
        title: 'Get a Demo', 
        description: 'See FinWage in action with a personalized demo for your organization.',
        icon_svg: 'fa-calendar-check', 
        type: 'demo', 
        action_url: 'https://finwage.com/demo',
        is_featured: true 
      },
      { 
        title: 'Talk to Sales', 
        description: 'Get pricing and implementation details from our sales team.',
        icon_svg: 'fa-phone', 
        type: 'sales', 
        action_url: 'mailto:sales@finwage.com',
        is_featured: true 
      },
      { 
        title: 'Employee Support', 
        description: 'Find answers to common questions in our help center.',
        icon_svg: 'fa-life-ring', 
        type: 'employee', 
        action_url: 'https://support.finwage.com',
        is_featured: false 
      }
    ];
    
    for (const option of contactOptions) {
      await createRecord('contact_options', option, `Contact: ${option.title}`);
    }

    // ============================================================
    // 7. SEED CTA CARDS
    // ============================================================
    console.log('\n🎯 Seeding CTA Cards...');
    const ctaCards = [
      {
        icon_svg: 'fa-briefcase',
        bg_color: '#1d44c3',
        title: 'For Employers',
        points: [
          'A smarter employee benefit without increasing salaries',
          'No payroll disruption integrates with existing systems',
          'Reduce financial stress, improve engagement',
          'Fast setup with compliance-first architecture'
        ],
        order: 1
      },
      {
        icon_svg: 'fa-users',
        bg_color: '#0d2463',
        title: 'For Employees',
        points: [
          'Work today, get paid today',
          'No loans, no interest, no credit checks',
          'Access pay any day of the week',
          'Create smart money buckets for your goals'
        ],
        order: 2
      },
      {
        icon_svg: 'fa-shield-alt',
        bg_color: '#f74b6b',
        title: 'Trust & Security',
        points: [
          'Built with compliance and transparency',
          'Bank-level security and data privacy',
          'AML & KYC compliant',
          'Responsible financial access at its core'
        ],
        order: 3
      }
    ];
    
    for (const card of ctaCards) {
      await createRecord('cta_cards', card, `CTA: ${card.title}`);
    }

    // ============================================================
    // 8. SEED EMPLOYEE BENEFITS
    // ============================================================
    console.log('\n💼 Seeding Employee Benefits...');
    const benefits = [
      { 
        title: 'Access Earned Pay When You Need It', 
        description: 'With FinWage, access a portion of your pay any day of the week without waiting for payday.',
        icon_svg: 'fa-bolt', 
        category: benefitsCategoryId,
        order: 1 
      },
      { 
        title: 'No Loans. No Interest. No Credit Checks.', 
        description: 'FinWage is not a loan. You\'re accessing your own pay, with no impact on your credit score.',
        icon_svg: 'fa-check-circle', 
        category: financialWellnessCategoryId,
        order: 2 
      },
      { 
        title: 'Stay Financially Steady', 
        description: 'We help you use your credit card responsibly rather than relying on it out of necessity. Manage expenses with confidence and reduce financial pressure.',
        icon_svg: 'fa-balance-scale', 
        category: ewaCategoryId,
        order: 3 
      },
      { 
        title: 'Smart Money Buckets', 
        description: 'Create smart money buckets for Vacation Fund, Car Payments, Daily Expenses, and more. Organize your earnings the way you want.',
        icon_svg: 'fa-piggy-bank', 
        category: financialWellnessCategoryId,
        order: 4 
      },
      { 
        title: 'No Hidden Fees', 
        description: 'Absolutely no credit checks. No interest. No hidden fees. Complete transparency in every transaction.',
        icon_svg: 'fa-hand-holding-usd', 
        category: ewaCategoryId,
        order: 5 
      },
      { 
        title: 'Supporting Financial Stability', 
        description: 'FinWage helps employees manage cash flow, cover essential expenses, and plan ahead without relying on payday loans or high-interest credit cards.',
        icon_svg: 'fa-shield-alt', 
        category: financialWellnessCategoryId,
        order: 6 
      }
    ];
    
    for (const benefit of benefits) {
      await createRecord('employee_benefits', benefit, `Benefit: ${benefit.title}`);
    }

    // ============================================================
    // 9. SEED EMPLOYER STATS
    // ============================================================
    console.log('\n📊 Seeding Employer Stats...');
    const stats = [
      { value: '27%', label: 'Reduction in Employee Turnover', order: 1 },
      { value: '35%', label: 'Increase in Job Applications', order: 2 },
      { value: '$0', label: 'Implementation Cost', order: 3 }
    ];
    
    for (const stat of stats) {
      await createRecord('employer_stats', stat, `Stat: ${stat.label}`);
    }

    // ============================================================
    // 10. SEED FAQ TOPICS
    // ============================================================
    console.log('\n❓ Seeding FAQ Topics...');
    const faqTopics = [
      { 
        name: 'Getting Started', 
        description: 'Learn the basics of FinWage and how to get started.',
        order: 1 
      },
      { 
        name: 'For Employers', 
        description: 'Implementation, costs, and benefits for organizations.',
        order: 2 
      },
      { 
        name: 'For Employees', 
        description: 'How to use FinWage and access your earned wages.',
        order: 3 
      }
    ];
    
    for (const topic of faqTopics) {
      await createRecord('faq_topics', topic, `FAQ Topic: ${topic.name}`);
    }

    // ============================================================
    // 11. SEED FAQS
    // ============================================================
    console.log('\n💬 Seeding FAQs...');
    const faqs = [
      { 
        question: 'What is Earned Wage Access?', 
        answer: 'Earned Wage Access (EWA) is a financial wellness benefit that allows employees to access their earned wages before the traditional payday. FinWage is a Canadian EWA platform that gives employees instant access to their pay it\'s not a loan, there\'s no interest, and no impact on credit.',
        category: financialWellnessCategoryId,
        category_text: 'Getting Started',
        order: 1, 
        featured: true 
      },
      { 
        question: 'Is FinWage a loan?', 
        answer: 'No, FinWage is not a loan. You\'re accessing your own pay that you\'ve already earned, with no impact on your credit score. Absolutely no credit checks, no interest, and no hidden fees.',
        category: ewaCategoryId,
        category_text: 'For Employees',
        order: 2, 
        featured: true 
      },
      { 
        question: 'How does FinWage integrate with payroll?', 
        answer: 'FinWage integrates directly with existing payroll, time and attendance, and HR systems ensuring accurate calculations, instant access, and a smooth experience for both employees and administrators. No payroll disruption and no changes to payroll cycles required.',
        category: benefitsCategoryId,
        category_text: 'For Employers',
        order: 3, 
        featured: true 
      },
      { 
        question: 'How does FinWage help employers?', 
        answer: 'Earned Wage Access is a proven financial wellness benefit that helps reduce financial stress, improve engagement, and strengthen retention. FinWage enables employers to offer this benefit without increasing payroll costs or disrupting payroll operations.',
        category: benefitsCategoryId,
        category_text: 'For Employers',
        order: 4, 
        featured: true 
      },
      { 
        question: 'How do I access my earned wages?', 
        answer: 'With FinWage, you can access a portion of your pay any day of the week without waiting for payday. Your earnings are calculated in real time and updated after each workday, giving you clear visibility into available pay.',
        category: ewaCategoryId,
        category_text: 'For Employees',
        order: 5, 
        featured: false 
      },
      { 
        question: 'Is FinWage compliant and secure?', 
        answer: 'Yes, FinWage is built with compliance, transparency, and responsible financial access at its core ensuring protection for both employees and employers. We adhere to AML, KYC, data privacy, and regulatory governance standards in Canada.',
        category: financialWellnessCategoryId,
        category_text: 'Getting Started',
        order: 6, 
        featured: false 
      }
    ];
    
    for (const faq of faqs) {
      await createRecord('faqs', faq, `FAQ: ${faq.question}`);
    }

    // ============================================================
    // 12. SEED FEATURES (Everything You Need to Empower Your Workforce)
    // ============================================================
    console.log('\n✨ Seeding Features...');
    const features = [
      { 
        title: 'Responsible Earned Wage Access', 
        slug: 'responsible-ewa',
        description: 'Instant access to pay no interest, no borrowing, no impact on credit. Access what you\'ve already earned.',
        icon_svg: 'fa-hand-holding-usd', 
        category: ewaCategoryId,
        order: 1, 
        featured: true, 
        active: true 
      },
      { 
        title: 'Payroll-Friendly Workflows', 
        slug: 'payroll-friendly',
        description: 'FinWage integrates directly with existing payroll, time and attendance, and HR systems no disruption to payroll cycles.',
        icon_svg: 'fa-sync-alt', 
        category: benefitsCategoryId,
        order: 2, 
        featured: true, 
        active: true 
      },
      { 
        title: 'Real-Time Earnings Tracking', 
        slug: 'real-time-tracking',
        description: 'Earnings are calculated in real time and updated after each workday, giving employees clear visibility into available pay.',
        icon_svg: 'fa-chart-bar', 
        category: financialWellnessCategoryId,
        order: 3, 
        featured: true, 
        active: true 
      },
      { 
        title: 'Secure & Compliant', 
        slug: 'secure-compliant',
        description: 'Built on secure, scalable financial infrastructure with compliance-focused operations for employers and employees alike.',
        icon_svg: 'fa-shield-alt', 
        category: benefitsCategoryId,
        order: 4, 
        featured: true, 
        active: true 
      },
      { 
        title: 'Operational Efficiency', 
        slug: 'operational-efficiency',
        description: 'Support financial wellness while maintaining operational efficiency. A modern solution without changing payroll schedules or cash flow.',
        icon_svg: 'fa-cogs', 
        category: ewaCategoryId,
        order: 5, 
        featured: false, 
        active: true 
      },
      { 
        title: 'Reliable by Design', 
        slug: 'reliable-design',
        description: 'Simple to use, fast to access, and reliable by design. Dependable access and consistent performance.',
        icon_svg: 'fa-check-double', 
        category: financialWellnessCategoryId,
        order: 6, 
        featured: false, 
        active: true 
      }
    ];
    
    for (const feature of features) {
      await createRecord('features', feature, `Feature: ${feature.title}`);
    }

    // ============================================================
    // 13. SEED INTEGRATIONS
    // ============================================================
    console.log('\n🔌 Seeding Integrations...');
    const integrations = [
      { 
        name: 'ADP', 
        slug: 'adp',
        description: 'Seamless integration with ADP payroll systems for automatic wage calculations.',
        documentation_url: 'https://docs.finwage.com/integrations/adp',
        featured: true, 
        order: 1, 
        active: true, 
        category: benefitsCategoryId 
      },
      { 
        name: 'Workday', 
        slug: 'workday',
        description: 'Real-time synchronization with Workday for accurate wage access.',
        documentation_url: 'https://docs.finwage.com/integrations/workday',
        featured: true, 
        order: 2, 
        active: true, 
        category: benefitsCategoryId 
      },
      { 
        name: 'BambooHR', 
        slug: 'bamboohr',
        description: 'Easy setup with BambooHR for streamlined employee benefit management.',
        documentation_url: 'https://docs.finwage.com/integrations/bamboohr',
        featured: false, 
        order: 3, 
        active: true, 
        category: benefitsCategoryId 
      }
    ];
    
    for (const integration of integrations) {
      await createRecord('integrations', integration, `Integration: ${integration.name}`);
    }

    // ============================================================
    // 14. SEED JOBS
    // ============================================================
    console.log('\n💼 Seeding Job Openings...');
    const jobs = [
      { 
        title: 'Senior Full Stack Engineer', 
        department: 'Engineering', 
        location: 'Remote (Canada)', 
        type: 'Full-time', 
        description: '<p>Join our engineering team to build the future of employee financial wellness in Canada. You\'ll work on scalable systems that help employees access their earned wages instantly.</p>',
        requirements: '<ul><li>5+ years of full-stack development experience</li><li>Strong knowledge of React, Node.js, and PostgreSQL</li><li>Experience with fintech or payment systems</li></ul>',
        salary_range: '$140k - $180k CAD',
        featured: true, 
        status: 'open' 
      },
      { 
        title: 'Product Marketing Manager', 
        department: 'Marketing', 
        location: 'Toronto, ON', 
        type: 'Full-time', 
        description: '<p>Lead our go-to-market strategy for earned wage access solutions across Canada. You\'ll craft compelling narratives that resonate with HR leaders and employees alike.</p>',
        requirements: '<ul><li>3+ years in B2B SaaS product marketing</li><li>Experience in HR tech or fintech</li><li>Strong storytelling and communication skills</li></ul>',
        salary_range: '$120k - $150k CAD',
        featured: false, 
        status: 'open' 
      }
    ];
    
    for (const job of jobs) {
      await createRecord('jobs', job, `Job: ${job.title}`);
    }

    // ============================================================
    // 15. SEED LEADERSHIP
    // ============================================================
    console.log('\n👔 Seeding Leadership Team...');
    const leadership = [
      { 
        name: 'Shibin Shahul', 
        role: 'Founder & CEO', 
        bio: 'Shibin brings extensive experience in building and scaling technology-driven businesses across the Middle East and North America. With a strong background in fintech and workforce solutions, he leads FinWage with a clear focus on responsible innovation, operational excellence, and long-term value creation for employers and employees.',
        email: 'shibin@finwage.com',
        order: 1, 
        featured: true, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/shibin-shahul'
        } 
      },
      { 
        name: 'Richard James', 
        role: 'Chief Technology Officer (CTO)', 
        bio: 'Richard leads FinWage\'s technology strategy, overseeing the design and development of secure, scalable, and high-performance platforms. With deep expertise in fintech architecture and product engineering, he ensures FinWage delivers a reliable, user-friendly experience while meeting rigorous security standards.',
        email: 'richard@finwage.com',
        order: 2, 
        featured: true, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/richard-james-cto'
        } 
      },
      { 
        name: 'Dennis Thomas', 
        role: 'Advisory Board - Finance & Payroll', 
        bio: 'A senior finance and payroll operations leader with over a decade of experience in North America, advising on payroll systems, financial operations, and workforce solutions.',
        email: 'dennis@finwage.com',
        order: 3, 
        featured: true, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/dennis-thomas'
        } 
      },
      { 
        name: 'Deepak Vijayan', 
        role: 'Advisory Board - Security & Technology', 
        bio: 'A security and technology expert with 15+ years of experience in application development and compliance across iOS, Android, and enterprise platforms, with a strong focus on secure system design.',
        email: 'deepak@finwage.com',
        order: 4, 
        featured: true, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/deepak-vijayan'
        } 
      },
      { 
        name: 'Joby Varghese', 
        role: 'Compliance Officer', 
        bio: 'Joby brings strong expertise in financial services and fintech compliance, with a focus on AML, KYC, data privacy, and regulatory governance. He oversees FinWage\'s compliance framework, internal controls, and risk management practices to ensure adherence to applicable regulations in Canada.',
        email: 'joby@finwage.com',
        order: 5, 
        featured: false, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/joby-varghese'
        } 
      }
    ];
    
    for (const leader of leadership) {
      await createRecord('leadership', leader, `Leader: ${leader.name}`);
    }

    // ============================================================
    // 16. SEED LOCATIONS
    // ============================================================
    console.log('\n📍 Seeding Office Locations...');
    const locations = [
      { 
        name: 'Headquarters', 
        address: '100 King Street West, Suite 5700', 
        city: 'Toronto', 
        state: 'ON', 
        zip: 'M5X 1C7', 
        country: 'Canada', 
        phone: '+1 (416) 555-0100', 
        email: 'info@finwage.com',
        coordinates: { lat: 43.6532, lng: -79.3832 },
        home_location: false
      },
      { 
        name: 'Western Canada Office', 
        address: 'Granville Street, Suite 1147', 
        city: 'Vancouver', 
        state: 'BC', 
        zip: '', 
        country: 'Canada', 
        phone: '+1 (672) 667-7710', 
        email: 'vancouver@finwage.com',
        coordinates: { lat: 49.2827, lng: -123.1207 },
        home_location: true
      }
    ];
    
    for (const location of locations) {
      await createRecord('locations', location, `Location: ${location.name}`);
    }

    // ============================================================
    // 17. SEED PARTNERS
    // ============================================================
    console.log('\n🤝 Seeding Partners...');
    const partners = [
      { 
        name: 'TechCorp Solutions', 
        slug: 'techcorp',
        website: 'https://techcorp.com',
        description: 'Leading technology provider for financial services infrastructure.',
        featured: true, 
        order: 1, 
        active: true, 
        category: benefitsCategoryId 
      },
      { 
        name: 'PayrollPro Canada', 
        slug: 'payrollpro',
        website: 'https://payrollpro.ca',
        description: 'Trusted Canadian payroll integration partner serving thousands of businesses.',
        featured: true, 
        order: 2, 
        active: true, 
        category: ewaCategoryId 
      }
    ];
    
    for (const partner of partners) {
      await createRecord('partners', partner, `Partner: ${partner.name}`);
    }

    // ============================================================
    // 18. SEED PRESS RELEASES
    // ============================================================
    console.log('\n📰 Seeding Press Releases...');
    const press = [
      { 
        title: 'FinWage Launches Canadian Earned Wage Access Platform', 
        content: 'FinWage announced today the launch of its Canadian Earned Wage Access platform, designed to help employees access their earned wages instantly while helping employers build stronger, more resilient teams.',
        published_date: new Date('2024-01-10').toISOString(),
        source: 'Business Wire Canada', 
        url: 'https://businesswire.com/finwage-launch',
        featured: true, 
        published: true 
      },
      { 
        title: 'FinWage Partners with Leading Canadian Payroll Providers', 
        content: 'FinWage has partnered with trusted payroll, HR, and workforce technology providers to deliver secure, compliant, and reliable earned wage access solutions across industries in Canada.',
        published_date: new Date('2024-02-15').toISOString(),
        source: 'Canadian HR Reporter', 
        url: 'https://hrreporter.com/finwage-partners',
        featured: false, 
        published: true 
      }
    ];
    
    for (const item of press) {
      await createRecord('press', item, `Press: ${item.title}`);
    }

    // ============================================================
    // 19. SEED PRICING PLANS
    // ============================================================
    console.log('\n💰 Seeding Pricing Plans...');
    const plans = [
      { 
        name: 'Starter', 
        slug: 'starter',
        description: 'Perfect for small businesses getting started with earned wage access.',
        price: 0,
        currency: 'CAD', 
        features: [
          'Up to 100 employees',
          'Instant wage access',
          'Basic reporting',
          'Email support'
        ],
        limitations: [
          'Limited to one location',
          'Standard integration support'
        ],
        is_popular: false, 
        is_enterprise: false, 
        order: 1, 
        active: true 
      },
      { 
        name: 'Professional', 
        slug: 'professional',
        description: 'Advanced features for growing organizations.',
        price: 0,
        currency: 'CAD', 
        features: [
          'Up to 1,000 employees',
          'All Starter features',
          'Advanced analytics',
          'Priority support',
          'Multiple locations',
          'Custom branding'
        ],
        limitations: [],
        is_popular: true, 
        is_enterprise: false, 
        order: 2, 
        active: true 
      },
      { 
        name: 'Enterprise', 
        slug: 'enterprise',
        description: 'Custom solution for large organizations with complex needs.',
        price: 0,
        currency: 'CAD', 
        features: [
          'Unlimited employees',
          'All Professional features',
          'Dedicated account manager',
          '24/7 phone support',
          'Custom integrations',
          'SLA guarantees',
          'On-site training'
        ],
        limitations: [],
        is_popular: false, 
        is_enterprise: true, 
        order: 3, 
        active: true 
      }
    ];
    
    for (const plan of plans) {
      await createRecord('pricing_plans', plan, `Plan: ${plan.name}`);
    }

    // ============================================================
    // 20. SEED PROCESS STEPS (FINWAGE CYCLE)
    // ============================================================
    console.log('\n📋 Seeding Process Steps (FinWage Cycle)...');
    const steps = [
      { 
        step: '1', 
        title: 'Work', 
        description: 'Employees work their scheduled hours as usual.',
        icon_svg: 'fa-briefcase', 
        category: benefitsCategoryId,
        order: 1 
      },
      { 
        step: '2', 
        title: 'Track Earnings', 
        description: 'Earnings are calculated in real time and updated after each workday, giving employees clear visibility into available pay.',
        icon_svg: 'fa-chart-bar', 
        category: ewaCategoryId,
        order: 2 
      },
      { 
        step: '3', 
        title: 'Access When Needed', 
        description: 'Instant access to pay no interest, no borrowing, no impact on credit.',
        icon_svg: 'fa-hand-holding-usd', 
        category: financialWellnessCategoryId,
        order: 3 
      },
      { 
        step: '4', 
        title: 'Stay Steady', 
        description: 'By using pay instead of credit, employees can manage expenses responsibly and avoid unnecessary debt.',
        icon_svg: 'fa-balance-scale', 
        category: financialWellnessCategoryId,
        order: 4 
      }
    ];
    
    for (const step of steps) {
      await createRecord('process_steps', step, `Step: ${step.title}`);
    }

    // ============================================================
    // 21. SEED SECURITY FEATURES
    // ============================================================
    console.log('\n🔐 Seeding Security Features...');
    const secFeatures = [
      { description: '256-bit SSL encryption for all data transmission', order: 1 },
      { description: 'Bank-level security and data privacy standards', order: 2 },
      { description: 'AML & KYC compliant financial infrastructure', order: 3 }
    ];
    
    for (const feature of secFeatures) {
      await createRecord('security_features', feature, `Security: ${feature.description}`);
    }

    // ============================================================
    // 22. SEED STATUS METRICS
    // ============================================================
    console.log('\n📈 Seeding Status Metrics...');
    const statuses = [
      { 
        metric: 'System Uptime', 
        value: '99.99%', 
        label: 'Guaranteed Uptime', 
        description: 'Industry-leading uptime for uninterrupted service.',
        order: 1 
      },
      { 
        metric: 'Average Response Time', 
        value: '<50ms', 
        label: 'Lightning Fast', 
        description: 'Instant wage access requests processed in milliseconds.',
        order: 2 
      },
      { 
        metric: 'Transaction Success Rate', 
        value: '99.97%', 
        label: 'Reliable Transfers', 
        description: 'Nearly perfect success rate for wage transfers.',
        order: 3 
      }
    ];
    
    for (const status of statuses) {
      await createRecord('status', status, `Status: ${status.metric}`);
    }

    // ============================================================
    // 23. SEED SUPPORT RESOURCES
    // ============================================================
    console.log('\n📚 Seeding Support Resources...');
    const support = [
      { 
        title: 'Help Center', 
        description: 'Comprehensive guides and FAQs for employees and employers.',
        field: 'https://help.finwage.com',
        category: financialWellnessCategoryId,
        order: 1 
      },
      { 
        title: 'API Documentation', 
        description: 'Complete API reference for developers and IT teams.',
        field: 'https://docs.finwage.com',
        category: benefitsCategoryId,
        order: 2 
      },
      { 
        title: 'Video Tutorials', 
        description: 'Step-by-step video guides for getting started.',
        field: 'https://learn.finwage.com',
        category: ewaCategoryId,
        order: 3 
      }
    ];
    
    for (const item of support) {
      await createRecord('support', item, `Support: ${item.title}`);
    }

    // ============================================================
    // 24. SEED TESTIMONIALS
    // ============================================================
    console.log('\n⭐ Seeding Testimonials...');
    const testimonials = [
      { 
        name: 'Sarah Johnson', 
        company: 'Retail Corp Canada', 
        position: 'HR Director', 
        quote: 'FinWage has transformed how we support our employees. Turnover dropped 30% in the first year, and employee satisfaction scores are at an all-time high.',
        rating: 5,
        verified: true, 
        featured: true, 
        order: true 
      },
      { 
        name: 'Marcus Williams', 
        company: 'Healthcare Plus', 
        position: 'CFO', 
        quote: 'The ROI on FinWage was immediate. We saved hundreds of thousands in turnover costs while providing a benefit our employees actually use and appreciate.',
        rating: 5,
        verified: true, 
        featured: true, 
        order: false 
      },
      { 
        name: 'Linda Chen', 
        company: 'Manufacturing Inc', 
        position: 'Operations Manager', 
        quote: 'Our frontline workers love having access to their earned wages. It\'s been a game-changer for recruitment and retention in a competitive market.',
        rating: 5,
        verified: true, 
        featured: false, 
        order: false 
      }
    ];
    
    for (const testimonial of testimonials) {
      await createRecord('testimonials', testimonial, `Testimonial: ${testimonial.name}`);
    }

    // ============================================================
    // 25. SEED COMPANY VALUES
    // ============================================================
    console.log('\n💎 Seeding Company Values...');
    const values = [
      { 
        title: 'Trustworthy', 
        description: 'Security, transparency, and compliance guide every decision we make.',
        icon_svg: 'fa-shield-alt', 
        order: 1, 
        featured: true 
      },
      { 
        title: 'Innovative', 
        description: 'We continuously improve our platform to meet evolving workplace needs.',
        icon_svg: 'fa-lightbulb', 
        order: 2, 
        featured: true 
      },
      { 
        title: 'Employee-Centric', 
        description: 'Solutions designed to reduce financial stress and empower workers.',
        icon_svg: 'fa-users', 
        order: 3, 
        featured: true 
      },
      { 
        title: 'Results-Oriented', 
        description: 'Focused on delivering measurable value for employers and their workforce.',
        icon_svg: 'fa-chart-line', 
        order: 4, 
        featured: false 
      }
    ];
    
    for (const value of values) {
      await createRecord('values', value, `Value: ${value.title}`);
    }

    console.log('\n✅ Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  - 3 Categories');
    console.log('  - 3 Authors');
    console.log('  - 3 Blog Posts (with SEO fields)');
    console.log('  - 3 Company Milestones');
    console.log('  - 3 Compliance Items');
    console.log('  - 3 Contact Options');
    console.log('  - 3 CTA Cards');
    console.log('  - 6 Employee Benefits');
    console.log('  - 3 Employer Stats');
    console.log('  - 3 FAQ Topics');
    console.log('  - 6 FAQs');
    console.log('  - 6 Features');
    console.log('  - 3 Integrations');
    console.log('  - 2 Job Openings');
    console.log('  - 5 Leadership Team Members (FinWage Team)');
    console.log('  - 2 Office Locations (Canada)');
    console.log('  - 2 Partners');
    console.log('  - 2 Press Releases');
    console.log('  - 3 Pricing Plans');
    console.log('  - 4 Process Steps (FinWage Cycle)');
    console.log('  - 3 Security Features');
    console.log('  - 3 Status Metrics');
    console.log('  - 3 Support Resources');
    console.log('  - 3 Testimonials');
    console.log('  - 4 Company Values');
    console.log('\n🎉 Your FinWage database is ready to use!\n');

  } catch (error: any) {
    console.error('\n❌ Seeding failed:', error.message);
    if (error.data) {
      console.error('Details:', JSON.stringify(error.data, null, 2));
    }
    process.exit(1);
  } finally {
    // Clear auth
    pb.authStore.clear();
  }
}

// ============================================================
// RUN SEEDER
// ============================================================

seedData();
