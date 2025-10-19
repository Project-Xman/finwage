export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export const posts: Post[] = [
  {
    slug: "real-cost-living-paycheck-to-paycheck",
    title: "The Real Cost of Living Paycheck to Paycheck",
    excerpt:
      "How earned wage access is helping millions of workers break free from the payday cycle and build long-term financial security.",
    content: `
      <p>Living paycheck to paycheck has become the norm for millions of American workers, but the true cost extends far beyond just financial strain. It impacts mental health, productivity, and overall quality of life.</p>
      
      <h2>The Financial Burden</h2>
      <p>When unexpected expenses arise, workers often turn to expensive solutions like payday loans, which can charge APRs exceeding 400%. This creates a vicious cycle of debt that's difficult to escape.</p>
      
      <h2>The Mental Health Impact</h2>
      <p>Financial stress is one of the leading causes of anxiety and depression among working adults. The constant worry about making ends meet affects sleep, relationships, and job performance.</p>
      
      <h2>How Earned Wage Access Helps</h2>
      <p>Earned wage access allows employees to access their already-earned wages before payday, providing a safety net without the predatory fees of traditional alternatives. This simple solution can break the paycheck-to-paycheck cycle.</p>
      
      <h2>The Long-Term Benefits</h2>
      <p>When employees have access to their earned wages, they can avoid late fees, overdraft charges, and high-interest loans. This creates a foundation for building emergency savings and achieving long-term financial stability.</p>
    `,
    category: "Financial Wellness",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    image: "/assets/analytic-image.png",
    author: {
      name: "Sarah Johnson",
      role: "Financial Wellness Expert",
      avatar: "/assets/author-1.jpg",
    },
    tags: ["Financial Wellness", "Earned Wage Access", "Employee Benefits"],
  },
  {
    slug: "why-top-companies-offering-wage-access",
    title: "Why Top Companies Are Offering Wage Access",
    excerpt:
      "The ROI of financial wellness benefits and how they're transforming employee retention strategies.",
    content: `
      <p>Forward-thinking companies are recognizing that financial wellness benefits aren't just nice-to-haves—they're essential tools for attracting and retaining top talent in today's competitive job market.</p>
      
      <h2>The Employee Retention Crisis</h2>
      <p>With turnover costs averaging 33% of an employee's annual salary, companies are looking for innovative solutions to improve retention. Financial stress is a leading cause of employee turnover.</p>
      
      <h2>Measurable ROI</h2>
      <p>Companies implementing earned wage access programs report significant improvements in key metrics:</p>
      <ul>
        <li>30% reduction in turnover rates</li>
        <li>25% increase in employee satisfaction scores</li>
        <li>40% improvement in shift coverage</li>
        <li>20% boost in productivity</li>
      </ul>
      
      <h2>Competitive Advantage</h2>
      <p>In industries with high turnover like retail, hospitality, and healthcare, offering wage access has become a key differentiator in recruiting efforts.</p>
      
      <h2>Implementation Best Practices</h2>
      <p>Successful implementations share common characteristics: clear communication, easy access, and integration with existing payroll systems. The best programs are zero-cost to employers and employees.</p>
    `,
    category: "Employer Benefits",
    date: "Jan 10, 2025",
    readTime: "7 min read",
    image: "/assets/office-meeting.png",
    author: {
      name: "Michael Chen",
      role: "HR Strategy Consultant",
      avatar: "/assets/author-2.jpg",
    },
    tags: ["Employer Benefits", "ROI", "Employee Retention"],
  },
  {
    slug: "future-of-payroll-on-demand-wages",
    title: "The Future of Payroll: On-Demand Wages",
    excerpt:
      "Exploring how technology is revolutionizing when and how employees get paid.",
    content: `
      <p>The traditional bi-weekly or monthly payroll cycle is a relic of the past. Technology is enabling a fundamental shift in how and when employees access their earned wages.</p>
      
      <h2>The Technology Behind It</h2>
      <p>Modern earned wage access platforms integrate seamlessly with existing payroll systems, calculating available earned wages in real-time without disrupting the employer's cash flow or payroll processes.</p>
      
      <h2>Regulatory Landscape</h2>
      <p>As the industry matures, regulators are establishing clear guidelines to protect both employers and employees. Understanding compliance requirements is crucial for successful implementation.</p>
      
      <h2>Global Trends</h2>
      <p>While the U.S. market is rapidly growing, earned wage access is becoming a global phenomenon. Countries like the UK, Australia, and across Europe are seeing similar adoption patterns.</p>
      
      <h2>What's Next?</h2>
      <p>The future includes AI-powered financial coaching, automated savings programs, and integration with broader financial wellness tools. The goal is not just wage access, but comprehensive financial empowerment.</p>
    `,
    category: "Industry Trends",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    image: "/assets/laptop-office.png",
    author: {
      name: "David Martinez",
      role: "Fintech Analyst",
      avatar: "/assets/author-3.jpg",
    },
    tags: ["Industry Trends", "Technology", "Future of Work"],
  },
  {
    slug: "financial-stress-impacts-productivity",
    title: "5 Ways Financial Stress Impacts Employee Productivity",
    excerpt:
      "Understanding the hidden costs of financial stress in the workplace and what employers can do about it.",
    content: `
      <p>Financial stress doesn't stay at home—it follows employees to work, impacting performance, engagement, and overall workplace culture.</p>
      
      <h2>1. Decreased Focus and Concentration</h2>
      <p>Employees worried about money spend an average of 3 hours per week at work dealing with personal financial issues, reducing their ability to focus on job responsibilities.</p>
      
      <h2>2. Increased Absenteeism</h2>
      <p>Financial stress contributes to physical and mental health problems, leading to higher rates of absenteeism and sick days.</p>
      
      <h2>3. Lower Engagement</h2>
      <p>When basic financial needs aren't met, employees struggle to engage with their work at a deeper level, impacting innovation and creativity.</p>
      
      <h2>4. Higher Turnover</h2>
      <p>Employees facing financial stress are more likely to leave for positions offering slightly higher pay, even if they're otherwise satisfied with their job.</p>
      
      <h2>5. Workplace Conflicts</h2>
      <p>Stress manifests in interpersonal conflicts, affecting team dynamics and overall workplace culture.</p>
      
      <h2>The Solution</h2>
      <p>Implementing financial wellness programs, including earned wage access, can address these issues at their root, creating a more productive and engaged workforce.</p>
    `,
    category: "Financial Wellness",
    date: "Jan 12, 2025",
    readTime: "6 min read",
    image: "/assets/analytic-image.png",
    author: {
      name: "Emily Rodriguez",
      role: "Workplace Psychologist",
      avatar: "/assets/author-4.jpg",
    },
    tags: ["Productivity", "Financial Wellness", "Mental Health"],
  },
  {
    slug: "choosing-right-wage-access-provider",
    title: "How to Choose the Right Wage Access Provider",
    excerpt:
      "A comprehensive guide for employers evaluating earned wage access solutions.",
    content: `
      <p>Not all earned wage access providers are created equal. Here's what employers need to consider when selecting a partner.</p>
      
      <h2>Fee Structure</h2>
      <p>Look for providers that don't charge hidden fees to employees or employers. The best solutions are truly zero-cost, funded through optional tips or alternative revenue models.</p>
      
      <h2>Integration Capabilities</h2>
      <p>Seamless integration with your existing payroll, HRIS, and time-tracking systems is essential. Implementation should be quick and painless.</p>
      
      <h2>Compliance and Security</h2>
      <p>Ensure the provider adheres to all relevant regulations and maintains bank-level security standards for employee data protection.</p>
      
      <h2>Employee Experience</h2>
      <p>The mobile app should be intuitive, reliable, and provide instant access. Look for features like financial education and savings tools.</p>
      
      <h2>Employer Support</h2>
      <p>Choose a provider that offers dedicated support, including implementation assistance, employee communication materials, and ongoing account management.</p>
      
      <h2>Track Record</h2>
      <p>Review case studies, customer testimonials, and retention metrics. The best providers can demonstrate measurable impact on employee satisfaction and turnover.</p>
    `,
    category: "Employer Guide",
    date: "Jan 8, 2025",
    readTime: "8 min read",
    image: "/assets/office-meeting.png",
    author: {
      name: "James Wilson",
      role: "Benefits Consultant",
      avatar: "/assets/author-5.jpg",
    },
    tags: ["Employer Guide", "Selection Criteria", "Best Practices"],
  },
  {
    slug: "earned-wage-access-regulation-landscape",
    title: "Understanding the Earned Wage Access Regulation Landscape",
    excerpt:
      "A comprehensive overview of current and emerging regulations affecting earned wage access programs.",
    content: `
      <p>As earned wage access grows in popularity, regulators are establishing frameworks to protect consumers while enabling innovation.</p>
      
      <h2>Federal Regulations</h2>
      <p>The Consumer Financial Protection Bureau (CFPB) has provided guidance distinguishing earned wage access from lending, establishing important protections and clarity for the industry.</p>
      
      <h2>State-Level Considerations</h2>
      <p>Several states have enacted specific legislation governing earned wage access programs, with varying requirements for disclosure, fee caps, and licensing.</p>
      
      <h2>Best Practices for Compliance</h2>
      <p>Employers should work with providers that maintain transparent fee structures, clear terms of service, and robust data protection measures.</p>
      
      <h2>Future Outlook</h2>
      <p>Expect continued regulatory evolution as the industry matures. Staying informed and working with compliant providers is essential.</p>
    `,
    category: "Compliance",
    date: "Jan 3, 2025",
    readTime: "7 min read",
    image: "/assets/laptop-office.png",
    author: {
      name: "Patricia Lee",
      role: "Compliance Attorney",
      avatar: "/assets/author-6.jpg",
    },
    tags: ["Compliance", "Regulations", "Legal"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((post) => post.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return posts
    .filter(
      (post) =>
        post.slug !== currentSlug && post.category === currentPost.category,
    )
    .slice(0, limit);
}
