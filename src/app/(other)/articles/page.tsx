"use client"
import { articles } from '@/dummyData';
import ArticleCard from '@/components/articleCard';
import { Spinner } from '@nextui-org/react';

export default function ArticlePage() {
  if (!articles || articles.length === 0) {
    return (
      <div className="min-h-screen w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="flex">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
