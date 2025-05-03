const BASE_URL = 'https://moreseo.net';

async function getSitemap() {
  const key = process.env.MORESEO_API_KEY;
  if (!key) throw Error('MORESEO_API_KEY enviroment variable must be set. You can use the DEMO key cfe0e224-9533-4ab4-9a95-52ddbca8ebec for testing - please set it in the root .env.local file.');

  try {
    const res = await fetch(`https://moreseo.net/api/sitemap?key=${key}`, { cache: 'no-store' });
    const result = await res.json();
    return result?.data;
  } catch {
    return { articles: [], categories: [], tags: [] };
  }
}

function toSitemapRecord(loc: string, updatedAt: string) {
  return `<url><loc>${new URL(loc, BASE_URL).toString()}</loc><lastmod>${updatedAt}</lastmod></url>`;
}

type SitemapItem = { slug: string; lastmod: string };

async function generateSiteMap() {
  const blogSitemap = await getSitemap();
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://moreseo.net/blog</loc>
    </url>
     ${blogSitemap.articles.map((i: SitemapItem) => toSitemapRecord(`/blog/${i.slug}`, i.lastmod))}
     ${blogSitemap.categories.map((i: SitemapItem) => toSitemapRecord(`/blog/category/${i.slug}`, i.lastmod))}
     ${blogSitemap.tags.map((i: SitemapItem) => toSitemapRecord(`/blog/tag/${i.slug}`, i.lastmod))}
   </urlset>
 `;
}

export async function GET() {
  const body = await generateSiteMap();

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
