import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { type Metadata } from 'next';
import { BlogClient } from 'moreseo';
export async function generateMetadata(): Promise<Metadata> {
  const title = 'MoreSEO Blog';
  const description = 'Get the inside scoop on MoreSEO - the AI-powered SEO solution for content creation, optimization, and automated traffic growth on Autopilot.';
  return {
    title,
    description,
    metadataBase: new URL('https://moreseo.com'),
    alternates: {
      canonical: '/blog',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      // images: [],
      url: 'https://moreseo.com/blog',
    },
    twitter: {
      title,
      description,
      // card: 'summary_large_image',
      // images: [],
    },
  };
}

async function getPosts(page: number) {
  const key = process.env.MORESEO_API_KEY;
  if (!key) throw Error('MORESEO_API_KEY enviroment variable must be set. You can use the DEMO key cfe0e224-9533-4ab4-9a95-52ddbca8ebec for testing - please set it in the root .env.local file');

  const client = new BlogClient(key);

  return await client.getArticles(page, 10);
}

export const fetchCache = 'force-no-store';

export default async function Blog({ searchParams: { page } }: { searchParams: { page: number } }) {

  const pageNumber = Math.max(( page || 2) - 1, 0);
  
  const { total, articles } = await getPosts(pageNumber);
  const posts = articles || [];
  const lastPage = Math.ceil(total / 10);

  return (
    <section className="max-w-3xl my-8 lg:mt-10 mx-auto px-4 md:px-8 dark:text-white tracking-normal">
      <h1 className="text-4xl my-4 font-black">MoreSEO Blog</h1>
      <ul>
        {posts?.map((article: any) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </ul>
      {lastPage > 1 && <Pagination slug="/blog" pageNumber={pageNumber} lastPage={lastPage} />}
    </section>
  );
}
