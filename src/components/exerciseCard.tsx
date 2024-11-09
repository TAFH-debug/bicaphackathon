import { Exercise } from "@/types/types";
import Link from "next/link";

export default function ExerciseCard(exercise: Exercise) {
  let exerciseLink = '';

  // Conditionally set the link based on the exercise subject
  if (exercise.subject === 'math') {
    exerciseLink = `/math/exercise`;
  } else if (exercise.subject === 'kazakh') {
    exerciseLink = `/kaz/punctuation`;
  } else if (exercise.subject === 'history') {
    exerciseLink = `/history`;
  }

  return (
    <div className="p-4 min-w-36 flex flex-col items-center justify-between rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out max-w-48">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{exercise.name}</h2>
      <Link
        href={exerciseLink}
        className="py-1 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full text-center whitespace-nowrap"
      >
        Begin Exercise
      </Link>
    </div>
  );
}
