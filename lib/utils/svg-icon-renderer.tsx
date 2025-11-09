/**
 * SVG Icon Renderer Utility
 *
 * Renders SVG icons from string content stored in the database.
 * Supports inline SVG strings and provides proper sanitization.
 */

import type React from "react";

interface SvgIconProps {
  svgString: string;
  className?: string;
  size?: number | string;
}

/**
 * Renders an SVG icon from a string
 *
 * @param svgString - The SVG markup as a string
 * @param className - Optional className for styling
 * @param size - Optional size (width and height)
 *
 * @example
 * ```tsx
 * <SvgIcon
 *   svgString='<svg viewBox="0 0 24 24">...</svg>'
 *   className="w-6 h-6 text-blue-500"
 * />
 * ```
 */
export function SvgIcon({ svgString, className = "", size }: SvgIconProps) {
  if (!svgString) {
    return null;
  }

  // Check if it's already an SVG tag
  const isSvgTag = svgString.trim().startsWith("<svg");

  if (!isSvgTag) {
    // If it's just the path data or other content, wrap it in SVG
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={svgString} />
      </svg>
    );
  }

  // Parse and render the full SVG
  // Using dangerouslySetInnerHTML with a wrapper div
  return (
    <div
      className={className}
      style={size ? { width: size, height: size } : undefined}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

/**
 * Alternative safer approach: Extract SVG properties and render as React component
 */
export function SafeSvgIcon({ svgString, className = "", size }: SvgIconProps) {
  if (!svgString) {
    return null;
  }

  try {
    // Extract viewBox if present
    const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

    // Extract path data
    const pathMatch = svgString.match(/<path[^>]*d="([^"]+)"/);
    const pathData = pathMatch ? pathMatch[1] : "";

    // Extract fill if present
    const fillMatch = svgString.match(/fill="([^"]+)"/);
    const fill = fillMatch ? fillMatch[1] : "currentColor";

    if (!pathData && !svgString.includes("<svg")) {
      // If no path found and it's not an SVG, treat the whole string as path data
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox={viewBox}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={svgString} />
        </svg>
      );
    }

    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox={viewBox}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        {pathData && <path d={pathData} />}
      </svg>
    );
  } catch (error) {
    console.error("Error rendering SVG:", error);
    return null;
  }
}

/**
 * Render SVG icon with fallback
 */
export function renderSvgIcon(
  svgString: string | undefined,
  className?: string,
  fallback?: React.ReactNode,
): React.ReactNode {
  if (!svgString) {
    return fallback || null;
  }

  return <SvgIcon svgString={svgString} className={className} />;
}
