"use client"
import { useEffect, useState } from "react";
import TestCard from "@/components/testCard";
import { Test } from "@/types/types";
import {Chip} from "@nextui-org/chip";

interface GetTestsProps {
  category: string;
}

const GetTests: React.FC<GetTestsProps> = ({ category }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<number[]>([]);
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tests/${category!}`); 
        if (!response.ok) throw new Error("Failed to fetch tests");
        const data = await response.json();
        setTests(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
<div>
    <Chip></Chip>
    <Chip></Chip>
    <Chip></Chip>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
    {tests.map((test) => (
        <TestCard key={test.id} {...test} />
    ))}
</div>
  );
};

export default GetTests;
