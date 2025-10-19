/**
 * Static Asset URLs and Paths
 * Centralized management of all static asset paths and URLs
 */

const ASSETS_PATH = "/assets";

/**
 * Image static paths object
 * Provides strongly-typed access to all static image paths
 */
export const ImagePaths = {
  // App Icon
  APP_ICON: `${ASSETS_PATH}/app-icon.png`,

  // Icons
  CHECK_3D: `${ASSETS_PATH}/tick-3d.png`,
  LOCK_3D: `${ASSETS_PATH}/lock-3d.png`,

  // Device mockups
  IPHONE_FRAME: `${ASSETS_PATH}/iphone-frame.png`,
  MOBILE_APP: `${ASSETS_PATH}/mobile-app.png`,
  WEB_DASHBOARD: `${ASSETS_PATH}/web-dashboard.png`,

  // Hero Images
  HERO: `${ASSETS_PATH}/hero-image.png`,
  HERO_2: `${ASSETS_PATH}/hero-image-2.png`,
  HERO_GROUP_MEETING: `${ASSETS_PATH}/hero-image-group-meeting.png`,

  // People/Team
  PERSON_1: `${ASSETS_PATH}/person-1.png`,
  PERSON_2: `${ASSETS_PATH}/person-2.png`,
  PERSON_3: `${ASSETS_PATH}/person-3.png`,
  PERSON_4: `${ASSETS_PATH}/person-4.png`,
  PERSON_ILLUSTRATION_1: `${ASSETS_PATH}/person-illustration-1.png`,
  PERSON_ILLUSTRATION_2: `${ASSETS_PATH}/person-illustration-2.png`,
  WORKER_1: `${ASSETS_PATH}/worker-1.png`,
  WORKER_2: `${ASSETS_PATH}/worker-2.png`,
  WORKER_3: `${ASSETS_PATH}/worker-3.png`,

  // Office/Meeting
  OFFICE_MEETING: `${ASSETS_PATH}/office-meeting.png`,
  OFFICE_MEETING_2: `${ASSETS_PATH}/office-meeting-2.png`,
  LAPTOP_OFFICE: `${ASSETS_PATH}/laptop-office.png`,

  // Other
  EARTH_GLOBE: `${ASSETS_PATH}/earth-globe.png`,
  ANALYTIC_IMAGE: `${ASSETS_PATH}/analytic-image.png`,

  PINK_ARC: `${ASSETS_PATH}/pink-arc.png`,
} as const;

/**
 * Image URLs object
 * Provides access to external image URLs and dynamic image generation
 */
export const ImageUrls = {
  // Avatar/Profile Images
  DEFAULT_AVATAR: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
} as const;
