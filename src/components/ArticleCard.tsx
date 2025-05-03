import Link from "next/link";

interface ArticleProps {
  article: any;
}

const ArticleCard: React.FC<ArticleProps> = ({ article }) => {
  return (
    <li
      key={article._id}
      className="group relative grid gap-4 cursor-pointer sm:grid-cols-5 border-b border-gray-200 dark:border-slate-500 py-8 transition duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 px-2 rounded-md hover:scale-105"
    >
      {/* Optional: Thumbnail placeholder */}
      {/* <div className="hidden sm:block sm:col-span-1">
        <div className="aspect-square bg-gray-200 dark:bg-slate-700 rounded-lg" />
      </div> */}

      <div className="sm:col-span-5 w-full">
        {/* Date and reading time */}
        <div className="flex flex-wrap gap-2 items-center text-xs text-gray-300 dark:text-slate-300 mb-1">
          <span>
            Published{" "}
            {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "short", year: "numeric" }
            )}
          </span>
          {article.readingTime && <span>• {article.readingTime} min read</span>}
        </div>

        {/* Headline with underline animation */}
        <Link
          href={`/blog/${article.slug}`}
          className="block text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 relative w-fit"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-[background-size] duration-300">
            {article.headline}
          </span>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base line-clamp-2 mb-4">
          {article.metaDescription}
        </p>

        {/* Tags and Read More */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {(article.tags || []).slice(0, 3).map((tag: any, ix: number) => (
              <Link
                key={ix}
                href={`/blog/tag/${tag.slug}`}
                className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 hover:opacity-90 transition"
              >
                {tag.title}
              </Link>
            ))}
          </div>
          <Link
            href={`/blog/${article.slug}`}
            className="text-sm text-orange-600 hover:text-orange-500 font-medium flex items-center gap-1 group"
          >
            Read More
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;