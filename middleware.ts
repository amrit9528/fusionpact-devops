import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mapping from number to slug
const blogNumberToSlugMap: { [key: string]: string } = {
  "1": "maximizing-impact-with-motion-graphics-flichire",
  "2": "maximize-creative-opportunities-hire-visual-professionals-flichire",
  "3": "elevate-brand-hire-skilled-motion-graphics-artists-flichire",
  "4": "master-creative-collaboration-hire-visual-storytellers-flichire",
  "5": "unlock-creative-potential-hire-talented-motion-designers-flichire",
  "6": "future-of-hiring-motion-graphic-designers-flichire",
  "7": "master-remote-collaboration-top-video-editors-flichire",
  "8": "maximizing-impact-motion-graphics-flichire",
  "9": "streamline-hiring-motion-graphics-designers-flichire",
  "10": "remote-collaboration-video-editing-hire-flichire",
  "11": "guide-to-color-grading-hire-creative-visual-professionals-flichire",
  "12": "ultimate-guide-to-hiring-3d-visual-artists-flichire",
  "13": "art-of-visual-storytelling-hire-flic-hire",
  "14": "harness-power-motion-graphics-brand-flichire",
  "15": "future-of-visual-storytelling-hire-expert-video-creators-flichire",
  "16": "streamlined-hiring-motion-graphics-specialists-flichire",
  "17": "maximize-impact-motion-graphics-hiring-strategies-flichire",
  "18": "master-motion-design-hiring-tips-visual-storytellers-flichire",
  "19": "hire-top-motion-graphics-artists-flichire",
  "20": "unlock-storytelling-motion-design-hire-flichire",
  "21": "effective-hiring-motion-graphics-designer-flichire",
  "22": "transform-brand-hire-expert-3d-modellers-flichire",
  "23": "unlock-power-of-motion-graphics-hiring-flichire",
  "24": "guide-to-hiring-top-motion-graphics-talent-flichire",
  "25": "unlock-best-video-editing-talent-hire-perfect-match-flichire",
  "26": "ultimate-creative-marketplace-hire-expert-video-editors-flichire",
  "27": "transform-projects-hire-expert-video-editors-flichire",
  "28": "maximize-content-impact-hire-top-video-editors-flichire",
  "29": "guide-to-excellence-in-video-editing-flichire",
  "30": "unlock-power-video-editing-talent",
  "31": "unlock-video-editing-potential-flichire",
  "32": "elevate-video-production-discover-top-editing-talent-flichire",
  "33": "hire-top-video-editors-flic-hire-creative-talent",
  "34": "ultimate-video-editor-hiring-platform-flic-hire",
  "35": "unlock-creative-vision-hire-expert-video-editors-flic-hire",
  "36": "top-video-editor-hiring-platform-for-business-flic-hire",
  "37": "best-video-editor-hiring-platform-2025-flichire-vs-upwork-fiverr",
  "41": "ultimate-video-editor-hiring-platform-flichire",
  "42": "unlock-creative-video-editor-hiring-flic-hire",
  "43": "best-video-editor-hiring-platforms-flic-hire-vs-competitors",
  "44": "discover-best-video-editor-hiring-platforms-flic-hire",
  "46": "premier-video-editor-hiring-platform-flic-hire",
  "47": "leading-video-editor-hiring-platforms-comparison-flic-hire",
  "48": "top-video-editor-hiring-platforms-2025-flic-hire-standout",
  "50": "discover-best-video-editor-hiring-platforms-flic-hire-leads",
  "51": "flic-hire-vs-competitors-best-video-editor-hiring-platforms",
  "52": "best-video-editor-hiring-platform-flic-hire",
  "53": "best-video-editor-hiring-platforms-comparison-flic-hire-standout",
  "54": "top-video-editor-hiring-platforms-comparison-flic-hire",
  "55": "discover-best-video-editor-hiring-platforms-flic-hire-unpacked",
  "56": "leading-video-editor-hiring-platforms-flic-hire-leads",
  "57": "flic-hire-vs-competition-best-video-editor-hiring-platforms",
  "58": "top-video-editor-hiring-platforms-leading-flic-hire",
  "60": "top-video-editor-hiring-platforms-2025-flic-hire",
  "61": "unlock-video-editor-hiring-opportunities-flic-hire",
  "62": "top-video-editor-hiring-platforms-flic-hire-standout",
  "63": "ultimate-guide-to-video-editor-hiring-and-job-opportunities-flic-hire",
  "64": "ultimate-guide-to-video-editor-hiring-flic-hire-best-choice",
  "65": "top-video-editor-hiring-platforms-excellence-flichire",
  "66": "best-platforms-to-hire-video-editors-flichire-standout",
  "67": "ultimate-guide-to-hiring-video-editors-flichire",
  "68": "best-video-editor-hiring-platform-flic-hire-vs-competitors",
  "69": "best-platform-hire-video-editor-flic-hire-in-2025",
  "70": "best-platforms-hire-video-editors-get-hired-in-2025",
  "71": "best-platforms-hire-video-editors-get-hired-in-2025",
  "72": "swipe-based-video-editor-hiring-platform-for-video-editors",
  "73": "swipe-based-video-editor-hiring-platform-for-video-editors-2025",
};
// Add your slug mapping function
function getTextSlugFromNumber(numberSlug: string): string | null {
  return blogNumberToSlugMap[numberSlug] || null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const blogRegex = /^\/blog\/(\d+)$/;
  const match = pathname.match(blogRegex);

  if (match) {
    const numberSlug = match[1];
    const textSlug = getTextSlugFromNumber(numberSlug);

    if (textSlug) {
      return NextResponse.redirect(
        new URL(`/blog/${textSlug}`, request.url),
        301
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/blog/:path*",
};
