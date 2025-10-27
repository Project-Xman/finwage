/**
 * Blog Seeder
 * 
 * Seeds the blogs collection with FinWage articles including SEO fields.
 * Dependent seeder - requires Categories and Authors to be seeded first.
 * Follows Dependency Inversion Principle - depends on abstractions through base class.
 */

import type PocketBase from 'pocketbase';
import { DependentSeeder } from './base-seeder';
import type { BlogSeedData } from '@/types/seeders';

export class BlogSeeder extends DependentSeeder {
  constructor(pb: PocketBase, verbose: boolean = false) {
    super(pb, verbose);
  }
  
  get name(): string {
    return 'Blogs';
  }
  
  protected get collectionName(): string {
    return 'blogs';
  }
  
  /**
   * Declare dependencies on other seeders
   */
  getDependencies(): string[] {
    return ['Categories', 'Authors'];
  }
  
  /**
   * Get blog seed data with SEO fields
   * References to categories and authors are resolved from cache
   */
  protected async getSeedData(): Promise<BlogSeedData[]> {
    // Get IDs from dependent seeders
    const categoryIds = this.getCachedRecords('Categories');
    const authorIds = this.getCachedRecords('Authors');
    
    const [ewaCategoryId, financialWellnessCategoryId, benefitsCategoryId] = categoryIds;
    const [sarahAuthorId, davidAuthorId, mariaAuthorId] = authorIds;
    
    return [
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
  }
  
  protected getRecordLabel(data: BlogSeedData): string {
    return `Blog: ${data.title}`;
  }
}
