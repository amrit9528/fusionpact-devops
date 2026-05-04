import { Metadata } from "next";
import { fetchBlogDetail } from "@/app/utils/api";

// Match the Promise type used in page.tsx
type GenerateMetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    // Convert slug to string to ensure it works with both numeric and text slugs
    const slug = String(resolvedParams.slug);
    const { data } = await fetchBlogDetail(slug);
    const { metadata, social_media_optimization, content } = data;

    return {
      title: metadata.title,
      description: metadata.meta_description,
      // Standard keywords array for basic compatibility
      keywords: [
        ...(metadata.keywords?.primary || []),
        ...(metadata.keywords?.secondary || [])
      ],
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
      openGraph: {
        title: social_media_optimization.open_graph["og:title"],
        description: social_media_optimization.open_graph["og:description"],
        images: [{
          url: content.featured_image.url.replace('http://', 'https://'),
          alt: social_media_optimization.open_graph["og:image:alt"] || content.featured_image.alt,
          width: 1024,
          height: 1024,
        }],
        url: `https://flichire.com/blog/${resolvedParams.slug}`,
        type: 'article',
        siteName: 'Flichire',
        publishedTime: metadata.content_updates?.created_date,
        modifiedTime: metadata.content_updates?.last_modified,
      },
      twitter: {
        title: social_media_optimization.twitter["twitter:title"],
        description: social_media_optimization.twitter["twitter:description"],
        images: [{
          url: social_media_optimization.twitter["twitter:image"].replace('http://', 'https://'),
          alt: social_media_optimization.twitter["twitter:image:alt"],
          width: 1024,
          height: 1024,
        }],
        card: 'summary_large_image',
        site: '@flichire',
      },
      alternates: {
        canonical: `https://flichire.com/blog/${resolvedParams.slug}`,
      },
      other: {
        'charset': 'UTF-8',
        'viewport': 'width=device-width, initial-scale=1',
        // Custom metadata fields for primary keywords
        'primary-keywords': metadata.keywords?.primary?.join(', ') || '',
        // Custom metadata fields for secondary keywords
        'secondary-keywords': metadata.keywords?.secondary?.join(', ') || '',
      },
    };
  } catch {
    return {
      title: "Blog Post | Flic",
      description: "Flic blog post",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://flichire.com/blog",
      },
    };
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
