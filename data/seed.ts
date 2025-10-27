import PocketBase from "pocketbase";

// Configuration
const POCKETBASE_URL = "http://localhost:8090";
const SEEDER_EMAIL = "admin@projectx.com";
const SEEDER_PASSWORD = "Admin@12345";

// Initialize PocketBase client
const pb = new PocketBase(POCKETBASE_URL);

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
    ];
    for (const blog of blogs) {
      await pb.collection("blogs").create(blog);
    }

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
    ];
    for (const milestone of milestones) {
      await pb.collection("company_milestones").create(milestone);
    }

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
    ];
    for (const item of complianceItems) {
      await pb.collection("compliance_items").create(item);
    }

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
    ];
    for (const option of contactOptions) {
      await pb.collection("contact_options").create(option);
    }

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
    ];
    for (const card of ctaCards) {
      await pb.collection("cta_cards").create(card);
    }

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
    ];
    for (const benefit of benefits) {
      await pb.collection("employee_benefits").create(benefit);
    }

    // Seed employer_stats
    console.log("Seeding employer stats...");
    const stats = [
      { value: "500+", label: "Happy Clients", order: 1 },
      { value: "50+", label: "Team Members", order: 2 },
      { value: "10+", label: "Years Experience", order: 3 },
    ];
    for (const stat of stats) {
      await pb.collection("employer_stats").create(stat);
    }

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
    ];
    for (const topic of faqTopics) {
      await pb.collection("faq_topics").create(topic);
    }

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
    ];
    for (const faq of faqs) {
      await pb.collection("faqs").create(faq);
    }

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
    ];
    for (const feature of features) {
      await pb.collection("features").create(feature);
    }

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
    ];
    for (const integration of integrations) {
      await pb.collection("integrations").create(integration);
    }

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
    ];
    for (const job of jobs) {
      await pb.collection("jobs").create(job);
    }

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
    ];
    for (const leader of leadership) {
      await pb.collection("leadership").create(leader);
    }

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
    ];
    for (const location of locations) {
      await pb.collection("locations").create(location);
    }

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
    ];
    for (const partner of partners) {
      await pb.collection("partners").create(partner);
    }

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
    ];
    for (const item of press) {
      await pb.collection("press").create(item);
    }

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
    ];
    for (const plan of plans) {
      await pb.collection("pricing_plans").create(plan);
    }

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
    ];
    for (const step of steps) {
      await pb.collection("process_steps").create(step);
    }

    // Seed security_features
    console.log("Seeding security features...");
    const secFeatures = [
      { description: "End-to-end encryption.", order: 1 },
      { description: "Two-factor authentication.", order: 2 },
    ];
    for (const feature of secFeatures) {
      await pb.collection("security_features").create(feature);
    }

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
    ];
    for (const status of statuses) {
      await pb.collection("status").create(status);
    }

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
    ];
    for (const item of support) {
      await pb.collection("support").create(item);
    }

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
    ];
    for (const testimonial of testimonials) {
      await pb.collection("testimonials").create(testimonial);
    }

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
    ];
    for (const value of values) {
      await pb.collection("values").create(value);
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    // Optionally logout or close
    pb.authStore.clear();
  }
}

// Run the seeder
seedData();
