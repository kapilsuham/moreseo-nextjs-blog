import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  slug: string;
  pageNumber: number;
  lastPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ slug, pageNumber, lastPage }) => {
  const isPrevDisabled = pageNumber <= 0;
  const isNextDisabled = pageNumber >= lastPage - 1;

  return (
    <div className="flex mt-12 items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
      {/* Prev Button */}
      <a
        href={isPrevDisabled ? "#" : `${slug}?page=${pageNumber}`}
        className={`flex items-center gap-1 px-4 py-2 rounded-md border dark:border-slate-700 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
          isPrevDisabled ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronLeft size={16} /> Prev
      </a>

      {/* Page Indicator */}
      <div className="font-semibold tracking-wide text-slate-500 dark:text-slate-400">
        Page {pageNumber + 1} of {lastPage}
      </div>

      {/* Next Button */}
      <a
        href={isNextDisabled ? "#" : `${slug}?page=${pageNumber + 2}`}
        className={`flex items-center gap-1 px-4 py-2 rounded-md border dark:border-slate-700 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
          isNextDisabled ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Next <ChevronRight size={16} />
      </a>
    </div>
  );
};

export default Pagination;