// Configuration
const POCKETBASE_URL = "http://localhost:8090";
const SEEDER_EMAIL = "admin@projectx.com";
const SEEDER_PASSWORD = "Admin@12345";

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
    // Authenticate or create seeder user
    console.log("Logging in as seeder...");
    try {
      await pb
        .collection("users")
        .authWithPassword(SEEDER_EMAIL, SEEDER_PASSWORD);
    } catch (authError: any) {
      if (authError.status === 400) {
        console.log("User not found, creating seeder user...");
        await pb.collection("users").create({
          email: SEEDER_EMAIL,
          password: SEEDER_PASSWORD,
          passwordConfirm: SEEDER_PASSWORD,
          name: "Seeder Admin",
        });
        await pb
          .collection("users")
          .authWithPassword(SEEDER_EMAIL, SEEDER_PASSWORD);
      } else {
        throw authError;
      }
    }
    console.log("Logged in successfully.");

    // Seed categories first (independent)
    console.log("Seeding categories...");
    const categories = [
      {
        name: "Technology",
        slug: "technology",
        description: "All things tech-related.",
        color: "#007bff",
        icon: "fa-laptop",
        count: "0",
      },
      {
        name: "Business",
        slug: "business",
        description: "Business and management topics.",
        color: "#28a745",
        icon: "fa-briefcase",
        count: "0",
      },
      {
        name: "Development",
        slug: "development",
        description: "Software development insights.",
        color: "#ffc107",
        icon: "fa-code",
        count: "0",
      },
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
      const record = await pb.collection("category").create(cat);
      categoryRecords.push(record);
    }
    const techCategoryId = categoryRecords.find(
      (c: any) => c.slug === "technology",
    )?.id;
    const businessCategoryId = categoryRecords.find(
      (c: any) => c.slug === "business",
    )?.id;
    const devCategoryId = categoryRecords.find(
      (c: any) => c.slug === "development",
    )?.id;

    // Seed authors
    console.log("Seeding authors...");
    const authors = [
      {
        name: "John Doe",
        slug: "john-doe",
        email: "john@example.com",
        bio: "Senior developer with 10+ years experience.",
        role: "Developer",
        social_link: {
          twitter: "https://twitter.com/johndoe",
          linkedin: "https://linkedin.com/in/johndoe",
        },
        active: true,
      },
      {
        name: "Jane Smith",
        slug: "jane-smith",
        email: "jane@example.com",
        bio: "Product manager passionate about innovation.",
        role: "Manager",
        social_link: { twitter: "https://twitter.com/janesmith" },
        active: true,
      },
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
      const record = await pb.collection("authors").create(author);
      authorRecords.push(record);
    }
    const johnAuthorId = authorRecords.find(
      (a: any) => a.slug === "john-doe",
    )?.id;
    const janeAuthorId = authorRecords.find(
      (a: any) => a.slug === "jane-smith",
    )?.id;

    // Seed blogs (depends on authors and categories)
    console.log("Seeding blogs...");
    const blogs = [
      {
        title: "Introduction to Modern Web Development",
        slug: "intro-modern-web-dev",
        content: "<p>This is a sample blog post about web development.</p>",
        excerpt: "A quick intro to modern web tech.",
        author: johnAuthorId,
        category: techCategoryId,
        tags: ["web", "dev"],
        featured: true,
        published: true,
        published_date: new Date().toISOString(),
        views: 100,
      },
      {
        title: "Best Practices for Agile Teams",
        slug: "agile-best-practices",
        content: "<p>Exploring agile methodologies.</p>",
        excerpt: "Tips for better team collaboration.",
        author: janeAuthorId,
        category: businessCategoryId,
        tags: ["agile", "team"],
        featured: false,
        published: true,
        published_date: new Date().toISOString(),
        views: 50,
      },
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
    
    for (const blog of blogs) 
      await pb.collection("blogs").create(blog);

    // Seed company_milestones
    console.log("Seeding company milestones...");
    const milestones = [
      {
        year: 2020,
        event: "Company Founded",
        description: "Started our journey.",
        order: 1,
        featured: true,
      },
      {
        year: 2022,
        event: "First Major Funding",
        description: "Secured seed round.",
        order: 2,
        featured: false,
      },
      {
        year: 2024,
        event: "Product Launch",
        description: "Released v1.0.",
        order: 3,
        featured: true,
      },
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
    
    for (const milestone of milestones) 
      await pb.collection("company_milestones").create(milestone);

    // Seed compliance_items
    console.log("Seeding compliance items...");
    const complianceItems = [
      {
        icon: "fa-shield",
        title: "GDPR Compliant",
        description: "Full compliance with EU data protection.",
        details: { standard: "GDPR", certified: true },
        order: 1,
      },
      {
        icon: "fa-lock",
        title: "SOC 2 Certified",
        description: "Security and availability standards met.",
        details: { standard: "SOC 2", certified: true },
        order: 2,
      },
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
    
    for (const item of complianceItems) 
      await pb.collection("compliance_items").create(item);

    // Seed contact_options
    console.log("Seeding contact options...");
    const contactOptions = [
      {
        title: "Email Us",
        description: "Send a message directly.",
        icon: "fa-envelope",
        type: "email",
        action_url: "mailto:info@example.com",
        is_featured: true,
      },
      {
        title: "Schedule a Call",
        description: "Book a demo.",
        icon: "fa-calendar",
        type: "call",
        action_url: "https://cal.com/example",
        is_featured: false,
      },
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
    
    for (const option of contactOptions) 
      await pb.collection("contact_options").create(option);

    // Seed cta_cards
    console.log("Seeding CTA cards...");
    const ctaCards = [
      {
        icon: "fa-rocket",
        bg_color: "#007bff",
        title: "Get Started Today",
        points: ["Easy setup", "Free trial", "24/7 support"],
        order: 1,
      },
      {
        icon: "fa-star",
        bg_color: "#28a745",
        title: "Upgrade Your Plan",
        points: [
          "Advanced features",
          "Priority support",
          "Custom integrations",
        ],
        order: 2,
      },
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
    
    for (const card of ctaCards) 
      await pb.collection("cta_cards").create(card);

    // Seed employee_benefits (depends on category)
    console.log("Seeding employee benefits...");
    const benefits = [
      {
        title: "Health Insurance",
        description: "Comprehensive coverage.",
        icon: "fa-heart",
        category: businessCategoryId,
        order: 1,
      },
      {
        title: "Remote Work",
        description: "Work from anywhere.",
        icon: "fa-home",
        category: devCategoryId,
        order: 2,
      },
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
    
    for (const benefit of benefits) 
      await pb.collection("employee_benefits").create(benefit);

    // Seed employer_stats
    console.log("Seeding employer stats...");
    const stats = [
      { value: "500+", label: "Happy Clients", order: 1 },
      { value: "50+", label: "Team Members", order: 2 },
      { value: "10+", label: "Years Experience", order: 3 },
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
    
    for (const stat of stats) 
      await pb.collection("employer_stats").create(stat);

    // Seed enquiries (public create)
    console.log("Seeding enquiries...");
    const enquiries = [
      {
        name: "Test User",
        email: "test@example.com",
        company: "Test Corp",
        phone: 1234567890,
        message: "Interested in demo.",
        interest: "demo",
        status: "new",
      },
      {
        name: "Demo Seeker",
        email: "demo@example.com",
        company: "Demo Inc",
        phone: 9876543210,
        message: "Pricing info.",
        interest: "pricing",
        status: "new",
      },
    ];
    for (const enquiry of enquiries) {
      await pb.collection("enquiries").create(enquiry);
    }

    // Seed faq_topics
    console.log("Seeding FAQ topics...");
    const faqTopics = [
      {
        name: "Getting Started",
        description: "Basics for new users.",
        order: 1,
      },
      { name: "Troubleshooting", description: "Common issues.", order: 2 },
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
    
    for (const topic of faqTopics) 
      await pb.collection("faq_topics").create(topic);

    // Seed faqs (depends on category)
    console.log("Seeding FAQs...");
    const faqs = [
      {
        question: "How do I sign up?",
        answer: "Visit the signup page.",
        category: techCategoryId,
        order: 1,
        featured: true,
        category_text: "Getting Started",
      },
      {
        question: "What is the pricing?",
        answer: "Check our plans page.",
        category: businessCategoryId,
        order: 2,
        featured: false,
        category_text: "Pricing",
      },
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
    
    for (const faq of faqs) 
      await pb.collection("faqs").create(faq);

    // Seed features (depends on category)
    console.log("Seeding features...");
    const features = [
      {
        title: "Fast Performance",
        slug: "fast-performance",
        description: "Lightning quick.",
        icon: "fa-bolt",
        category: devCategoryId,
        order: 1,
        featured: true,
        active: true,
      },
      {
        title: "Secure Data",
        slug: "secure-data",
        description: "Top-notch security.",
        icon: "fa-shield",
        category: techCategoryId,
        order: 2,
        featured: false,
        active: true,
      },
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
    
    for (const feature of features) 
      await pb.collection("features").create(feature);

    // Seed integrations (depends on category)
    console.log("Seeding integrations...");
    const integrations = [
      {
        name: "Slack",
        slug: "slack",
        description: "Team communication.",
        documentation_url: "https://slack.com/docs",
        featured: true,
        order: 1,
        active: true,
        category: businessCategoryId,
      },
      {
        name: "GitHub",
        slug: "github",
        description: "Code repository.",
        documentation_url: "https://github.com/docs",
        featured: false,
        order: 2,
        active: true,
        category: devCategoryId,
      },
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
    
    for (const integration of integrations) 
      await pb.collection("integrations").create(integration);

    // Seed jobs
    console.log("Seeding jobs...");
    const jobs = [
      {
        title: "Senior Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "Build amazing things.",
        requirements: "5+ years exp.",
        salary_range: "$100k-$150k",
        featured: true,
        status: "open",
      },
      {
        title: "Product Manager",
        department: "Product",
        location: "NYC",
        type: "Full-time",
        description: "Lead the team.",
        requirements: "3+ years.",
        salary_range: "$120k-$160k",
        featured: false,
        status: "open",
      },
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
    
    for (const job of jobs) 
      await pb.collection("jobs").create(job);

    // Seed leadership
    console.log("Seeding leadership...");
    const leadership = [
      {
        name: "Alice Johnson",
        role: "CEO",
        bio: "Visionary leader.",
        email: "alice@company.com",
        order: 1,
        featured: true,
        social_links: { linkedin: "https://linkedin.com/in/alice" },
      },
      {
        name: "Bob Wilson",
        role: "CTO",
        bio: "Tech expert.",
        email: "bob@company.com",
        order: 2,
        featured: false,
        social_links: { twitter: "https://twitter.com/bob" },
      },
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
    
    for (const leader of leadership) 
      await pb.collection("leadership").create(leader);

    // Seed locations
    console.log("Seeding locations...");
    const locations = [
      {
        name: "HQ",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
        phone: "+1-123-456-7890",
        email: "hq@company.com",
        coordinates: { lat: 40.7128, lng: -74.006 },
      },
      {
        name: "Branch Office",
        address: "456 Oak Ave",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "USA",
        phone: "+1-098-765-4321",
        email: "branch@company.com",
        coordinates: { lat: 37.7749, lng: -122.4194 },
      },
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
    
    for (const location of locations) 
      await pb.collection("locations").create(location);

    // Seed partners (depends on category)
    console.log("Seeding partners...");
    const partners = [
      {
        name: "Partner A",
        slug: "partner-a",
        website: "https://partnera.com",
        description: "Great collaborator.",
        featured: true,
        order: 1,
        active: true,
        category: businessCategoryId,
      },
      {
        name: "Partner B",
        slug: "partner-b",
        website: "https://partnerb.com",
        description: "Reliable ally.",
        featured: false,
        order: 2,
        active: true,
        category: techCategoryId,
      },
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
    
    for (const partner of partners) 
      await pb.collection("partners").create(partner);

    // Seed press
    console.log("Seeding press...");
    const press = [
      {
        title: "Featured in TechCrunch",
        content: "Exciting news about our launch.",
        published_date: new Date().toISOString(),
        source: "TechCrunch",
        url: "https://techcrunch.com/article",
        featured: true,
        published: true,
      },
      {
        title: "Award Winner",
        content: "Received innovation award.",
        published_date: new Date().toISOString(),
        source: "Awards Inc",
        url: "https://awards.com/news",
        featured: false,
        published: true,
      },
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
    
    for (const item of press) 
      await pb.collection("press").create(item);

    // Seed pricing_plans
    console.log("Seeding pricing plans...");
    const plans = [
      {
        name: "Basic",
        slug: "basic",
        description: "Starter plan.",
        price: 10,
        currency: "USD",
        features: ["Feature 1", "Feature 2"],
        limitations: ["Limit 1"],
        is_popular: false,
        is_enterprise: false,
        order: 1,
        active: true,
      },
      {
        name: "Pro",
        slug: "pro",
        description: "Advanced plan.",
        price: 50,
        currency: "USD",
        features: ["All basic", "Pro features"],
        limitations: [],
        is_popular: true,
        is_enterprise: false,
        order: 2,
        active: true,
      },
      {
        name: "Enterprise",
        slug: "enterprise",
        description: "Custom plan.",
        price: 0,
        currency: "USD",
        features: ["All pro", "Custom"],
        limitations: [],
        is_popular: false,
        is_enterprise: true,
        order: 3,
        active: true,
      },
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
    
    for (const plan of plans) 
      await pb.collection("pricing_plans").create(plan);

    // Seed process_steps (depends on category)
    console.log("Seeding process steps...");
    const steps = [
      {
        step: "1",
        title: "Consultation",
        description: "Discuss needs.",
        icon: "fa-handshake",
        category: businessCategoryId,
        order: 1,
      },
      {
        step: "2",
        title: "Development",
        description: "Build solution.",
        icon: "fa-code",
        category: devCategoryId,
        order: 2,
      },
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
    
    for (const step of steps) 
      await pb.collection("process_steps").create(step);

    // Seed security_features
    console.log("Seeding security features...");
    const secFeatures = [
      { description: "End-to-end encryption.", order: 1 },
      { description: "Two-factor authentication.", order: 2 },
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
    
    for (const feature of secFeatures) 
      await pb.collection("security_features").create(feature);

    // Seed status
    console.log("Seeding status...");
    const statuses = [
      {
        metric: "Uptime",
        value: "99.9%",
        label: "System Uptime",
        description: "Guaranteed availability.",
        order: 1,
      },
      {
        metric: "Response Time",
        value: "<100ms",
        label: "Avg Response",
        description: "Fast performance.",
        order: 2,
      },
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
    
    for (const status of statuses) 
      await pb.collection("status").create(status);

    // Seed support (depends on category)
    console.log("Seeding support...");
    const support = [
      {
        title: "Documentation",
        description: "Guides and APIs.",
        field: "https://docs.company.com",
        category: devCategoryId,
        order: 1,
      },
      {
        title: "Community Forum",
        description: "Ask questions.",
        field: "https://forum.company.com",
        category: techCategoryId,
        order: 2,
      },
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
    
    for (const item of support) 
      await pb.collection("support").create(item);

    // Seed testimonials
    console.log("Seeding testimonials...");
    const testimonials = [
      {
        name: "Client A",
        company: "Client Corp",
        position: "CEO",
        quote: "Amazing service!",
        rating: 5,
        verified: true,
        featured: true,
        order: true,
      },
      {
        name: "Client B",
        company: "Client Inc",
        position: "Manager",
        quote: "Highly recommend.",
        rating: 4,
        verified: true,
        featured: false,
        order: false,
      },
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
    
    for (const testimonial of testimonials) 
      await pb.collection("testimonials").create(testimonial);

    // Seed values
    console.log("Seeding values...");
    const values = [
      {
        title: "Innovation",
        description: "Drive change.",
        icon: "fa-lightbulb",
        order: 1,
        featured: true,
      },
      {
        title: "Integrity",
        description: "Do the right thing.",
        icon: "fa-balance-scale",
        order: 2,
        featured: false,
      },
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
    
    for (const value of values) 
      await pb.collection("values").create(value);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
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

// Run the seeder
// ============================================================
// RUN SEEDER
// ============================================================

seedData();
