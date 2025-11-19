/**
 * PocketBase Utility Functions
 *
 * This module provides utility functions for working with PocketBase,
 * including file URL construction and image handling.
 */

import type { BaseSystemFields } from "@/types/pocketbase";

/**
 * Get the PocketBase base URL from environment variables
 */
export function getPocketBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Get the PocketBase internal URL for server-side fetching (Docker)
 */
export function getPocketBaseInternalUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_POCKETBASE_INTERNAL_URL || getPocketBaseUrl();
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Construct a file URL for a PocketBase record
 *
 * @param record - The PocketBase record containing the file
 * @param filename - The filename to construct URL for
 * @returns The complete URL to access the file
 *
 * @example
 * ```ts
 * const blog = await getBlogBySlug('my-post');
 * const imageUrl = getFileUrl(blog, blog.featured_image[0]);
 * ```
 */
export function getFileUrl(record: BaseSystemFields, filename: string): string {
  if (!filename) {
    return "";
  }

  const baseUrl = getPocketBaseUrl();
  const { collectionName, id } = record;

  return `${baseUrl}/api/files/${collectionName}/${id}/${filename}`;
}

/**
 * Construct an image URL with optional thumbnail support
 *
 * @param record - The PocketBase record containing the image
 * @param filename - The image filename
 * @param options - Optional configuration for image URL
 * @returns The complete URL to access the image, or fallback URL if filename is empty
 *
 * @example
 * ```ts
 * // Get original image
 * const imageUrl = getImageUrl(blog, blog.featured_image[0]);
 *
 * // Get thumbnail
 * const thumbUrl = getImageUrl(blog, blog.featured_image[0], { thumb: '100x100' });
 *
 * // With fallback
 * const safeUrl = getImageUrl(blog, blog.featured_image[0], { fallback: '/placeholder.jpg' });
 * ```
 */
export function getImageUrl(
  record: BaseSystemFields,
  filename: string,
  options?: {
    thumb?: string;
    fallback?: string;
  },
): string {
  const { thumb, fallback = "/placeholder.jpg" } = options || {};

  if (!filename) {
    return fallback;
  }

  // Use internal URL for images to support next/image optimization in Docker
  const baseUrl = getPocketBaseInternalUrl();
  const { collectionName, id } = record;
  const url = `${baseUrl}/api/files/${collectionName}/${id}/${filename}`;

  return thumb ? `${url}?thumb=${thumb}` : url;
}

/**
 * Get the first image from an array of images
 *
 * @param record - The PocketBase record containing images
 * @param images - Array of image filenames
 * @param options - Optional configuration for image URL
 * @returns The URL of the first image, or fallback URL if array is empty
 *
 * @example
 * ```ts
 * const imageUrl = getFirstImage(blog, blog.featured_image);
 * ```
 */
export function getFirstImage(
  record: BaseSystemFields,
  images: string[] | string,
  options?: {
    thumb?: string;
    fallback?: string;
  },
): string {
  const imageArray = Array.isArray(images) ? images : [images];
  const firstImage = imageArray[0];

  return getImageUrl(record, firstImage, options);
}

/**
 * Get all image URLs from an array of images
 *
 * @param record - The PocketBase record containing images
 * @param images - Array of image filenames
 * @param options - Optional configuration for image URLs
 * @returns Array of image URLs
 *
 * @example
 * ```ts
 * const imageUrls = getAllImages(blog, blog.featured_image);
 * ```
 */
export function getAllImages(
  record: BaseSystemFields,
  images: string[] | string,
  options?: {
    thumb?: string;
  },
): string[] {
  const imageArray = Array.isArray(images) ? images : [images];

  return imageArray
    .filter(Boolean)
    .map((filename) => getImageUrl(record, filename, options));
}

/**
 * Check if a record has any images
 *
 * @param images - Array of image filenames or single filename
 * @returns True if the record has at least one image
 */
export function hasImages(
  images: string[] | string | null | undefined,
): boolean {
  if (!images) return false;

  const imageArray = Array.isArray(images) ? images : [images];
  return imageArray.length > 0 && imageArray.some(Boolean);
}
