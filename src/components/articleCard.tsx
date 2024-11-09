import { Article } from "@/types/types";
import Link from "next/link";

export default function ArticleCard(article: Article) {
  return (
    <div className="p-4 flex flex-col items-center justify-between rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 py-15">{article.title}</h2>
      <Link
        href={`/articles/${article.id}`}
        className="py-1 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full text-center whitespace-nowrap"
      >
        Read
      </Link>
    </div>
  );
}
