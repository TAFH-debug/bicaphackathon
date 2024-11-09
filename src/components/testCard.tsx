import { Test } from "@/types/types";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";

const difficultyColors = {
  0: ["success", "Easy"], // Easy - Green
  1: ["warning", "Medium"], // Medium - Yellow
  2: ["danger", "Hard"]  // Hard - Red
};

export default function TestCard(test: Test) {
  return (
    <div className="p-4 min-w-36 flex flex-col items-start justify-between rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out max-w-48">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{test.name}</h2>
      <div className="flex items-center space-x-4 mb-4">
        <Chip color={difficultyColors[test.difficulty][0]} className="text-sm font-semibold">
          {difficultyColors[test.difficulty][1]}
        </Chip>
      </div>
      <Link
        href={`/test/${test.id}`}
        className="py-1 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full text-center whitespace-nowrap"
      >
        Begin Test
      </Link>
    </div>
  );
}
