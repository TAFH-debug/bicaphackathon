"use client"
import { articles } from '@/dummyData';
import { Article } from '@/types/types';
import { Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    setArticle(
        articles.find((article) => article.id === id)!
    )
  }, []);

  if (!article) {
    return <div className="min-h-screen w-full flex justify-center">
        <Spinner />
        </div>
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-600 mb-8">Автор: {article.author}</p>
      <article className="prose prose-lg">
        <iframe className="m-4 aspect-video w-full" src="https://www.youtube.com/embed/ct8EYi8Euvw?si=h3bER273wZyW5Qgl" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <p>{article.content}</p>
      </article>
    </div>
  );
};
