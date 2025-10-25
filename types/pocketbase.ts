/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authors = "Authors",
	Blogs = "Blogs",
	Category = "Category",
	CompanyMilestones = "Company_Milestones",
	Contacts = "Contacts",
	EmployeeBenefits = "Employee_Benefits",
	FaqTopics = "Faq_Topics",
	Faqs = "Faqs",
	Features = "Features",
	Integrations = "Integrations",
	Jobs = "Jobs",
	Leadership = "Leadership",
	Locations = "Locations",
	Partners = "Partners",
	Press = "Press",
	PricingPlans = "Pricing_Plans",
	Stats = "Stats",
	Support = "Support",
	Testimonials = "Testimonials",
	Users = "Users",
	Values = "Values",
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
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

export type AuthorsRecord<Tsocial_links = unknown> = {
	active?: boolean
	avatar?: string
	bio?: string
	created?: IsoDateString
	email: string
	id: string
	name: string
	role?: string
	slug: string
	social_links?: null | Tsocial_links
	updated?: IsoDateString
}

export type BlogsRecord<Ttags = unknown> = {
	author?: RecordIdString
	category?: RecordIdString
	content?: HTMLString
	created?: IsoDateString
	excerpt?: string
	featured?: boolean
	featured_image?: string[]
	id: string
	published?: boolean
	published_date?: IsoDateString
	slug: string
	tags?: null | Ttags
	title: string
	updated?: IsoDateString
	views: number
}

export type CategoryRecord = {
	color?: string
	count?: number
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
	year: number
}

export type ContactsRecord = {
	action_url?: string
	created?: IsoDateString
	description?: string
	addressed?: boolean
	icon?: string
	id: string
	title: string
	type?: string
	updated?: IsoDateString
}

export type EmployeeBenefitsRecord = {
	category?: string
	created?: IsoDateString
	description: string
	icon?: string
	id: string
	order?: number
	title: string
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
	created?: IsoDateString
	featured?: boolean
	id: string
	order?: number
	question: string
	updated?: IsoDateString
}

export type FeaturesRecord = {
	active?: boolean
	category?: string
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
	category?: string
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
	category?: string
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

export type StatsRecord = {
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
	category?: string
	created?: IsoDateString
	description?: string
	id: string
	order?: number
	title: string
	updated?: IsoDateString
	url: string
}

export type TestimonialsRecord = {
	company?: string
	created?: IsoDateString
	featured?: boolean
	id: string
	image?: string
	name: string
	order?: number
	position?: string
	quote?: string
	rating?: number
	updated?: IsoDateString
	verified?: boolean
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
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

// Response types include system fields and match responses from the PocketBase API
export type AuthorsResponse<Tsocial_links = unknown, Texpand = unknown> = Required<AuthorsRecord<Tsocial_links>> & BaseSystemFields<Texpand>
export type BlogsResponse<Ttags = unknown, Texpand = unknown> = Required<BlogsRecord<Ttags>> & BaseSystemFields<Texpand>
export type CategoryResponse<Texpand = unknown> = Required<CategoryRecord> & BaseSystemFields<Texpand>
export type CompanyMilestonesResponse<Texpand = unknown> = Required<CompanyMilestonesRecord> & BaseSystemFields<Texpand>
export type ContactsResponse<Texpand = unknown> = Required<ContactsRecord> & BaseSystemFields<Texpand>
export type EmployeeBenefitsResponse<Texpand = unknown> = Required<EmployeeBenefitsRecord> & BaseSystemFields<Texpand>
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
export type StatsResponse<Texpand = unknown> = Required<StatsRecord> & BaseSystemFields<Texpand>
export type SupportResponse<Texpand = unknown> = Required<SupportRecord> & BaseSystemFields<Texpand>
export type TestimonialsResponse<Texpand = unknown> = Required<TestimonialsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type ValuesResponse<Texpand = unknown> = Required<ValuesRecord> & BaseSystemFields<Texpand>
export type EnquiriesResponse<Texpand = unknown> = Required<EnquiriesRecord> & BaseSystemFields<Texpand>

export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Authors: AuthorsRecord
	Blogs: BlogsRecord
	Category: CategoryRecord
	Company_Milestones: CompanyMilestonesRecord
	Contacts: ContactsRecord
	Employee_Benefits: EmployeeBenefitsRecord
	Faq_Topics: FaqTopicsRecord
	Faqs: FaqsRecord
	Features: FeaturesRecord
	Integrations: IntegrationsRecord
	Jobs: JobsRecord
	Leadership: LeadershipRecord
	Locations: LocationsRecord
	Partners: PartnersRecord
	Press: PressRecord
	Pricing_Plans: PricingPlansRecord
	Stats: StatsRecord
	Support: SupportRecord
	Testimonials: TestimonialsRecord
	Users: UsersRecord
	Values: ValuesRecord
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
}

export type CollectionResponses = {
	Authors: AuthorsResponse
	Blogs: BlogsResponse
	Category: CategoryResponse
	Company_Milestones: CompanyMilestonesResponse
	Contacts: ContactsResponse
	Employee_Benefits: EmployeeBenefitsResponse
	Faq_Topics: FaqTopicsResponse
	Faqs: FaqsResponse
	Features: FeaturesResponse
	Integrations: IntegrationsResponse
	Jobs: JobsResponse
	Leadership: LeadershipResponse
	Locations: LocationsResponse
	Partners: PartnersResponse
	Press: PressResponse
	Pricing_Plans: PricingPlansResponse
	Stats: StatsResponse
	Support: SupportResponse
	Testimonials: TestimonialsResponse
	Users: UsersResponse
	Values: ValuesResponse
	Enquiries: EnquiriesResponse
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'Authors'): RecordService<AuthorsResponse>
	collection(idOrName: 'Blogs'): RecordService<BlogsResponse>
	collection(idOrName: 'Category'): RecordService<CategoryResponse>
	collection(idOrName: 'Company_Milestones'): RecordService<CompanyMilestonesResponse>
	collection(idOrName: 'Contacts'): RecordService<ContactsResponse>
	collection(idOrName: 'Employee_Benefits'): RecordService<EmployeeBenefitsResponse>
	collection(idOrName: 'Faq_Topics'): RecordService<FaqTopicsResponse>
	collection(idOrName: 'Faqs'): RecordService<FaqsResponse>
	collection(idOrName: 'Features'): RecordService<FeaturesResponse>
	collection(idOrName: 'Integrations'): RecordService<IntegrationsResponse>
	collection(idOrName: 'Jobs'): RecordService<JobsResponse>
	collection(idOrName: 'Leadership'): RecordService<LeadershipResponse>
	collection(idOrName: 'Locations'): RecordService<LocationsResponse>
	collection(idOrName: 'Partners'): RecordService<PartnersResponse>
	collection(idOrName: 'Press'): RecordService<PressResponse>
	collection(idOrName: 'Pricing_Plans'): RecordService<PricingPlansResponse>
	collection(idOrName: 'Stats'): RecordService<StatsResponse>
	collection(idOrName: 'Support'): RecordService<SupportResponse>
	collection(idOrName: 'Testimonials'): RecordService<TestimonialsResponse>
	collection(idOrName: 'Users'): RecordService<UsersResponse>
	collection(idOrName: 'Values'): RecordService<ValuesResponse>
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
}
