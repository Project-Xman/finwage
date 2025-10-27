/**
 * FinWage PocketBase Seed Script
 * 
 * This script seeds the PocketBase database with realistic sample data for the FinWage application.
 * It creates 2-3 sample records per collection with proper relationships and dependencies.
 * 
 * Usage: bun run data/seed.ts or npx tsx data/seed.ts
 */

import PocketBase from 'pocketbase';

// ============================================================
// CONFIGURATION
// ============================================================

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@finwage.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345';

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
        icon: 'fa-wallet',
        count: '0'
      },
      {
        name: 'Earned Wage Access',
        slug: 'earned-wage-access',
        description: 'Everything about on-demand pay and earned wage access solutions.',
        color: '#0d2463',
        icon: 'fa-money-bill-wave',
        count: '0'
      },
      {
        name: 'Employee Benefits',
        slug: 'employee-benefits',
        description: 'Modern employee benefits and compensation strategies.',
        color: '#28a745',
        icon: 'fa-gift',
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
        name: 'Sarah Mitchell',
        slug: 'sarah-mitchell',
        email: 'sarah@finwage.com',
        bio: 'Head of Content at FinWage with 10+ years experience in fintech and employee benefits. Passionate about financial wellness and helping employees achieve financial freedom.',
        role: 'Head of Content',
        social_link: { 
          twitter: 'https://twitter.com/sarahmitchell', 
          linkedin: 'https://linkedin.com/in/sarah-mitchell-finwage' 
        },
        active: true
      },
      {
        name: 'David Chen',
        slug: 'david-chen',
        email: 'david@finwage.com',
        bio: 'Financial wellness expert and product strategist. David has helped thousands of employees improve their financial health through earned wage access.',
        role: 'Product Strategist',
        social_link: { 
          linkedin: 'https://linkedin.com/in/davidchen-finwage',
          twitter: 'https://twitter.com/davidchen_ewa'
        },
        active: true
      },
      {
        name: 'Maria Rodriguez',
        slug: 'maria-rodriguez',
        email: 'maria@finwage.com',
        bio: 'HR and benefits consultant specializing in modern compensation strategies. Maria writes about the future of work and employee financial wellness.',
        role: 'Benefits Consultant',
        social_link: { 
          linkedin: 'https://linkedin.com/in/maria-rodriguez-hr'
        },
        active: true
      }
    ];
    
    const authorRecords: any[] = [];
    for (const author of authors) {
      const record = await createRecord('authors', author, `Author: ${author.name}`);
      authorRecords.push(record);
    }
    
    const sarahAuthorId = authorRecords[0]?.id;
    const davidAuthorId = authorRecords[1]?.id;
    const mariaAuthorId = authorRecords[2]?.id;

    // ============================================================
    // 3. SEED BLOGS (Depends on authors and categories - includes SEO fields)
    // ============================================================
    console.log('\n📝 Seeding Blog Posts...');
    const blogs = [
      {
        title: 'What is Earned Wage Access and How Does It Work?',
        slug: 'what-is-earned-wage-access',
        content: '<h2>Understanding Earned Wage Access</h2><p>Earned Wage Access (EWA) is a modern financial benefit that allows employees to access their earned wages before the traditional payday. Instead of waiting two weeks for a paycheck, employees can receive a portion of their already-earned wages on-demand.</p><h3>How It Works</h3><p>The process is simple: As you work, you earn wages. With FinWage, you can access a portion of those earned wages through our mobile app, instantly. There are no loans, no interest charges, and no credit checks required.</p><h3>Benefits for Employees</h3><ul><li>Eliminate payday loans and high-interest debt</li><li>Cover unexpected expenses immediately</li><li>Reduce financial stress and anxiety</li><li>Improve overall financial wellness</li></ul><h3>Benefits for Employers</h3><ul><li>Attract and retain top talent</li><li>Increase employee satisfaction</li><li>Reduce turnover costs</li><li>Zero cost implementation</li></ul>',
        excerpt: 'Discover how Earned Wage Access revolutionizes employee financial wellness by providing instant access to earned wages without loans or interest.',
        author: sarahAuthorId,
        category: ewaCategoryId,
        tags: ['earned wage access', 'financial wellness', 'employee benefits', 'instant pay'],
        featured: true,
        published: true,
        published_date: new Date('2024-01-15').toISOString(),
        views: 2500,
        // SEO metadata fields for Next.js 15 static generation
        seo_title: 'What is Earned Wage Access? Complete Guide 2024 | FinWage',
        seo_description: 'Learn everything about Earned Wage Access (EWA) - how it works, benefits for employees and employers, and why it\'s revolutionizing workplace benefits. No loans, no interest.',
        seo_keywords: 'earned wage access, EWA, instant pay, on-demand pay, financial wellness, employee benefits, payroll advance',
        og_image: null,
        canonical_url: null
      },
      {
        title: '10 Ways to Improve Employee Financial Wellness',
        slug: '10-ways-improve-employee-financial-wellness',
        content: '<h2>Building a Financially Healthy Workforce</h2><p>Financial stress is the leading cause of employee distraction and decreased productivity. Here are 10 proven strategies to improve your employees\' financial wellness:</p><h3>1. Offer Earned Wage Access</h3><p>Give employees the flexibility to access their earned wages when they need them, not just on payday.</p><h3>2. Provide Financial Education</h3><p>Host workshops and webinars on budgeting, saving, and debt management.</p><h3>3. Emergency Savings Programs</h3><p>Help employees build emergency funds through automatic savings programs.</p><h3>4. Transparent Compensation</h3><p>Be clear about pay structures, bonuses, and benefits.</p><h3>5. Flexible Benefits Packages</h3><p>Allow employees to choose benefits that match their life stage and needs.</p><p>...and 5 more proven strategies that create real impact.</p>',
        excerpt: '10 proven strategies to reduce employee financial stress and build a financially healthy, productive workforce.',
        author: mariaAuthorId,
        category: financialWellnessCategoryId,
        tags: ['financial wellness', 'HR strategies', 'employee engagement', 'workplace benefits'],
        featured: true,
        published: true,
        published_date: new Date('2024-02-20').toISOString(),
        views: 1850,
        seo_title: '10 Proven Ways to Improve Employee Financial Wellness | FinWage',
        seo_description: 'Reduce financial stress and boost productivity with these 10 proven employee financial wellness strategies. Includes earned wage access, education programs, and more.',
        seo_keywords: 'employee financial wellness, financial stress, workplace benefits, HR strategies, employee engagement, financial education',
        og_image: null,
        canonical_url: null
      },
      {
        title: 'The True Cost of Employee Turnover and How to Reduce It',
        slug: 'true-cost-employee-turnover',
        content: '<h2>Understanding Turnover Costs</h2><p>Employee turnover is expensive. Studies show replacing an employee costs between 50% to 200% of their annual salary. But the true costs go beyond just recruitment and training.</p><h3>Hidden Costs of Turnover</h3><ul><li>Lost productivity during transition</li><li>Decreased team morale</li><li>Knowledge and skill gaps</li><li>Customer relationship disruption</li><li>Employer brand damage</li></ul><h3>How Financial Benefits Reduce Turnover</h3><p>Research shows that companies offering earned wage access see up to 27% reduction in turnover. When employees have better financial wellness, they\'re more engaged, productive, and loyal.</p><h3>Implementing Retention Strategies</h3><p>FinWage helps employers reduce turnover by providing employees with financial flexibility and peace of mind. It\'s a zero-cost benefit that pays for itself in reduced turnover alone.</p>',
        excerpt: 'Employee turnover costs more than you think. Learn the true impact and how modern benefits like earned wage access can dramatically reduce turnover rates.',
        author: davidAuthorId,
        category: benefitsCategoryId,
        tags: ['employee retention', 'turnover costs', 'HR analytics', 'earned wage access'],
        featured: false,
        published: true,
        published_date: new Date('2024-03-10').toISOString(),
        views: 1200,
        seo_title: 'The True Cost of Employee Turnover & How to Reduce It | FinWage',
        seo_description: 'Discover the hidden costs of employee turnover and proven strategies to reduce it by up to 27% using modern financial wellness benefits.',
        seo_keywords: 'employee turnover, turnover costs, employee retention, HR costs, retention strategies, earned wage access benefits',
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
        year: 2020, 
        event: 'FinWage Founded', 
        description: 'Started our mission to improve employee financial wellness through earned wage access.',
        order: 1, 
        featured: true 
      },
      { 
        year: 2022, 
        event: '1 Million Users', 
        description: 'Reached 1 million employees using FinWage for their financial wellness needs.',
        order: 2, 
        featured: true 
      },
      { 
        year: 2024, 
        event: 'National Expansion', 
        description: 'Expanded services nationwide, helping employees in all 50 states achieve financial freedom.',
        order: 3, 
        featured: false 
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
        icon: 'fa-shield-alt',
        title: 'CFPB Compliant',
        description: 'Fully compliant with Consumer Financial Protection Bureau regulations.',
        details: { 
          standard: 'CFPB', 
          certified: true,
          description: 'Our earned wage access solution meets all CFPB guidelines for financial services.'
        },
        order: 1
      },
      {
        icon: 'fa-lock',
        title: 'SOC 2 Type II Certified',
        description: 'Industry-leading security and compliance standards for data protection.',
        details: { 
          standard: 'SOC 2 Type II', 
          certified: true,
          description: 'Bank-level security protecting your employees\' financial data.'
        },
        order: 2
      },
      {
        icon: 'fa-check-circle',
        title: 'GDPR Compliant',
        description: 'Full compliance with EU data protection and privacy regulations.',
        details: { 
          standard: 'GDPR', 
          certified: true,
          description: 'Protecting employee privacy and data rights across all jurisdictions.'
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
        title: 'Schedule a Demo', 
        description: 'See FinWage in action with a personalized demo for your organization.',
        icon: 'fa-calendar-check', 
        type: 'demo', 
        action_url: 'https://finwage.com/demo',
        is_featured: true 
      },
      { 
        title: 'Talk to Sales', 
        description: 'Get pricing and implementation details from our sales team.',
        icon: 'fa-phone', 
        type: 'sales', 
        action_url: 'mailto:sales@finwage.com',
        is_featured: true 
      },
      { 
        title: 'Support Center', 
        description: 'Find answers to common questions in our help center.',
        icon: 'fa-life-ring', 
        type: 'support', 
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
        icon: 'fa-rocket',
        bg_color: '#1d44c3',
        title: 'For Employers',
        points: [
          'Zero cost implementation',
          'Reduce employee turnover by 27%',
          'Increase job applications by 35%',
          '24/7 support for your HR team'
        ],
        order: 1
      },
      {
        icon: 'fa-users',
        bg_color: '#0d2463',
        title: 'For Employees',
        points: [
          'Access earned wages instantly',
          'No loans, no interest, no credit checks',
          'Cover unexpected expenses',
          'Improve your financial wellness'
        ],
        order: 2
      },
      {
        icon: 'fa-chart-line',
        bg_color: '#28a745',
        title: 'See the Impact',
        points: [
          '90% employee satisfaction rate',
          'Average $500 saved per employee annually',
          'Used by over 5,000 companies',
          'Trusted by 1M+ employees'
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
        title: 'Instant Wage Access', 
        description: 'Access your earned wages on-demand, anytime you need them.',
        icon: 'fa-bolt', 
        category: benefitsCategoryId,
        order: 1 
      },
      { 
        title: 'Financial Wellness Tools', 
        description: 'Budgeting tools, savings tips, and financial education resources.',
        icon: 'fa-chart-pie', 
        category: financialWellnessCategoryId,
        order: 2 
      },
      { 
        title: 'No Hidden Fees', 
        description: 'Transparent pricing with no surprise charges or interest rates.',
        icon: 'fa-hand-holding-usd', 
        category: ewaCategoryId,
        order: 3 
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
        answer: 'Earned Wage Access (EWA) allows employees to access their earned wages before payday. It\'s not a loan - employees are simply accessing money they\'ve already earned.',
        category: financialWellnessCategoryId,
        category_text: 'Getting Started',
        order: 1, 
        featured: true 
      },
      { 
        question: 'How much does FinWage cost for employers?', 
        answer: 'FinWage is zero-cost for employers. We offer a sustainable model where the benefit pays for itself through reduced turnover and increased recruitment.',
        category: benefitsCategoryId,
        category_text: 'For Employers',
        order: 2, 
        featured: true 
      },
      { 
        question: 'Are there any fees for employees?', 
        answer: 'Employees can access their wages with a small transparent fee, or they can wait for the free instant transfer option. There are never any hidden charges or interest rates.',
        category: ewaCategoryId,
        category_text: 'For Employees',
        order: 3, 
        featured: false 
      }
    ];
    
    for (const faq of faqs) {
      await createRecord('faqs', faq, `FAQ: ${faq.question}`);
    }

    // ============================================================
    // 12. SEED FEATURES
    // ============================================================
    console.log('\n✨ Seeding Features...');
    const features = [
      { 
        title: 'Instant Access', 
        slug: 'instant-access',
        description: 'Get your earned wages in seconds, not days. Available 24/7 through our mobile app.',
        icon: 'fa-bolt', 
        category: ewaCategoryId,
        order: 1, 
        featured: true, 
        active: true 
      },
      { 
        title: 'Bank-Level Security', 
        slug: 'bank-security',
        description: 'Your financial data is protected with 256-bit encryption and SOC 2 Type II certification.',
        icon: 'fa-shield-alt', 
        category: financialWellnessCategoryId,
        order: 2, 
        featured: true, 
        active: true 
      },
      { 
        title: 'No Credit Check', 
        slug: 'no-credit-check',
        description: 'Access your earned wages with no credit check required. Your wages, your choice.',
        icon: 'fa-check-circle', 
        category: benefitsCategoryId,
        order: 3, 
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
        location: 'Remote (US)', 
        type: 'Full-time', 
        description: '<p>Join our engineering team to build the future of employee financial wellness. You\'ll work on scalable systems that process millions of transactions and help employees achieve financial freedom.</p>',
        requirements: '<ul><li>5+ years of full-stack development experience</li><li>Strong knowledge of React, Node.js, and PostgreSQL</li><li>Experience with fintech or payment systems</li></ul>',
        salary_range: '$140k - $180k',
        featured: true, 
        status: 'open' 
      },
      { 
        title: 'Product Marketing Manager', 
        department: 'Marketing', 
        location: 'New York, NY', 
        type: 'Full-time', 
        description: '<p>Lead our go-to-market strategy for earned wage access solutions. You\'ll craft compelling narratives that resonate with HR leaders and employees alike.</p>',
        requirements: '<ul><li>3+ years in B2B SaaS product marketing</li><li>Experience in HR tech or fintech</li><li>Strong storytelling and communication skills</li></ul>',
        salary_range: '$120k - $150k',
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
        name: 'Jennifer Adams', 
        role: 'Chief Executive Officer', 
        bio: 'Jennifer is a fintech veteran with 15+ years leading innovative financial services companies. She founded FinWage to make financial wellness accessible to every employee.',
        email: 'jennifer@finwage.com',
        order: 1, 
        featured: true, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/jennifer-adams-finwage',
          twitter: 'https://twitter.com/jennifer_ewa'
        } 
      },
      { 
        name: 'Michael Torres', 
        role: 'Chief Technology Officer', 
        bio: 'Michael brings 20 years of engineering leadership from top fintech companies. He architects the secure, scalable systems that power FinWage.',
        email: 'michael@finwage.com',
        order: 2, 
        featured: true, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/michael-torres-cto'
        } 
      },
      { 
        name: 'Priya Patel', 
        role: 'Chief Product Officer', 
        bio: 'Priya is passionate about building products that improve people\'s lives. She leads FinWage\'s product vision and ensures we\'re solving real employee needs.',
        email: 'priya@finwage.com',
        order: 3, 
        featured: false, 
        social_links: { 
          linkedin: 'https://linkedin.com/in/priya-patel-product',
          twitter: 'https://twitter.com/priya_fintech'
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
        address: '123 Market Street, Suite 400', 
        city: 'San Francisco', 
        state: 'CA', 
        zip: '94103', 
        country: 'USA', 
        phone: '+1 (415) 555-0100', 
        email: 'sf@finwage.com',
        coordinates: { lat: 37.7749, lng: -122.4194 } 
      },
      { 
        name: 'East Coast Office', 
        address: '456 Broadway, Floor 12', 
        city: 'New York', 
        state: 'NY', 
        zip: '10013', 
        country: 'USA', 
        phone: '+1 (212) 555-0200', 
        email: 'nyc@finwage.com',
        coordinates: { lat: 40.7128, lng: -74.0060 } 
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
        name: 'PayrollPro', 
        slug: 'payrollpro',
        website: 'https://payrollpro.com',
        description: 'Trusted payroll integration partner serving thousands of businesses.',
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
        title: 'FinWage Raises $50M Series B to Expand Earned Wage Access', 
        content: 'FinWage announced today a $50 million Series B funding round led by venture capital firms to expand its earned wage access platform nationwide.',
        published_date: new Date('2024-01-10').toISOString(),
        source: 'Business Wire', 
        url: 'https://businesswire.com/finwage-series-b',
        featured: true, 
        published: true 
      },
      { 
        title: 'FinWage Named Best Financial Wellness Platform 2024', 
        content: 'The company received the prestigious award for innovation in employee financial benefits and earned wage access solutions.',
        published_date: new Date('2024-02-15').toISOString(),
        source: 'HR Tech Awards', 
        url: 'https://hrtechawards.com/finwage-winner',
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
        currency: 'USD', 
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
        currency: 'USD', 
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
        currency: 'USD', 
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
    // 20. SEED PROCESS STEPS
    // ============================================================
    console.log('\n📋 Seeding Process Steps...');
    const steps = [
      { 
        step: '1', 
        title: 'Connect Your Payroll', 
        description: 'Simple integration with your existing payroll system in minutes.',
        icon: 'fa-plug', 
        category: benefitsCategoryId,
        order: 1 
      },
      { 
        step: '2', 
        title: 'Employees Download App', 
        description: 'Your team downloads the FinWage app and verifies their identity.',
        icon: 'fa-mobile-alt', 
        category: ewaCategoryId,
        order: 2 
      },
      { 
        step: '3', 
        title: 'Access Earned Wages', 
        description: 'Employees can instantly access their earned wages anytime they need.',
        icon: 'fa-hand-holding-usd', 
        category: financialWellnessCategoryId,
        order: 3 
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
      { description: 'SOC 2 Type II certified data centers', order: 2 },
      { description: 'Multi-factor authentication for enhanced security', order: 3 }
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
        company: 'Retail Corp', 
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
        title: 'Employee First', 
        description: 'We put employees at the center of everything we do. Their financial wellness is our mission.',
        icon: 'fa-users', 
        order: 1, 
        featured: true 
      },
      { 
        title: 'Transparency', 
        description: 'No hidden fees, no surprises. We believe in complete transparency in all our operations.',
        icon: 'fa-eye', 
        order: 2, 
        featured: true 
      },
      { 
        title: 'Innovation', 
        description: 'We continuously innovate to provide the best financial wellness solutions for modern workplaces.',
        icon: 'fa-lightbulb', 
        order: 3, 
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
    console.log('  - 3 Employee Benefits');
    console.log('  - 3 Employer Stats');
    console.log('  - 3 FAQ Topics');
    console.log('  - 3 FAQs');
    console.log('  - 3 Features');
    console.log('  - 3 Integrations');
    console.log('  - 2 Job Openings');
    console.log('  - 3 Leadership Team Members');
    console.log('  - 2 Office Locations');
    console.log('  - 2 Partners');
    console.log('  - 2 Press Releases');
    console.log('  - 3 Pricing Plans');
    console.log('  - 3 Process Steps');
    console.log('  - 3 Security Features');
    console.log('  - 3 Status Metrics');
    console.log('  - 3 Support Resources');
    console.log('  - 3 Testimonials');
    console.log('  - 3 Company Values');
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
