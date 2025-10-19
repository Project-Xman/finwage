/**
 * Static Asset URLs and Paths
 * Centralized management of all static asset paths and URLs
 */

const ASSETS_PATH = "/assets";

/**
 * Image static paths class
 * Provides strongly-typed access to all static image paths
 */
export class ImagePaths {
  // App Icon
  static readonly APP_ICON = `${ASSETS_PATH}/app-icon.png`;

  // Icons
  static readonly CHECK_3D = `${ASSETS_PATH}/tick-3d.png`;
  static readonly LOCK_3D = `${ASSETS_PATH}/lock-3d.png`;

  // Device mockups
  static readonly IPHONE_FRAME = `${ASSETS_PATH}/iphone-frame.png`;
  static readonly MOBILE_APP = `${ASSETS_PATH}/mobile-app.png`;
  static readonly WEB_DASHBOARD = `${ASSETS_PATH}/web-dashboard.png`;

  // Hero Images
  static readonly HERO = `${ASSETS_PATH}/hero-image.png`;
  static readonly HERO_2 = `${ASSETS_PATH}/hero-image-2.png`;
  static readonly HERO_GROUP_MEETING = `${ASSETS_PATH}/hero-image-group-meeting.png`;

  // People/Team
  static readonly PERSON_1 = `${ASSETS_PATH}/person-1.png`;
  static readonly PERSON_2 = `${ASSETS_PATH}/person-2.png`;
  static readonly PERSON_3 = `${ASSETS_PATH}/person-3.png`;
  static readonly PERSON_4 = `${ASSETS_PATH}/person-4.png`;
  static readonly PERSON_ILLUSTRATION_1 = `${ASSETS_PATH}/person-illustration-1.png`;
  static readonly PERSON_ILLUSTRATION_2 = `${ASSETS_PATH}/person-illustration-2.png`;
  static readonly WORKER_1 = `${ASSETS_PATH}/worker-1.png`;
  static readonly WORKER_2 = `${ASSETS_PATH}/worker-2.png`;
  static readonly WORKER_3 = `${ASSETS_PATH}/worker-3.png`;

  // Office/Meeting
  static readonly OFFICE_MEETING = `${ASSETS_PATH}/office-meeting.png`;
  static readonly OFFICE_MEETING_2 = `${ASSETS_PATH}/office-meeting-2.png`;
  static readonly LAPTOP_OFFICE = `${ASSETS_PATH}/laptop-office.png`;

  // Other
  static readonly EARTH_GLOBE = `${ASSETS_PATH}/earth-globe.png`;
  static readonly ANALYTIC_IMAGE = `${ASSETS_PATH}/analytic-image.png`;

  static readonly PINK_ARC = `${ASSETS_PATH}/pink-arc.png`;

}

/**
 * Image URLs class
 * Provides access to external image URLs and dynamic image generation
 */
export class ImageUrls {
  // Avatar/Profile Images
  static readonly DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";


}