/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Authors = "authors",
	Blogs = "blogs",
	Category = "category",
	CompanyMilestones = "company_milestones",
	ComplianceItems = "compliance_items",
	ContactOptions = "contact_options",
	CtaCards = "cta_cards",
	EmployeeBenefits = "employee_benefits",
	EmployerStats = "employer_stats",
	Enquiries = "enquiries",
	FaqTopics = "faq_topics",
	Faqs = "faqs",
	Features = "features",
	Integrations = "integrations",
	Jobs = "jobs",
	Leadership = "leadership",
	Locations = "locations",
	Partners = "partners",
	Press = "press",
	PricingPlans = "pricing_plans",
	ProcessSteps = "process_steps",
	SecurityFeatures = "security_features",
	Status = "status",
	Support = "support",
	Testimonials = "testimonials",
	Users = "users",
	Values = "values",
	Webhooks = "webhooks",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type AuthorsRecord<Tsocial_link = unknown> = {
	active?: boolean
	avatar?: string
	bio?: string
	created?: IsoDateString
	email: string
	id: string
	name: string
	role?: string
	slug: string
	social_link?: null | Tsocial_link
	updated?: IsoDateString
}

export type BlogsRecord<Ttags = unknown> = {
	author?: RecordIdString
	category?: RecordIdString
	content?: HTMLString
	created?: IsoDateString
	excerpt?: string
	featured?: boolean
	featured_image?: string
	id: string
	published?: boolean
	published_date?: IsoDateString
	slug: string
	tags?: null | Ttags
	title: string
	updated?: IsoDateString
	views?: number
	// SEO metadata fields for Next.js 15 static generation
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	og_image?: string
	canonical_url?: string
}

export type CategoryRecord = {
	color?: string
	count?: string
	created?: IsoDateString
	description?: string
	icon?: string
	id: string
	name: string
	slug: string
	updated?: IsoDateString
}

export type CompanyMilestonesRecord = {
	created?: IsoDateString
	description?: string
	event: string
	featured?: boolean
	id: string
	order?: number
	updated?: IsoDateString
	year?: number
}

export type ComplianceItemsRecord<Tdetails = unknown> = {
	created?: IsoDateString
	description: string
	details: null | Tdetails
	icon: string
	id: string
	order?: number
	title: string
	updated?: IsoDateString
}

export type ContactOptionsRecord = {
	action_url?: string
	created?: IsoDateString
	description?: string
	icon?: string
	id: string
	is_featured?: boolean
	title: string
	type?: string
	updated?: IsoDateString
}

export type CtaCardsRecord<Tpoints = unknown> = {
	bg_color: string
	created?: IsoDateString
	icon: string
	id: string
	order?: number
	points: null | Tpoints
	title: string
	updated?: IsoDateString
}

export type EmployeeBenefitsRecord = {
	category?: RecordIdString
	created?: IsoDateString
	description: string
	icon?: string
	id: string
	order?: number
	title: string
	updated?: IsoDateString
}

export type EmployerStatsRecord = {
	created?: IsoDateString
	id: string
	label: string
	order?: number
	updated?: IsoDateString
	value: string
}

export enum EnquiriesInterestOptions {
	"demo" = "demo",
	"pricing" = "pricing",
	"contact" = "contact",
	"other" = "other",
}

export enum EnquiriesStatusOptions {
	"new" = "new",
	"contacted" = "contacted",
	"converted" = "converted",
	"closed" = "closed",
}
export type EnquiriesRecord = {
	company?: string
	created?: IsoDateString
	email: string
	id: string
	interest?: EnquiriesInterestOptions
	message?: string
	name: string
	phone?: number
	status?: EnquiriesStatusOptions
	updated?: IsoDateString
}

export type FaqTopicsRecord = {
	created?: IsoDateString
	description?: string
	id: string
	name: string
	order?: number
	updated?: IsoDateString
}

export type FaqsRecord = {
	answer: string
	category?: RecordIdString
	category_text?: string
	created?: IsoDateString
	featured?: boolean
	id: string
	order?: number
	question: string
	updated?: IsoDateString
}

export type FeaturesRecord = {
	active?: boolean
	category?: RecordIdString
	created?: IsoDateString
	description: string
	featured?: boolean
	icon?: string
	id: string
	image?: string
	order?: number
	slug: string
	title: string
	updated?: IsoDateString
}

export type IntegrationsRecord = {
	active?: boolean
	category?: RecordIdString
	created?: IsoDateString
	description?: string
	documentation_url?: string
	featured?: boolean
	id: string
	logo?: string
	name: string
	order?: number
	slug: string
	updated?: IsoDateString
}

export type JobsRecord = {
	created?: IsoDateString
	department?: string
	description: string
	featured?: boolean
	id: string
	location?: string
	requirements?: string
	salary_range?: string
	status?: string
	title: string
	type?: string
	updated?: IsoDateString
}

export type LeadershipRecord<Tsocial_links = unknown> = {
	bio?: string
	created?: IsoDateString
	email?: string
	featured?: boolean
	id: string
	image?: string
	name: string
	order?: number
	role: string
	social_links?: null | Tsocial_links
	updated?: IsoDateString
}

export type LocationsRecord<Tcoordinates = unknown> = {
	address: string
	city?: string
	coordinates?: null | Tcoordinates
	country?: string
	created?: IsoDateString
	email?: string
	id: string
	name: string
	phone?: string
	state?: string
	updated?: IsoDateString
	zip?: string
}

export type PartnersRecord = {
	active?: boolean
	category?: RecordIdString
	created?: IsoDateString
	description?: string
	featured?: boolean
	id: string
	logo?: string
	name: string
	order?: number
	slug: string
	updated?: IsoDateString
	website?: string
}

export type PressRecord = {
	content: string
	created?: IsoDateString
	featured?: boolean
	id: string
	published?: boolean
	published_date: IsoDateString
	source?: string
	title: string
	updated?: IsoDateString
	url?: string
}

export type PricingPlansRecord<Tfeatures = unknown, Tlimitations = unknown> = {
	active?: boolean
	created?: IsoDateString
	currency?: string
	description?: string
	features?: null | Tfeatures
	id: string
	is_enterprise?: boolean
	is_popular?: boolean
	limitations?: null | Tlimitations
	name: string
	order?: number
	price?: number
	slug: string
	updated?: IsoDateString
}

export type ProcessStepsRecord = {
	category?: RecordIdString
	created?: IsoDateString
	description: string
	icon: string
	id: string
	order?: number
	step: string
	title: string
	updated?: IsoDateString
}

export type SecurityFeaturesRecord = {
	created?: IsoDateString
	description: string
	id: string
	order?: number
	updated?: IsoDateString
}

export type StatusRecord = {
	created?: IsoDateString
	description?: string
	id: string
	label?: string
	metric: string
	order?: number
	updated?: IsoDateString
	value: string
}

export type SupportRecord = {
	category?: RecordIdString
	created?: IsoDateString
	description?: string
	field: string
	id: string
	order?: number
	title: string
	updated?: IsoDateString
}

export type TestimonialsRecord = {
	company?: string
	created?: IsoDateString
	featured?: boolean
	id: string
	image?: string
	name?: string
	order?: boolean
	position?: string
	quote?: string
	rating?: number
	updated?: IsoDateString
	verified?: boolean
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

export type ValuesRecord = {
	created?: IsoDateString
	description: string
	featured?: boolean
	icon?: string
	id: string
	order?: number
	title: string
	updated?: IsoDateString
}

export enum WebhooksEventTypeOptions {
	"create" = "create",
	"update" = "update",
	"delete" = "delete",
}
export type WebhooksRecord<Theaders = unknown> = {
	active?: boolean
	collection: string
	created?: IsoDateString
	destination: string
	event_type: WebhooksEventTypeOptions[]
	headers?: null | Theaders
	id: string
	name: string
	updated?: IsoDateString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AuthorsResponse<Tsocial_link = unknown, Texpand = unknown> = Required<AuthorsRecord<Tsocial_link>> & BaseSystemFields<Texpand>
export type BlogsResponse<Ttags = unknown, Texpand = unknown> = Required<BlogsRecord<Ttags>> & BaseSystemFields<Texpand>
export type CategoryResponse<Texpand = unknown> = Required<CategoryRecord> & BaseSystemFields<Texpand>
export type CompanyMilestonesResponse<Texpand = unknown> = Required<CompanyMilestonesRecord> & BaseSystemFields<Texpand>
export type ComplianceItemsResponse<Tdetails = unknown, Texpand = unknown> = Required<ComplianceItemsRecord<Tdetails>> & BaseSystemFields<Texpand>
export type ContactOptionsResponse<Texpand = unknown> = Required<ContactOptionsRecord> & BaseSystemFields<Texpand>
export type CtaCardsResponse<Tpoints = unknown, Texpand = unknown> = Required<CtaCardsRecord<Tpoints>> & BaseSystemFields<Texpand>
export type EmployeeBenefitsResponse<Texpand = unknown> = Required<EmployeeBenefitsRecord> & BaseSystemFields<Texpand>
export type EmployerStatsResponse<Texpand = unknown> = Required<EmployerStatsRecord> & BaseSystemFields<Texpand>
export type EnquiriesResponse<Texpand = unknown> = Required<EnquiriesRecord> & BaseSystemFields<Texpand>
export type FaqTopicsResponse<Texpand = unknown> = Required<FaqTopicsRecord> & BaseSystemFields<Texpand>
export type FaqsResponse<Texpand = unknown> = Required<FaqsRecord> & BaseSystemFields<Texpand>
export type FeaturesResponse<Texpand = unknown> = Required<FeaturesRecord> & BaseSystemFields<Texpand>
export type IntegrationsResponse<Texpand = unknown> = Required<IntegrationsRecord> & BaseSystemFields<Texpand>
export type JobsResponse<Texpand = unknown> = Required<JobsRecord> & BaseSystemFields<Texpand>
export type LeadershipResponse<Tsocial_links = unknown, Texpand = unknown> = Required<LeadershipRecord<Tsocial_links>> & BaseSystemFields<Texpand>
export type LocationsResponse<Tcoordinates = unknown, Texpand = unknown> = Required<LocationsRecord<Tcoordinates>> & BaseSystemFields<Texpand>
export type PartnersResponse<Texpand = unknown> = Required<PartnersRecord> & BaseSystemFields<Texpand>
export type PressResponse<Texpand = unknown> = Required<PressRecord> & BaseSystemFields<Texpand>
export type PricingPlansResponse<Tfeatures = unknown, Tlimitations = unknown, Texpand = unknown> = Required<PricingPlansRecord<Tfeatures, Tlimitations>> & BaseSystemFields<Texpand>
export type ProcessStepsResponse<Texpand = unknown> = Required<ProcessStepsRecord> & BaseSystemFields<Texpand>
export type SecurityFeaturesResponse<Texpand = unknown> = Required<SecurityFeaturesRecord> & BaseSystemFields<Texpand>
export type StatusResponse<Texpand = unknown> = Required<StatusRecord> & BaseSystemFields<Texpand>
export type SupportResponse<Texpand = unknown> = Required<SupportRecord> & BaseSystemFields<Texpand>
export type TestimonialsResponse<Texpand = unknown> = Required<TestimonialsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type ValuesResponse<Texpand = unknown> = Required<ValuesRecord> & BaseSystemFields<Texpand>
export type WebhooksResponse<Theaders = unknown, Texpand = unknown> = Required<WebhooksRecord<Theaders>> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	authors: AuthorsRecord
	blogs: BlogsRecord
	category: CategoryRecord
	company_milestones: CompanyMilestonesRecord
	compliance_items: ComplianceItemsRecord
	contact_options: ContactOptionsRecord
	cta_cards: CtaCardsRecord
	employee_benefits: EmployeeBenefitsRecord
	employer_stats: EmployerStatsRecord
	enquiries: EnquiriesRecord
	faq_topics: FaqTopicsRecord
	faqs: FaqsRecord
	features: FeaturesRecord
	integrations: IntegrationsRecord
	jobs: JobsRecord
	leadership: LeadershipRecord
	locations: LocationsRecord
	partners: PartnersRecord
	press: PressRecord
	pricing_plans: PricingPlansRecord
	process_steps: ProcessStepsRecord
	security_features: SecurityFeaturesRecord
	status: StatusRecord
	support: SupportRecord
	testimonials: TestimonialsRecord
	users: UsersRecord
	values: ValuesRecord
	webhooks: WebhooksRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	authors: AuthorsResponse
	blogs: BlogsResponse
	category: CategoryResponse
	company_milestones: CompanyMilestonesResponse
	compliance_items: ComplianceItemsResponse
	contact_options: ContactOptionsResponse
	cta_cards: CtaCardsResponse
	employee_benefits: EmployeeBenefitsResponse
	employer_stats: EmployerStatsResponse
	enquiries: EnquiriesResponse
	faq_topics: FaqTopicsResponse
	faqs: FaqsResponse
	features: FeaturesResponse
	integrations: IntegrationsResponse
	jobs: JobsResponse
	leadership: LeadershipResponse
	locations: LocationsResponse
	partners: PartnersResponse
	press: PressResponse
	pricing_plans: PricingPlansResponse
	process_steps: ProcessStepsResponse
	security_features: SecurityFeaturesResponse
	status: StatusResponse
	support: SupportResponse
	testimonials: TestimonialsResponse
	users: UsersResponse
	values: ValuesResponse
	webhooks: WebhooksResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'authors'): RecordService<AuthorsResponse>
	collection(idOrName: 'blogs'): RecordService<BlogsResponse>
	collection(idOrName: 'category'): RecordService<CategoryResponse>
	collection(idOrName: 'company_milestones'): RecordService<CompanyMilestonesResponse>
	collection(idOrName: 'compliance_items'): RecordService<ComplianceItemsResponse>
	collection(idOrName: 'contact_options'): RecordService<ContactOptionsResponse>
	collection(idOrName: 'cta_cards'): RecordService<CtaCardsResponse>
	collection(idOrName: 'employee_benefits'): RecordService<EmployeeBenefitsResponse>
	collection(idOrName: 'employer_stats'): RecordService<EmployerStatsResponse>
	collection(idOrName: 'enquiries'): RecordService<EnquiriesResponse>
	collection(idOrName: 'faq_topics'): RecordService<FaqTopicsResponse>
	collection(idOrName: 'faqs'): RecordService<FaqsResponse>
	collection(idOrName: 'features'): RecordService<FeaturesResponse>
	collection(idOrName: 'integrations'): RecordService<IntegrationsResponse>
	collection(idOrName: 'jobs'): RecordService<JobsResponse>
	collection(idOrName: 'leadership'): RecordService<LeadershipResponse>
	collection(idOrName: 'locations'): RecordService<LocationsResponse>
	collection(idOrName: 'partners'): RecordService<PartnersResponse>
	collection(idOrName: 'press'): RecordService<PressResponse>
	collection(idOrName: 'pricing_plans'): RecordService<PricingPlansResponse>
	collection(idOrName: 'process_steps'): RecordService<ProcessStepsResponse>
	collection(idOrName: 'security_features'): RecordService<SecurityFeaturesResponse>
	collection(idOrName: 'status'): RecordService<StatusResponse>
	collection(idOrName: 'support'): RecordService<SupportResponse>
	collection(idOrName: 'testimonials'): RecordService<TestimonialsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'values'): RecordService<ValuesResponse>
	collection(idOrName: 'webhooks'): RecordService<WebhooksResponse>
}
