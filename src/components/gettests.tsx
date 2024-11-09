"use client"
import { useEffect, useState } from "react";
import TestCard from "@/components/testCard";
import { Test } from "@/types/types";
import { Chip } from "@nextui-org/chip";

interface GetTestsProps {
  category: string;
}

const GetTests: React.FC<GetTestsProps> = ({ category }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<number[]>([0, 1, 2]);

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

  const toggleFilter = (index: number) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const filterIndex = newFilters.indexOf(index);
      if (filterIndex === -1) {
        newFilters.push(index);
      } else {
        newFilters.splice(filterIndex, 1);
      }
      return newFilters;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter tests based on active filters
  const filteredTests = tests.filter((test) => filters.includes(test.difficulty));

  return (
    <div className="m-5">
      <div className="flex space-x-4 gap-x-4">
        <Chip
          onClick={() => toggleFilter(0)}
          className="cursor-pointer text-sm font-semibold"
          color={filters.includes(0) ? "success" : "default"}
        >
          Easy
        </Chip>
        <Chip
          onClick={() => toggleFilter(1)}
          className="cursor-pointer text-sm font-semibold"
          color={filters.includes(1) ? "warning" : "default"}
        >
          Medium
        </Chip>
        <Chip
          onClick={() => toggleFilter(2)}
          className="cursor-pointer text-sm font-semibold"
          color={filters.includes(2) ? "danger" : "default"}
        >
          Hard
        </Chip>
      </div>
      <div className="flex my-5 justify-center gap-3">
        {filteredTests.map((test) => (
          <TestCard key={test.id} {...test} />
        ))}
      </div>
    </div>
  );
  
};

export default GetTests;