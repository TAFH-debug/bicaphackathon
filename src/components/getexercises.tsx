"use client"
import { useEffect, useState } from "react";
import ExerciseCard from "@/components/exerciseCard";
import { Exercise } from "@/types/types";

interface GetExercisesProps {
  category: string;
}

const GetExercises: React.FC<GetExercisesProps> = ({ category }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating a backend fetch with dummy data
    setTimeout(() => {
      const dummyExercises: Exercise[] = [
        { id: "1", name: "Exercise 1", subject: "math" },
        { id: "2", name: "Exercise 2", subject: "kazakh"  },
        { id: "3", name: "Exercise 3", subject: "history" },
        { id: "4", name: "Exercise 4" },
        { id: "5", name: "Exercise 5" },
      ];

      setExercises(dummyExercises);
      setLoading(false);
    }, 1000);

    // Uncomment when backend is ready
    /*
    const fetchExercises = async () => {
      try {
        const response = await fetch(`http://localhost:8080/exercises/${category}`);
        if (!response.ok) throw new Error("Failed to fetch exercises");
        const data = await response.json();
        setExercises(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
    */
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-5">
      <div className="flex my-5 justify-center gap-3">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} {...exercise} />
        ))}
      </div>
    </div>
  );
};

export default GetExercises;
